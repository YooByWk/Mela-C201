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
public class BoardRecruit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long boardRecruitIdx;

    String position;

    @NotNull
    LocalDateTime endDate;

    @ManyToOne
    @JoinColumn(name="board_idx", referencedColumnName="boardIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    Board boardIdx;

    @ManyToOne
    @JoinColumn(name="genre_idx1", referencedColumnName="genreIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    Genre genreIdx1;

    @ManyToOne
    @JoinColumn(name="genre_idx2", referencedColumnName="genreIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    Genre genreIdx2;

    @ManyToOne
    @JoinColumn(name="genre_idx3", referencedColumnName="genreIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    Genre genreIdx3;
}
