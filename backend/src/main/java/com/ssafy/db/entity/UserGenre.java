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
public class UserGenre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long userGenreIdx;

    @ManyToOne
    @JoinColumn(name="user_idx", referencedColumnName="userIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    User userIdx;

    @ManyToOne
//    @JoinColumn(name="genre_idx", referencedColumnName="genreIdx")
    @JoinColumn(name="genre_idx", referencedColumnName="genre_idx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    Genre genreIdx;

    @Override
    public String toString() {
        return "UserGenre{" +
                "userGenreIdx=" + userGenreIdx +
                ", userIdx=" + userIdx +
                ", genreIdx=" + genreIdx +
                '}';
    }
}
