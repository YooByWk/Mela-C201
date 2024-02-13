package com.ssafy.api.chat.service;

import com.ssafy.api.chat.request.ChatMessage;
import com.ssafy.api.chat.request.ChatRoom;
import com.ssafy.api.chat.response.ChatRoomRes;
import com.ssafy.db.entity.JoinChatRoom;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.JoinChatRoomRepository;
import com.ssafy.db.repository.JoinChatRoomRepositorySupport;
import com.ssafy.db.repository.TeamspaceRepository;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.persistence.EntityNotFoundException;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Repository
public class ChatRoomService {

    private final UserRepository userRepository;
    private final TeamspaceRepository teamspaceRepository;
    private final JoinChatRoomRepository joinChatRoomRepository;
    private final JoinChatRoomRepositorySupport joinChatRoomRepositorySupport;

    private final ChatService chatService;

    // 채팅방(topic)에 발행되는 메시지를 처리할 Listner
    private final RedisMessageListenerContainer redisMessageListener;
    
    // 구독 처리 서비스
    private final RedisSubscriber redisSubscriber;
    
    // Redis
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, ChatRoom> opsHashChatRoom;
    
    // 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 roomId로 찾을수 있도록 한다.
    private Map<String, ChannelTopic> topics;
    
    // redis hash 데이터를 위함
    @PostConstruct
    private void init() {
        opsHashChatRoom = redisTemplate.opsForHash();
        topics = new HashMap<>();
    }

    public List<ChatRoom> findAllRoom() {
        return opsHashChatRoom.values(CHAT_ROOMS);
    }

    public List<ChatRoom> findAllMyRoom(User user) {
        List<JoinChatRoom> joinChatRooms = joinChatRoomRepository.findByUserIdx(user);

        List<ChatRoom> chatRooms = new ArrayList<>();
        for (JoinChatRoom joinChatRoom : joinChatRooms) {
            ChatRoom chatRoom = new ChatRoom();
            chatRoom.setRoomIdx(joinChatRoom.getChatRoomIdx());
            chatRooms.add(chatRoom);
        }

        return chatRooms;
    }

    // CHAT_ROOMS HASH에서 id값으로 채팅방 찾기
    public ChatRoom findRoomById(String id) {
        return opsHashChatRoom.get(CHAT_ROOMS, id);
    }


    public ChatRoom createTeamspaceRoom() {
        // 채팅방만 생성해서 넘겨준다.
        ChatRoom chatRoom = createChatRoom();

        return chatRoom;
    }

    // 방 생성
    public String enterOneToOneRoom(Long userIdx1, Long userIdx2) throws EntityNotFoundException{
        User user1 = userRepository.getOne(userIdx1);
        User user2 = userRepository.findById(userIdx2).orElse(null);

        if(user2 == null) {
            throw new EntityNotFoundException();
        }

        log.debug("user2 {}", user2);
        String roomIdx = joinChatRoomRepositorySupport.checkIfUserInSameChatRoom(user1, user2);

        // 처음 생성되는 경우
        if (roomIdx == null) {
            // Redis
            ChatRoom chatRoom = createChatRoom();

            // MySql
            createJoinChatRoom(chatRoom.getRoomIdx(), user1);
            createJoinChatRoom(chatRoom.getRoomIdx(), user2);

            roomIdx = chatRoom.getRoomIdx();
        }

        // 채팅 입장
        startChatRoom(roomIdx);

        return roomIdx;
    }

    public String enterTeamspaceRoom(Long teamspaceIdx) {
        String roomIdx = teamspaceRepository.getOne(teamspaceIdx).getChatRoomIdx();

        startChatRoom(roomIdx);

        return roomIdx;
    }

    // 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
    public ChatRoom createChatRoom() {
        ChatRoom chatRoom = ChatRoom.create();
        opsHashChatRoom.put(CHAT_ROOMS, chatRoom.getRoomIdx(), chatRoom);
        return chatRoom;
    }

    // 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
    public void startChatRoom(String roomIdx) {
        ChannelTopic topic = topics.get(roomIdx);

        // 토픽이 없으면 토픽을 만들고 리스너 설정
        if (topic == null) {
            topic = new ChannelTopic(roomIdx);
            redisMessageListener.addMessageListener(redisSubscriber, topic);
            topics.put(roomIdx, topic);
        }
    }

    public ChannelTopic getTopic(String roomId) {
        return topics.get(roomId);
    }

    public JoinChatRoom createJoinChatRoom(String roomIdx, User user) {
        JoinChatRoom joinChatRoom = new JoinChatRoom();
        joinChatRoom.setChatRoomIdx(roomIdx);
        joinChatRoom.setUserIdx(user);
        return joinChatRoomRepository.save(joinChatRoom);
    }

    public User findOtherUser(User user, String roomIdx) {
        // 1:1 채팅방 상대방 찾기
        Optional<JoinChatRoom> joinChatRoom = joinChatRoomRepository.findByChatRoomIdxAndUserIdxNot(roomIdx, user);

        if (!joinChatRoom.isPresent()) {
            return null;
        }

        return userRepository.getOne(joinChatRoom.get().getUserIdx().getUserIdx());
    }

    public List<User> findRecentChatUser(User user) {
        List<User> users = new ArrayList<>();

        // 유저가 속해있는 채팅방 목록 불러오기
        List<JoinChatRoom> chatRooms = joinChatRoomRepository.findByUserIdx(user);
        // 최근 대화 순으로 정렬

        List<ChatMessage> chatMessages = new ArrayList<>();
        for (JoinChatRoom chatRoom : chatRooms) {
            // 최근 메시지 가져오기
            ChatMessage chatMessage = chatService.loadLastMessage(chatRoom.getChatRoomIdx());
            chatMessages.add(chatMessage);
        }

        chatMessages.sort(new Comparator<ChatMessage>() {
            // 최신순 정렬
            @Override
            public int compare(ChatMessage o1, ChatMessage o2) {
                return o2.getSendTime().compareTo(o1.getSendTime());
            }
        });

        for (ChatMessage chatMessage : chatMessages) {
            users.add(findOtherUser(user, chatMessage.getRoomIdx()));
        }

        return users;
    }

}
