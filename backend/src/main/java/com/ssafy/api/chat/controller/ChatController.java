package com.ssafy.api.chat.controller;

import com.ssafy.api.chat.request.ChatMessage;
import com.ssafy.api.chat.service.ChatRoomService;
import com.ssafy.api.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatController {

    private final ChatService chatService;
    private final ChatRoomService chatRoomService;
    private final SimpMessageSendingOperations messagingTemplate;

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
//        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
//            message.setMessage(message.getUserIdx() + "님이 입장하셨습니다.");
//        }
        log.debug("/pub/chat/message {}", message);
        message.setSendTime(LocalDateTime.now().toString());

        // Websocket에 발행된 메시지를 redis로 발행한다(publish)
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomIdx(), message);

    }
}