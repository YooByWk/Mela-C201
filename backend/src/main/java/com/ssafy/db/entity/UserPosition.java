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
public class UserPosition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long userPositionIdx;

    @ManyToOne
    @JoinColumn(name="user_idx", referencedColumnName="userIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    User userIdx;

    @ManyToOne
//    @JoinColumn(name="position_idx", referencedColumnName="positionIdx")
    @JoinColumn(name="position_idx", referencedColumnName="position_idx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    Position positionIdx;
}
