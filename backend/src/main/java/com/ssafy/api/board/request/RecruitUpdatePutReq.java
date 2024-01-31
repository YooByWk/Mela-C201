package com.ssafy.api.board.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@ApiModel("RecruitUpdatePutRequest")
public class RecruitUpdatePutReq {
    @ApiModelProperty(name="제목", example="제목")
    String title;

    @ApiModelProperty(name="내용", example="내용")
    String content;

    @ApiModelProperty(name="마감일", example="2000-01-01")
    LocalDate endDate;

    @ApiModelProperty(name="장르1", example="Pop")
    String genreIdx1;

    @ApiModelProperty(name="장르2", example="Rock")
    String genreIdx2;

    @ApiModelProperty(name="장르3", example="Etc")
    String genreIdx3;

}
