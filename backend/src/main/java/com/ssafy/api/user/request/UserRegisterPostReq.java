package com.ssafy.api.user.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * 유저 회원가입 API ([POST] /users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
	@ApiModelProperty(name="유저 email id", example="your_email_id")
	String emailId;

	@ApiModelProperty(name="유저 email Domain", example="email_domain")
	String emailDomain;

	@ApiModelProperty(name="유저 Password", example="your_password")
	String password;

	@ApiModelProperty(name="유저 name", example="your_name")
	String name;

	@ApiModelProperty(name="유저 nickname", example="your_nickname")
	String nickname;

	@ApiModelProperty(name="유저 gender", example="your_gender")
	String gender;

	@ApiModelProperty(name="유저 birth", example="2000-01-01")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	LocalDate birth;

	@ApiModelProperty(name="유저 search_allow", example="your_search_allow")
	boolean searchAllow;
}
