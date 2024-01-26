package com.ssafy.api.user.response;

import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
	@ApiModelProperty(name="user idx")
	Long userIdx;
	@ApiModelProperty(name="user email id")
	String emailId;
	@ApiModelProperty(name = "user email domain")
	String emailDomain;
	@ApiModelProperty(name="user department")
	String name;
	@ApiModelProperty(name="user position")
	String nickname;
	@ApiModelProperty(name="user name")
	String gender;
	@ApiModelProperty(name="user birth")
	LocalDate birth;
	@ApiModelProperty(name="user type")
	String userType;
	@ApiModelProperty(name="user search allow")
	boolean searchAllow;


	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUserIdx(user.getUserIdx());
		res.setEmailId(user.getEmailId());
		res.setEmailDomain(user.getEmailDomain());
		res.setName(user.getName());
		res.setNickname(user.getNickname());
		res.setGender(user.getGender());
		res.setBirth(user.getBirth());
		res.setUserType(user.getUserType());
		res.setSearchAllow(user.getSearchAllow());
		return res;
	}
}
