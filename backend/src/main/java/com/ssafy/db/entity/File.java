package com.ssafy.db.entity;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    Long fileIdx;

    //파일 경로
    @NotNull @Column(length = 200)
    String savePath;

    //원본 파일 명
    @NotNull @Column(length = 200)
    String originalFilename;

    //저장되는 파일 명
    @NotNull @Column(length = 200)
    String saveFilename;

    //파일 설명
    @Column(length = 100)
    String fileDescription;

    //파일 크기 (용량)
    @NotNull @Column
    Long fileSize;

    @Override
    public String toString() {
        return "File{" +
                "fileIdx=" + fileIdx +
                ", savePath='" + savePath + '\'' +
                ", originalFilename='" + originalFilename + '\'' +
                ", saveFilename='" + saveFilename + '\'' +
                ", fileDescription='" + fileDescription + '\'' +
                ", fileSize=" + fileSize +
                '}';
    }
}
