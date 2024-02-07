package com.ssafy.api.chat.request;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class ChatRoom implements Serializable {

    private static final long serialVersionUID = 6494678977089006639L;

    private String roomIdx;

    public static ChatRoom create() {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomIdx = UUID.randomUUID().toString();
        return chatRoom;
    }
}
