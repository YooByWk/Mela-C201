package com.ssafy.api.chat.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatMessage {
    public enum MessageType {
        ENTER, TALK
    }
    private MessageType type;
    private String roomIdx;
    private String userIdx;
    private String nickname;
    private String message;
    private String sendTime;

}
