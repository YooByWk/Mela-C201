package com.ssafy.api.chat.controller;

import com.ssafy.api.chat.request.ChatMessage;
import com.ssafy.api.chat.request.ChatMessageReq;
import com.ssafy.api.chat.request.ChatRoom;
import com.ssafy.api.chat.response.ChatMessageRes;
import com.ssafy.api.chat.response.ChatRoomRes;
import com.ssafy.api.chat.service.ChatRoomService;
import com.ssafy.api.chat.service.ChatService;
import com.ssafy.api.user.response.UserLoginPostRes;
import com.ssafy.api.user.response.UserRes;
import com.ssafy.api.user.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.JoinChatRoom;
import com.ssafy.db.entity.PortfolioAbstract;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.persistence.EntityNotFoundException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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

            log.info("chatMEssage: {}", chatMessage);
            if(chatMessage == null) {
                ChatRoomRes tmp = new ChatRoomRes();
                tmp.setRoomIdx(chatRoom.getRoomIdx());
                tmp.setLastSendMessage(null);
                tmp.setLastSendTime(null);
                tmp.setUser(otherUser);
                res.add(tmp);
                continue;
            }

            PortfolioAbstract portfolioAbstract = userService.browsePortfolioAbstract(otherUser.getEmailId());

            log.info("chatMessage {}, otherUser {}", chatMessage, otherUser);
            res.add(ChatRoomRes.of(chatRoom, otherUser, chatMessage, portfolioAbstract));
        }

        // 최근 대화 순으로 정렬
        res.sort(new Comparator<ChatRoomRes>() {
            @Override
            public int compare(ChatRoomRes o1, ChatRoomRes o2) {
                if (o1.getLastSendTime() != null && o2.getLastSendTime() != null) {
                    return  o2.getLastSendTime().compareTo(o1.getLastSendTime());
                } else if(o1.getLastSendTime() != null) {
                    return 1;
                } else {
                    return -1;
                }

            }
        });

        return ResponseEntity.status(200).body(res);
    }

    @PostMapping("/{otheruserid}")
    @ApiOperation(value = "채팅방 입장", notes = "유저1과 유저2의 채팅방에 입장한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<String> enterChatRoom(
            @ApiIgnore Authentication authentication,
            @PathVariable(name = "otheruserid") Long otherUserIdx
    ) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);

        if(user.getUserIdx() == otherUserIdx) {
            return ResponseEntity.status(400).body(null);
        }

        try {
            String roomIdx = chatRoomService.enterOneToOneRoom(user.getUserIdx(), otherUserIdx);

            return ResponseEntity.status(200).body(roomIdx);
        } catch (EntityNotFoundException e) {
            // 존재하지 않는 유지
            return ResponseEntity.status(404).body(null);
        }

    }

    @GetMapping("/{roomid}")
    @ApiOperation(value = "채팅 내역 조회", notes = "roomIdx(채팅방아이디)로 채팅 내역을 불러온다.")
    public ResponseEntity<List<ChatMessageRes>> chatInfo(@PathVariable(name = "roomid") String roomIdx) {
        log.info("채팅내역: 방 아이디: {}", roomIdx);

        // 채팅 내역
        List<ChatMessage> messages = chatService.loadMessage(roomIdx);

        // 채팅 내역에 필요한 정보 설정
        List<ChatMessageRes> res = new ArrayList<>();
        for (ChatMessage chatMessage : messages) {
            log.info("chatInfo chatMessage: {}", messages);
            User other = userService.getUserByUserIdx(Long.valueOf(chatMessage.getUserIdx()));

            ChatMessageRes tmp = new ChatMessageRes();
            tmp.setMessage(chatMessage.getMessage());
            tmp.setUser(other);
            tmp.setSendTime(chatMessage.getSendTime());
            tmp.setNickname(other.getNickname());
            res.add(tmp);
        }

        Collections.reverse(res);
        return ResponseEntity.status(200).body(res);
    }

    @GetMapping("/teamspaces/{teamspaceid}")
    @ApiOperation(value = "팀스페이스 채팅방 입장")
    public ResponseEntity<String> enterTeamspaceChatRoom(
            @ApiIgnore Authentication authentication,
            @PathVariable(name = "teamspaceid") Long teamspaceIdx) {
        String roomIdx = chatRoomService.enterTeamspaceRoom(teamspaceIdx);

        return ResponseEntity.status(200).body(roomIdx);
    }

    @GetMapping("/recentusers")
    @ApiOperation(value = "채팅한 유저 목록 (최신순)", notes = "최근 채팅한 유저 목록을 얻는다.")
    public ResponseEntity<List<UserRes>> getRecentChatUsers(
            @ApiIgnore Authentication authentication
    ) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);

        List<UserRes> res = new ArrayList<>();
        List<User> users = chatRoomService.findRecentChatUser(user);
        for (User u : users) {
            res.add(UserRes.of(u));
        }

        return ResponseEntity.status(200).body(res);
    }
}
