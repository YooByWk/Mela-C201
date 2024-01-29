package com.ssafy.api.teamspace.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.db.entity.File;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @ApiModelProperty(name = "팀 스페이스 host idx", example = "작성 X / 인증정보 통해서 가져옴")
    User host;

    @ApiModelProperty(name = "팀 스페이스 description", example = "팀스페이스입니다.")
    String teamDescription;

    @ApiModelProperty(name = "팀 스페이스 ", example = "1134")
    File teamspace_picture_file_idx;
}
