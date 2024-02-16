package com.ssafy.api.user.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserUpdatePasswordPostRequest")
public class UserUpdatePasswordPostReq {
    @ApiModelProperty(name="유저 Password", example="your_password")
    String password;
}
