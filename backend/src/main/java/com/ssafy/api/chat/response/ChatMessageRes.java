package com.ssafy.api.chat.response;

import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatMessageRes {

    @ApiModelProperty(name = "보낸 유저 정보")
    User user;
    @ApiModelProperty(name = "메시지")
    String message;
    @ApiModelProperty(name = "보낸 시간")
    String sendTime;
    @ApiModelProperty(name = "닉네임")
    String nickname;

}
