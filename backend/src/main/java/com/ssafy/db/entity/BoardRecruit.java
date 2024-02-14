package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
public class BoardRecruit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long boardRecruitIdx;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate endDate;

    @ManyToOne
    @JoinColumn(name="board_idx", referencedColumnName="boardIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    Board boardIdx;

    @ManyToOne
//    @JoinColumn(name="genre_idx1", referencedColumnName="genreIdx")
    @JoinColumn(name="genre_idx1", referencedColumnName="genre_idx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Genre genreIdx1;

    @ManyToOne
//    @JoinColumn(name="genre_idx2", referencedColumnName="genreIdx")
    @JoinColumn(name="genre_idx2", referencedColumnName="genre_idx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Genre genreIdx2;

    @ManyToOne
//    @JoinColumn(name="genre_idx3", referencedColumnName="genreIdx")
    @JoinColumn(name="genre_idx3", referencedColumnName="genre_idx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Genre genreIdx3;
}
