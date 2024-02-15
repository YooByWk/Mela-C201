package com.ssafy.api.chat.response;

import com.ssafy.api.chat.request.ChatMessage;
import com.ssafy.api.chat.request.ChatRoom;
import com.ssafy.api.chat.service.ChatService;
import com.ssafy.db.entity.PortfolioAbstract;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.Entity;

@Getter
@Setter
@ToString
public class ChatRoomRes {

    @ApiModelProperty(name = "User 정보")
    User user;

    @ApiModelProperty(name = "채팅방 idx")
    String roomIdx;

    @ApiModelProperty(name = "마지막으로 보낸 메시지")
    String lastSendMessage;

    @ApiModelProperty(name = "마지막으로 메시지를 보낸 시간")
    String lastSendTime;

    @ApiModelProperty(name = "포트폴리오")
    PortfolioAbstract portfolioAbstract;

    public static ChatRoomRes of(ChatRoom chatRoom, User user, ChatMessage chatMessage, PortfolioAbstract portfolioAbstract) {
        ChatRoomRes chatRoomRes = new ChatRoomRes();
        chatRoomRes.setRoomIdx(chatRoom.getRoomIdx());
        chatRoomRes.setUser(user); // 상대방 닉네임
        chatRoomRes.setLastSendMessage(chatMessage.getMessage()); // 마지막 메시지
        chatRoomRes.setLastSendTime(chatMessage.getSendTime()); // 마지막 보낸 시간
        chatRoomRes.setPortfolioAbstract(portfolioAbstract);

        return chatRoomRes;
    }

}
