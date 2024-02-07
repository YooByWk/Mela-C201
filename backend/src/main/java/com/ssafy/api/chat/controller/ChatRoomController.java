package com.ssafy.api.chat.controller;

import com.ssafy.api.chat.request.ChatMessage;
import com.ssafy.api.chat.request.ChatRoom;
import com.ssafy.api.chat.service.ChatRoomService;
import com.ssafy.api.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Websocket 통신 외에 채팅 화면 View 구성을 위해 필요한 Controller를 생성합니다.
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/chat")
//@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatService chatService;
    private final ChatRoomService chatRoomService;

    // 모든 채팅방 목록 반환
    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoom> room() {
        return chatRoomService.findAllRoom();
    }
    // 채팅방 생성
    @PostMapping("/room")
    @ResponseBody
    public ChatRoom createRoom(@RequestBody String name) {
        return chatRoomService.createChatRoom();
    }

    // 특정 채팅방 조회
    @GetMapping("/room/{roomIdx}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable String roomIdx) {
        return chatRoomService.findRoomById(roomIdx);
    }

    @GetMapping("/room/{roomIdx}/chat")
    public List<ChatMessage> chatInfo(@PathVariable String roomIdx) {
        log.info("채팅내역: 방 아이디: {}", roomIdx);

        List<ChatMessage> messages = chatService.loadMessage(roomIdx);
        return chatService.loadMessage(roomIdx);
    }

}
