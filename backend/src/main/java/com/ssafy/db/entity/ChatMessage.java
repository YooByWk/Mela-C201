package com.ssafy.db.entity;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long chatMessageIdx;

    @NotNull
    String message;

    @NotNull
    LocalDateTime sendTime;

    @ManyToOne
    @JoinColumn(name="join_chat_room_idx", referencedColumnName="joinChatRoomIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    JoinChatRoom joinChatRoomIdx;

}
