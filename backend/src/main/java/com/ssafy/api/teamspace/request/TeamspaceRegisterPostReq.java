package com.ssafy.api.teamspace.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("TeamspaceRegisterPostRequest")
public class TeamspaceRegisterPostReq {
    @ApiModelProperty(name="팀 스페이스 team_name", example="team_name")
    String teamName;

    @ApiModelProperty(name = "팀 스페이스 start_date", example = "")
    LocalDateTime startDate;

    @ApiModelProperty(name = "팀 스페이스 end_date", example = "")
    LocalDateTime endDate;

    @ApiModelProperty(name = "팀 스페이스 host", example = "userId")
    String host;


}
