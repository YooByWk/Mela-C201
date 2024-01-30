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
    Long teamspaceIdx;
    String teamName;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate endDate;
    String teamDescription;
    User host;
    File teamspacePictureFileIdx;
    File teamspaceBackgroundPictureFileIdx;
}
