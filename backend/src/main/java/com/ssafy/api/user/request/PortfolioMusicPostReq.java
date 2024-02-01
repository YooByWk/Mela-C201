package com.ssafy.api.user.request;

import com.ssafy.db.entity.File;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

/**
 * 포트폴리오 뮤직 API ([POST] /) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("PortfolioMusicPostRequest")
//public class PortfolioMusicPostReq extends FilePostReq {
public class PortfolioMusicPostReq {
    @ApiModelProperty(name = "포트폴리오에 저장할 곡명", example = "Mela!")
    String title;

    @ApiModelProperty(name = "포트폴리오에 저장할 곡의 고정(pinned) 여부", example = "Mela!")
    boolean pinFixed;

//    @ApiModelProperty(name = "파일", example = "Mela!.mp3")
//    MultipartFile[] multipartFile;

//    @ApiModelProperty(name = "포트폴리오에 저장할 곡의 업로더 Idx", example = "1")
//    User userIdx;

//    @ApiModelProperty(name = "포트폴리오에 저장할 곡 Table Record (1 Row)의 idx", example = "1")
//    File musicFileIdx;
//
//    @ApiModelProperty(name = "포트폴리오에 저장할 가사 Table Record (1 Row)의 idx", example = "1")
//    File lyricFileIdx;
//
//    @ApiModelProperty(name = "포트폴리오에 저장할 앨범아트 Table Record (1 Row)의 idx", example = "1")
//    File albumArtFileIdx;

    @ApiModelProperty(name = "파일 설명", example = "녹황색사회의 정규 2집 앨범 《SINGALONG》의 수록곡.")
    String fileDescription;

    //TODO: toString() 삭제하기

//    @Override
//    public String toString() {
//        return "PortfolioMusicPostReq{" +
//                "title='" + title + '\'' +
//                ", pinFixed=" + pinFixed +
//                ", savePath='" + savePath + '\'' +
//                ", originalFilename='" + originalFilename + '\'' +
//                ", saveFilename='" + saveFilename + '\'' +
//                ", fileDescription='" + fileDescription + '\'' +
//                ", fileSize='" + fileSize + '\'' +
//                '}';
//    }


    @Override
    public String toString() {
        return "PortfolioMusicPostReq{" +
                "title='" + title + '\'' +
                ", pinFixed=" + pinFixed +
                '}';
    }
}