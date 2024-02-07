package com.ssafy.api.shorts.request;

import com.ssafy.db.entity.File;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 쇼츠 API ([POST] /) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("ShortsPostRequest")
public class ShortsPostReq {
    @ApiModelProperty(name = "user 테이블 (파일 업로더)의 idx", example = "1")
    User user;

    @ApiModelProperty(name = "쇼츠 설명", example = "제 첫 피아노 연주 쇼츠입니다.")
    String fileDescription;

    @ApiModelProperty(name = "쇼츠 제목", example = "쇼츠 제목 작성하기")
    String title;

    @ApiModelProperty(name = "file 테이블의 idx", example = "1")
    File file;
}
