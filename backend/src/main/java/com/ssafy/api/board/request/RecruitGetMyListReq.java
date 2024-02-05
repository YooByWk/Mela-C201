package com.ssafy.api.board.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RecruitGetMyListRequest")
public class RecruitGetMyListReq {
    @ApiModelProperty(name="페이지 번호", example="1")
    int page;
    @ApiModelProperty(name="페이지 사이즈 (페이지당 글 개수)", example="20")
    int size;
}
