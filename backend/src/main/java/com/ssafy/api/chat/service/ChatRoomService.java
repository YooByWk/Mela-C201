package com.ssafy.api.chat.service;

import com.ssafy.api.chat.request.ChatRoom;
import com.ssafy.db.entity.JoinChatRoom;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.JoinChatRoomRepository;
import com.ssafy.db.repository.JoinChatRoomRepositorySupport;
import com.ssafy.db.repository.TeamspaceRepository;
import com.ssafy.db.repository.redis.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    private final TeamspaceRepository teamspaceRepository;

    private final JoinChatRoomRepository joinChatRoomRepository;
    private final JoinChatRoomRepositorySupport joinChatRoomRepositorySupport;
    //

    // topic에 발행되는 메시지를 처리하는 리스너
    private final RedisMessageListenerContainer redisMessageListener;

    // 구독 처리 서비스
    private final RedisSubscriber redisSubscriber;

    // redis
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, ChatRoom> opsHashChatRoom;

    // redis topic
    private Map<String, ChannelTopic> topics;

    // redis hash 데이터를 위함
    @PostConstruct
    private void init() {
        opsHashChatRoom = redisTemplate.opsForHash();
        topics = new HashMap<>();
    }

    public JoinChatRoom createJoinChatRoom(String roomIdx, User user) {
        JoinChatRoom joinChatRoom = new JoinChatRoom();
        joinChatRoom.setChatRoomIdx(roomIdx);
        joinChatRoom.setUserIdx(user);
        return joinChatRoomRepository.save(joinChatRoom);
    }

    public ChatRoom createTeamspaceRoom() {
        ChatRoom chatRoom = chatRoomRepository.createChatRoom();

        return chatRoom;
    }

    // 방 생성
    public void enterRoom(User user1, User user2) {
        String roomIdx = joinChatRoomRepositorySupport.checkIfUserInSameChatRoom(user1, user2);

        // 처음 생성되는 경우
        if (roomIdx == null) {
            // Redis
            ChatRoom chatRoom = chatRoomRepository.createChatRoom();
            chatRoomRepository.enterChatRoom(chatRoom.getRoomIdx());

            // MySql
            createJoinChatRoom(chatRoom.getRoomIdx(), user1);
            createJoinChatRoom(chatRoom.getRoomIdx(), user2);
        }
        // 이미 생성된 경우
        else {
            chatRoomRepository.enterChatRoom(roomIdx);
        }
    }

    public void enterTeamspaceRoom(String roomIdx) {
        chatRoomRepository.enterChatRoom(roomIdx);
    }

    // 내 채팅목록 조회
    public List<ChatRoom> findAllRoomByUser(User user) {
        List<JoinChatRoom> joinChatRooms = joinChatRoomRepository.findByUserIdx(user);

        List<ChatRoom> chatRooms = new ArrayList<>();
        for (JoinChatRoom room : joinChatRooms) {
            ChatRoom tmp = new ChatRoom();
            tmp.setRoomIdx(room.getChatRoomIdx());
            chatRooms.add(tmp);
        }

        return chatRooms;
    }

    // redis 채널에서 채팅방 조회
    public ChannelTopic getTopic(String roomIdx) {
        return topics.get(roomIdx);
    }

}
