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
public class ShortsDislike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long shortsDislikeIdx;

    @ManyToOne
    @JoinColumn(name="user_idx", referencedColumnName="userIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    User userIdx;

    @ManyToOne
    @JoinColumn(name="shorts_idx", referencedColumnName="shortsIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    Shorts shortsIdx;

    @Override
    public String toString() {
        return "ShortsDislike{" +
                "shortsDislikeIdx=" + shortsDislikeIdx +
                ", userIdx=" + userIdx +
                ", shortsIdx=" + shortsIdx +
                '}';
    }
}
