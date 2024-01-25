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
    @OnDelete(action = OnDeleteAction.CASCADE)
    File teamspace_picture_file_idx;

    @ManyToOne
    @JoinColumn(name="TEAMSPACE_BACKGROUND_PICTURE_FILE_IDX", referencedColumnName="fileIdx")
    @OnDelete(action = OnDeleteAction.CASCADE)
    File teamspace_background_picture_file_idx;
}
