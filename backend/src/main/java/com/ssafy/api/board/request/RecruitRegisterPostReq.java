package com.ssafy.api.board.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ApiModel("RecruitRegisterPostRequest")
public class RecruitRegisterPostReq {
    @ApiModelProperty(name="제목", example="제목")
    String title;

    @ApiModelProperty(name="내용", example="내용")
    String content;

    @ApiModelProperty(name="마감일", example="2000-01-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate endDate;

    @ApiModelProperty(name="장르1", example="Pop")
    String genreName1;

    @ApiModelProperty(name="장르2", example="Rock")
    String genreName2;
    
    @ApiModelProperty(name="장르3", example="Etc")
    String genreName3;

    @ApiModelProperty(name="포지션 리스트")
    List<String> positions;

}
