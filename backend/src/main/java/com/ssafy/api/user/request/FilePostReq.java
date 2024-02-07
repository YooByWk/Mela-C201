package com.ssafy.api.user.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 파일 API ([POST] /) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("FilePostRequest")
public class FilePostReq {
//    @ApiModelProperty(name = "파일 경로", example = "mela/upload/2024/01/31/mp3/")
//    String savePath;

//    @ApiModelProperty(name = "원본 파일 명", example = "Mela!.mp3")
//    String originalFilename;

//    @ApiModelProperty(name = "저장되는 파일 명", example = "bfcf15c4-700d-4d4d-a4c3-aa7103ad044b_Mela!.mp3")
//    String saveFilename;

    @ApiModelProperty(name = "파일 설명", example = "녹황색사회의 정규 2집 앨범 《SINGALONG》의 수록곡.")
    String fileDescription;

//    @ApiModelProperty(name = "파일 용량", example = "4,550,040")
//    String fileSize;
}
