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
public class PortfolioMusic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long portfolioMusicIdx;

    @NotNull
    String title;
    @NotNull
    Boolean pinFixed;

    @ManyToOne
    @JoinColumn(name="user_idx", referencedColumnName="userIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    User userIdx;

    @ManyToOne
    @JoinColumn(name="music_file_idx", referencedColumnName="fileIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    File musicFileIdx;

    @ManyToOne
    @JoinColumn(name="lyric_file_idx", referencedColumnName="fileIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    File lyricFileIdx;

    @ManyToOne
    @JoinColumn(name="album_art_file_idx", referencedColumnName="fileIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    File albumArtFileIdx;

    @Override
    public String toString() {
        return "PortfolioMusic{" +
                "portfolioMusicIdx=" + portfolioMusicIdx +
                ", title='" + title + '\'' +
                ", pinFixed=" + pinFixed +
                ", userIdx=" + userIdx +
                ", musicFileIdx=" + musicFileIdx +
                ", lyricFileIdx=" + lyricFileIdx +
                ", albumArtFileIdx=" + albumArtFileIdx +
                '}';
    }
}
