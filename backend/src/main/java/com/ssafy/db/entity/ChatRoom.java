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
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long chatRoomIdx;

    @NotNull
    LocalDateTime createTime;

    @ManyToOne
    @JoinColumn(name="teamspace_idx", referencedColumnName="teamspaceIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    Teamspace teamspaceIdx;
}
