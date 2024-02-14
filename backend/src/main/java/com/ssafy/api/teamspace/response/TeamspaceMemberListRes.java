package com.ssafy.api.teamspace.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@ApiModel("TeamspaceMemberListResponse")
public class TeamspaceMemberListRes {
    @ApiModelProperty(name="유저 idx")
    Long userIdx;

    @ApiModelProperty(name="user birthday", example = "2000-02-02")
    LocalDate birth;

    @ApiModelProperty(name="email id")
    String emailId;

    @ApiModelProperty(name="email domain")
    String emailDomain;

    @ApiModelProperty(name="gender")
    String gender;

    @ApiModelProperty(name="user name")
    String name;

    @ApiModelProperty(name="user nickname")
    String nickname;

//    @ApiModelProperty(name="profile image URL")
    String profileImageURL;
}
