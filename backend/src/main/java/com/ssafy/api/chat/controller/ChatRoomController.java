package com.ssafy.api.chat.controller;

import com.ssafy.api.chat.request.ChatMessage;
import com.ssafy.api.chat.request.ChatMessageReq;
import com.ssafy.api.chat.request.ChatRoom;
import com.ssafy.api.chat.response.ChatMessageRes;
import com.ssafy.api.chat.response.ChatRoomRes;
import com.ssafy.api.chat.service.ChatRoomService;
import com.ssafy.api.chat.service.ChatService;
import com.ssafy.api.user.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.JoinChatRoom;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Api(value = "채팅 API", tags = {"Chat"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/chatrooms")
public class ChatRoomController {

    private final UserService userService;
    private final ChatService chatService;
    private final ChatRoomService chatRoomService;

    @GetMapping("")
    @ApiOperation(value = "나의 모든 1:1 채팅방 목록", notes = "유저정보를 통해 유저가 속한 1:1 채팅방 목록을 반환한다.")
    public ResponseEntity<List<ChatRoomRes>> room(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();

        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);

        List<ChatRoom> chatRooms = chatRoomService.findAllMyRoom(user);
        
        List<ChatRoomRes> res = new ArrayList<>();
        for (ChatRoom chatRoom : chatRooms) {
            ChatMessage chatMessage = chatService.loadLastMessage(chatRoom.getRoomIdx());
            User otherUser = chatRoomService.findOtherUser(user, chatRoom.getRoomIdx());

            res.add(ChatRoomRes.of(chatRoom, otherUser, chatMessage));
        }

        return ResponseEntity.status(200).body(res);
    }

    @PostMapping("")
    @ApiOperation(value = "채팅방 입장", notes = "유저1과 유저2의 채팅방에 입장한다.")
    public ResponseEntity<String> createRoom(@ApiIgnore Authentication authentication, @RequestBody Long userIdx2) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);

        String roomIdx = chatRoomService.enterOneToOneRoom(user.getUserIdx(), userIdx2);

        return ResponseEntity.status(200).body(roomIdx);
    }

//    @GetMapping("/{roomidx}")
//    @ApiOperation(value = "채팅방 조회", notes = "채팅방아이디를 통해 채팅방 정보를 얻는다.")
//    public ResponseEntity<?> roomInfo(@PathVariable(name = "roomidx") String roomIdx) {
//        // ??
//
//        return ResponseEntity.status(200).body(chatRoomService.findRoomById(roomIdx));
//    }

    @GetMapping("/{roomidx}")
    @ApiOperation(value = "채팅 내역 조회", notes = "roomIdx(채팅방아이디)로 채팅 내역을 불러온다.")
    public ResponseEntity<List<ChatMessageRes>> chatInfo(@PathVariable(name = "roomidx") String roomIdx) {
        log.info("채팅내역: 방 아이디: {}", roomIdx);

        // 채팅 내역
        List<ChatMessage> messages = chatService.loadMessage(roomIdx);

        // 채팅 내역에 필요한 정보 설정
        List<ChatMessageRes> res = new ArrayList<>();
        for (ChatMessage chatMessage : messages) {
            ChatMessageRes tmp = new ChatMessageRes();
            tmp.setMessage(chatMessage.getMessage());
            tmp.setUser(userService.getUserByUserIdx(Long.valueOf(chatMessage.getUserIdx())));
            tmp.setSendTime(chatMessage.getSendTime());
            res.add(tmp);
        }

        return ResponseEntity.status(200).body(res);
    }

}
