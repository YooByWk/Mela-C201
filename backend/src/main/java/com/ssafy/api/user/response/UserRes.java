package com.ssafy.api.user.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
	@ApiModelProperty(name="User ID")
	String userId;
	@ApiModelProperty(name="user department")
	String department;
	@ApiModelProperty(name="user position")
	String position;
	@ApiModelProperty(name="user name")
	String name;

	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUserId(user.getUserId());
		res.setDepartment(user.getDepartment());
		res.setName(user.getName());
		res.setPosition(user.getPosition());
		return res;
	}
}
