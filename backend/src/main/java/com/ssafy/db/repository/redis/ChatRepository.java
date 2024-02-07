package com.ssafy.db.repository.redis;

import com.ssafy.api.chat.request.ChatMessage;
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
public class ChatRepository {

    private final RedisTemplate<String, ChatMessage> redisTemplateMessage;

    public void saveMessage(ChatMessage message) {
        // 1. 직렬화
        redisTemplateMessage.setValueSerializer(new Jackson2JsonRedisSerializer<>(ChatMessage.class));
        // 2. redis 저장
        message.setSendTime(LocalDateTime.now()+"");

        log.info("redisSaveMessage: {} ", message);
        redisTemplateMessage.opsForList().rightPush(message.getRoomIdx(), message);
        // 키 만료??

    }

    // 대화 조회 - Redis
    public List<ChatMessage> loadMessage(String roomIdx) {
        List<ChatMessage> messages = new ArrayList<>();

        System.out.println("loadMessage roomIdx: " + roomIdx);

        // Redis에서 채팅방 메시지 100개 가져오기
        List<ChatMessage> redisMessages = redisTemplateMessage.opsForList().range(roomIdx, 0, 99);

        System.out.println("redisMessage: " + redisMessages);

        return messages;
    }

}
