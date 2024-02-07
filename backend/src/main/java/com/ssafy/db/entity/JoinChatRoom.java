package com.ssafy.db.entity;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class JoinChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long joinChatRoomIdx;


//    @ManyToOne
//    @JoinColumn(name="chat_room_idx", referencedColumnName="chatRoomIdx")
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    @NotNull
//    ChatRoom chatRoomIdx;

    @NotNull
    String chatRoomIdx;

    @ManyToOne
    @JoinColumn(name="user_idx", referencedColumnName="userIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    User userIdx;

}
