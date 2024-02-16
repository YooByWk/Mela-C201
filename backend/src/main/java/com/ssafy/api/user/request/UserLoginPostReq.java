package com.ssafy.api.user.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Bean;

@Getter
@Setter
@ApiModel("UserLoginPostRequest")
public class UserLoginPostReq {
	@ApiModelProperty(name="유저 Email ID", example="your_email")
	String id;
	@ApiModelProperty(name="유저 Password", example="your_password")
	String password;
}
