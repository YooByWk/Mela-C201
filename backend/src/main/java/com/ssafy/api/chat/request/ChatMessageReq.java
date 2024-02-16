package com.ssafy.api.chat.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageReq {

    private String userIdx;
    private String roomIdx;
    private String message;
    private String sendTime;

}
