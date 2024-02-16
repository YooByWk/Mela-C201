package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Teamspace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long teamspaceIdx;

    @NotNull
    String teamName;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate startDate;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate endDate;

    @Column(length = 100)
    String teamDescription;

    @ManyToOne
    @JoinColumn(referencedColumnName="userIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    User host;

    @ManyToOne
    @JoinColumn(name="TEAMSPACE_PICTURE_FILE_IDX", referencedColumnName="fileIdx")
    File teamspacePictureFileIdx;

    @ManyToOne
    @JoinColumn(name="TEAMSPACE_BACKGROUND_PICTURE_FILE_IDX", referencedColumnName="fileIdx")
    File teamspaceBackgroundPictureFileIdx;

    String chatRoomIdx;


    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, optional = true)
    @JoinColumn(name = "session_id", referencedColumnName = "sessionId")
    Meeting sessionId;

    @Override
    public String toString() {
        return "Teamspace{" +
                "teamspaceIdx=" + teamspaceIdx +
                ", teamName='" + teamName + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", teamDescription='" + teamDescription + '\'' +
                ", host=" + host +
                ", teamspacePictureFileIdx=" + teamspacePictureFileIdx +
                ", teamspaceBackgroundPictureFileIdx=" + teamspaceBackgroundPictureFileIdx +
                ", chatRoomIdx=" + chatRoomIdx +
                ", sessionId=" + sessionId +
                '}';
    }
}
