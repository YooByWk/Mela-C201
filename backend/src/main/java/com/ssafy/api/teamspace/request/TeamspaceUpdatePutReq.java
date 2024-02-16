package com.ssafy.api.teamspace.request;

import com.ssafy.db.entity.File;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@ApiModel("TeamspaceUpdatePutRequest")
public class TeamspaceUpdatePutReq {

    @ApiModelProperty(name = "팀 스페이스 team_name", example="team_name")
    String teamName;

    @ApiModelProperty(name = "팀 스페이스 start_date", example = "2023-01-01")
    LocalDate startDate;

    @ApiModelProperty(name = "팀 스페이스 end_date", example = "2023-01-01")
    LocalDate endDate;

    @ApiModelProperty(name = "팀 스페이스 description", example = "팀스페이스입니다.")
    String teamDescription;

//    @ApiModelProperty(name = "팀 스페이스 썸네일 file idx", example = "1134")
//    File teamspace_picture_file_idx;

//    @ApiModelProperty(name = "팀 스페이스 배경 사진 file idx", example = "1134")
//    File teamspace_background_picture_file_idx;
}
