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
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long commentIdx;

    @NotNull
    String nickname;

    @NotNull
    LocalDateTime registDate;

    @NotNull
    String content;

    @ManyToOne
    @JoinColumn(name="user_idx", referencedColumnName="userIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    User userIdx;

    @ManyToOne
    @JoinColumn(name="board_idx", referencedColumnName="boardIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    Board boardIdx;
}
