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
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long boardIdx;

    @NotNull
    String nickname;

    @NotNull
    String title;

    @NotNull
    String content;

    @NotNull
    LocalDateTime registDate;

    LocalDateTime updateDate;

    @NotNull
    int viewNum=0;

    @NotNull
    int likeNum=0;

    @NotNull
    int commentNum=0;

    @ManyToOne
    @JoinColumn(name="user_idx", referencedColumnName="userIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    User userIdx;
}
