package com.ssafy.api.board.response;

import com.ssafy.db.entity.File;
import com.ssafy.db.entity.User;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@Setter
public class Shorts {
    Long shortsIdx;

    User userIdx;

    String title;

    String description;

    File shortsPathFileIdx;

    String fileURL;

    @Override
    public String toString() {
        return "Shorts{" +
                "shortsIdx=" + shortsIdx +
                ", userIdx=" + userIdx +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", shortsPathFileIdx=" + shortsPathFileIdx +
                ", fileURL='" + fileURL + '\'' +
                '}';
    }
}
