package com.ssafy.api.user.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 포트폴리오 수정 API ([PUT] /api/v1/users/myinfo) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("PortfolioAbstractUpdatePostRequest")
public class PortfolioAbstractPostReq {
    @ApiModelProperty(name="인스타그램 주소", example = "https://www.instagram.com/hellossafy/")
    String instagram;

    @ApiModelProperty(name="자기소개", example = "self intro 소울 가득한 뮤지션을 지향합니다.!")
    String selfIntro;

    @ApiModelProperty(name="유튜브 주소", example = "https://www.youtube.com/@hellossafy")
    String youtube;

    @Override
    public String toString() {
        return "PortfolioAbstractPostReq{" +
                "instagram='" + instagram + '\'' +
                ", selfIntro='" + selfIntro + '\'' +
                ", youtube='" + youtube + '\'' +
                '}';
    }
}
