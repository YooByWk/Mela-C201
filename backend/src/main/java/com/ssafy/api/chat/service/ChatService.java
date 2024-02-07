package com.ssafy.api.chat.service;

import com.ssafy.api.chat.request.ChatMessage;
import com.ssafy.db.repository.redis.ChatRepository;
import com.ssafy.db.repository.redis.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;

//    public void saveMessage(ChatMessage messageInfo) {
//        // 1.직렬화
//        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(ChatMessage.class));
//
//        // 2. redis 저장
//        redisTemplate.opsForList().rightPush(messageInfo.getRoomIdx(), messageInfo);
//
//        // 3. expire를 이용해서
//    }

}
