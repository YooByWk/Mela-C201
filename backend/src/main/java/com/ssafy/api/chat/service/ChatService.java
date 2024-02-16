package com.ssafy.api.chat.service;

import com.ssafy.api.chat.request.ChatMessage;
import com.ssafy.api.chat.request.ChatMessageReq;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Repository
public class ChatService {

    private final RedisTemplate<String, ChatMessage> redisTemplateMessage;

    public void saveMessage(ChatMessage message) {
        // 1. 직렬화
        redisTemplateMessage.setValueSerializer(new Jackson2JsonRedisSerializer<>(ChatMessage.class));
        // 2. redis 저장
        message.setSendTime(LocalDateTime.now().toString());

        log.info("redisSaveMessage: {} ", message);
        redisTemplateMessage.opsForList().leftPush(message.getRoomIdx(), message);
        // 키 만료 설정
    }

    // 대화 조회 - Redis
    public List<ChatMessage> loadMessage(String roomIdx) {
        // Redis에서 채팅방 메시지 100개 가져오기
        redisTemplateMessage.setValueSerializer(new Jackson2JsonRedisSerializer<>(ChatMessage.class));
        List<ChatMessage> messages = redisTemplateMessage.opsForList().range(roomIdx, 0, 99);

        log.debug("redisMessage: {}", messages);
        return messages;
    }

    public ChatMessage loadLastMessage(String roomIdx) {
        redisTemplateMessage.setValueSerializer(new Jackson2JsonRedisSerializer<>(ChatMessage.class));
        ChatMessage message = redisTemplateMessage.opsForList().index(roomIdx, 0);

        return message;
    }
}
