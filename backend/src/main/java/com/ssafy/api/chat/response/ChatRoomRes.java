package com.ssafy.api.chat.response;

import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

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

}
