package com.ssafy.api.chat.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    public enum MessageType {
        ENTER, TALK
    }
    private MessageType type;
    private String roomIdx;
    private String userIdx;
    private String message;
}
