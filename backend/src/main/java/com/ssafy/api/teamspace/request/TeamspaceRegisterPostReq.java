package com.ssafy.api.teamspace.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.db.entity.File;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@ApiModel("TeamspaceRegisterPostRequest")
public class TeamspaceRegisterPostReq {
    @ApiModelProperty(name="팀 스페이스 team_name", example="team_name")
    String teamName;

    @ApiModelProperty(name = "팀 스페이스 start_date", example = "2023-01-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate startDate;

    @ApiModelProperty(name = "팀 스페이스 end_date", example = "2023-01-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate endDate;

    @ApiModelProperty(name = "팀 스페이스 description", example = "팀스페이스입니다.")
    String teamDescription;

    //FIXME: 아래는 필요없을 것 같다.
//    @ApiModelProperty(name = "팀 스페이스 ", example = "1134")
//    File teamspace_picture_file_idx;

    //전체 컬럼: teamspace_idx, end_date, start_date, team_description, team_name, host_user_idx, teamspace_background_picture_file_idx, teamspace_picture_file_idx
    //입력 안 받음: teamspace_idx, host_user_idx, teamspace_background_picture_file_idx, teamspace_picture_file_idx
}
