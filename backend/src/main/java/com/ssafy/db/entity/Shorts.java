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
public class Shorts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long shortsIdx;


    @ManyToOne
    @JoinColumn(name = "user_idx", referencedColumnName = "userIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    User userIdx;

    String title;

    String description;

    @ManyToOne
    @JoinColumn(name="shorts_path_file_idx", referencedColumnName="fileIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    File shortsPathFileIdx;

    @Override
    public String toString() {
        return "Shorts{" +
                "shortsIdx=" + shortsIdx +
                ", userIdx=" + userIdx +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", shortsPathFileIdx=" + shortsPathFileIdx +
                '}';
    }
}
