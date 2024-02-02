package com.ssafy.api.teamspace.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.db.entity.File;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@ApiModel("TeamspaceListResponse")
public class TeamspaceListRes {
    @ApiModelProperty(name="teamspace idx")
    Long teamspaceIdx;

    @ApiModelProperty(name="team name")
    String teamName;

    @ApiModelProperty(name="start date", example = "2000-02-02")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate startDate;

    @ApiModelProperty(name="end date", example = "2000-02-02")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate endDate;

    @ApiModelProperty(name="teams description")
    String teamDescription;

    @ApiModelProperty(name="host")
    User host;

    @ApiModelProperty(name="teamspace picture file")
    File teamspacePictureFileIdx;

    @ApiModelProperty(name="teamspace background picture File")
    File teamspaceBackgroundPictureFileIdx;
}
