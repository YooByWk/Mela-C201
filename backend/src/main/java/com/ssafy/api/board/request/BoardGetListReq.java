package com.ssafy.api.board.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("BoardGetListRequest")
public class BoardGetListReq {
    @ApiModelProperty(name="페이지 번호", example="1")
    int page;
    @ApiModelProperty(name="페이지 사이즈 (페이지당 글 개수)", example="20")
    int size;
    @ApiModelProperty(name="검색 내용", example="검색내용")
    String word;
    @ApiModelProperty(name="정렬 조건", example="조회수")
    String sortKey;
}
