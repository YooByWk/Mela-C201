package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원정보 수정 API ([PUT] /api/v1/users/me) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserUpdatePostRequest")
public class UserUpdatePostReq {
//    @ApiModelProperty(name="유저 Department")
//    String department;
//    @ApiModelProperty(name="유저 Position")
//    String position;
//    @ApiModelProperty(name="유저 Name")
//    String name;
}
