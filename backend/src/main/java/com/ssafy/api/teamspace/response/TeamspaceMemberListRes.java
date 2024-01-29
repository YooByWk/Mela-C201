package com.ssafy.api.teamspace.response;

import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.apache.tomcat.jni.Local;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ApiModel("TeamspaceMemberListResponse")
public class TeamspaceMemberListRes {
    Long userIdx;
    LocalDate birth;
    String emailDomain;
    String emailId;
    String gender;
    String name;
    String nickname;
}
