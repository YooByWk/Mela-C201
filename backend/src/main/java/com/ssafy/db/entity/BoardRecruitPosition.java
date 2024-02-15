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
public class BoardRecruitPosition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long boardRecruitPositionIdx;

    @ManyToOne
    @JoinColumn(name="board_recruit_idx", referencedColumnName="boardRecruitIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    BoardRecruit boardRecruitIdx;

    @ManyToOne
//    @JoinColumn(name="position_idx", referencedColumnName="positionIdx")
    @JoinColumn(name="position_idx", referencedColumnName="position_idx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    Position positionIdx;
}
