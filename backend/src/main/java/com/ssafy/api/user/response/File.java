package com.ssafy.api.user.response;

import com.ssafy.db.entity.User;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@Setter
public class File {
    Long fileIdx;

    //파일 경로
    String savePath;

    //원본 파일 명
    String originalFilename;

    //저장되는 파일 명
    String saveFilename;

    //파일 설명
    String fileDescription;

    //파일 크기 (용량)
    Long fileSize;

    //업로더
    User userIdx;

    //업로더 프로필 이미지
    String uploaderProfileImageUrl;

    //toString 정의!
    @Override
    public String toString() {
        return "File{" +
                "fileIdx=" + fileIdx +
                ", savePath='" + savePath + '\'' +
                ", originalFilename='" + originalFilename + '\'' +
                ", saveFilename='" + saveFilename + '\'' +
                ", fileDescription='" + fileDescription + '\'' +
                ", fileSize=" + fileSize +
                ", userIdx=" + userIdx +
                '}';
    }
}
