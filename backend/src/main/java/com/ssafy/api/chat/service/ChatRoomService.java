package com.ssafy.api.chat.service;

import com.ssafy.api.chat.request.ChatRoom;
import com.ssafy.db.entity.JoinChatRoom;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.JoinChatRoomRepository;
import com.ssafy.db.repository.JoinChatRoomRepositorySupport;
import com.ssafy.db.repository.TeamspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Repository
public class ChatRoomService {

    private final TeamspaceRepository teamspaceRepository;
    private final JoinChatRoomRepository joinChatRoomRepository;
    private final JoinChatRoomRepositorySupport joinChatRoomRepositorySupport;


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
    public ChatRoom findRoomById(String id) {
        return opsHashChatRoom.get(CHAT_ROOMS, id);
    }
    /**
     * 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
     */
    public ChatRoom createChatRoom() {
        ChatRoom chatRoom = ChatRoom.create();
        opsHashChatRoom.put(CHAT_ROOMS, chatRoom.getRoomIdx(), chatRoom);
        return chatRoom;
    }

    /**
     * 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
     */
    public void enterChatRoom(String roomIdx) {
        ChannelTopic topic = topics.get(roomIdx);
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

    public ChatRoom createTeamspaceRoom() {
        ChatRoom chatRoom = createChatRoom();

        return chatRoom;
    }

    // 방 생성
    public void enterRoom(User user1, User user2) {
        String roomIdx = joinChatRoomRepositorySupport.checkIfUserInSameChatRoom(user1, user2);

        // 처음 생성되는 경우
        if (roomIdx == null) {
            // Redis
            ChatRoom chatRoom = createChatRoom();
            enterChatRoom(chatRoom.getRoomIdx());

            // MySql
            createJoinChatRoom(chatRoom.getRoomIdx(), user1);
            createJoinChatRoom(chatRoom.getRoomIdx(), user2);
        }
        // 이미 생성된 경우
        else {
            enterChatRoom(roomIdx);
        }
    }


}
