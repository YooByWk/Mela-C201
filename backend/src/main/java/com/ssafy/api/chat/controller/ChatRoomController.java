package com.ssafy.api.chat.controller;

import com.ssafy.api.chat.request.ChatMessage;
import com.ssafy.api.chat.request.ChatRoom;
import com.ssafy.api.chat.service.ChatRoomService;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.redis.ChatRepository;
import com.ssafy.db.repository.redis.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Websocket 통신 외에 채팅 화면 View 구성을 위해 필요한 Controller를 생성합니다.
@RequiredArgsConstructor
//@RestController
@Controller
@RequestMapping("/api/v1/chat")
//@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomService chatRoomService;
    private final UserRepository userRepository;

    // 모든 채팅방 목록 반환
    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoom> room() {
        return chatRoomRepository.findAllRoom();
    }
    // 채팅방 생성
    @PostMapping("/room")
    @ResponseBody
    public ChatRoom createRoom(@RequestBody String name) {
        User user1 = userRepository.getOne(1L);
        User user2 = userRepository.getOne(2L);
        chatRoomService.enterRoom(user1, user2);

        return chatRoomRepository.createChatRoom();
    }

    // 특정 채팅방 조회
    @GetMapping("/room/{roomIdx}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable String roomIdx) {
        return chatRoomRepository.findRoomById(roomIdx);
    }

    @GetMapping("/room/{roomIdx}/chat")
    public List<ChatMessage> chatInfo(@PathVariable String roomIdx) {

        System.out.println("chatInfo");
        return chatRepository.loadMessage(roomIdx);
    }
}
