package com.ssafy.api.user.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/**
 * 유저 회원정보 수정 API ([PUT] /api/v1/users/me) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserUpdatePostRequest")
public class UserUpdatePostReq {
    @ApiModelProperty(name="유저 name")
    String name;

    @ApiModelProperty(name="유저 nickname")
    String nickname;

    @ApiModelProperty(name="유저 gender")
    String gender;

    @ApiModelProperty(name="유저 birth")
    LocalDateTime birth;

    @ApiModelProperty(name="유저 search_allow")
    boolean searchAllow;


}
