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

    @NotNull @Column(length = 50)
    String saveFolder;

    @NotNull @Column(length = 50)
    String originalFolder;

    @NotNull @Column(length = 50)
    String saveFile;

    @Column(length = 100)
    String fileDescription;

    @Override
    public String toString() {
        return "File{" +
                "fileIdx=" + fileIdx +
                ", saveFolder='" + saveFolder + '\'' +
                ", originalFolder='" + originalFolder + '\'' +
                ", saveFile='" + saveFile + '\'' +
                ", fileDescription='" + fileDescription + '\'' +
                '}';
    }
}
