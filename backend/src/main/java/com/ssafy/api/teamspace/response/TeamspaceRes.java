package com.ssafy.api.teamspace.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.api.file.service.FileService;
import com.ssafy.db.entity.File;
import com.ssafy.db.entity.Teamspace;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

@Getter
@Setter
@ApiModel("TeamspaceResponse")
public class TeamspaceRes {
    @ApiModelProperty(name="teamspace id")
    Long teamspaceIdx;
    @ApiModelProperty(name="teamspace teamName")
    String teamName;
    @ApiModelProperty(name="teamspace startDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate startDate;
    @ApiModelProperty(name="teamspace endDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate endDate;
    @ApiModelProperty(name="teamspace description")
    String teamDescription;
    @ApiModelProperty(name="teamspace host")
    User host;
    @ApiModelProperty(name="teamspace 썸네일")
    File teamspacePictureFile;
    @ApiModelProperty(name="teamspace 배경사진")
    File teamspaceBackgroundPictureFile;

    @Autowired
    FileService fileService;

    //@ApiModelProperty(name="teamspace 썸네일 URL")
    //사용자로부터 입력받는 파라미터 아님!
    String teamspacePictureFileURL;
    //@ApiModelProperty(name="teamspace 배경사진 URL")
    //사용자로부터 입력받는 파라미터 아님!
    String teamspaceBackgroundPictureFileURL;

    public static TeamspaceRes of(Teamspace teamspace) {
//    public TeamspaceRes of(Teamspace teamspace) {
        TeamspaceRes res = new TeamspaceRes();
        res.setTeamspaceIdx(teamspace.getTeamspaceIdx());
        res.setTeamName(teamspace.getTeamName());
        res.setStartDate(teamspace.getStartDate());
        res.setEndDate(teamspace.getEndDate());
        res.setTeamDescription(teamspace.getTeamDescription());
        res.setHost(teamspace.getHost());
//        res.setTeamspacePictureFileIdx(teamspace.getTeamspacePictureFileIdx());
//        res.setTeamspaceBackgroundPictureFileIdx(teamspace.getTeamspaceBackgroundPictureFileIdx());
        return res;
    }

    @Override
    public String toString() {
        return "TeamspaceRes{" +
                "teamspaceIdx=" + teamspaceIdx +
                ", teamName='" + teamName + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", teamDescription='" + teamDescription + '\'' +
                ", host=" + host +
                ", teamspacePictureFile=" + teamspacePictureFile +
                ", teamspaceBackgroundPictureFile=" + teamspaceBackgroundPictureFile +
                ", fileService=" + fileService +
                ", teamspacePictureFileURL='" + teamspacePictureFileURL + '\'' +
                ", teamspaceBackgroundPictureFileURL='" + teamspaceBackgroundPictureFileURL + '\'' +
                '}';
    }
}
