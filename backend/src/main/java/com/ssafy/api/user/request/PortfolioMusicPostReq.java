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
public class PortfolioMusicPostReq {
    @ApiModelProperty(name = "포트폴리오에 저장할 곡의 고정(pinned) 여부", example = "Mela!")
    boolean pinFixed;

    @ApiModelProperty(name = "파일 설명", example = "녹황색사회의 정규 2집 앨범 《SINGALONG》의 수록곡.")
    String fileDescription;

    @ApiModelProperty(name = "포트폴리오 제목", example = "SINGALONG")
    String title;
}