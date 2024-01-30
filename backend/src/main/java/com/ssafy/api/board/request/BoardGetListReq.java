package com.ssafy.api.board.request;

import io.swagger.annotations.ApiModelProperty;

public class BoardGetListReq {
    @ApiModelProperty(name="페이지 번호", example="1")
    int pgno;
    @ApiModelProperty(name="페이지 당 글 개수", example="20")
    int spp;
    @ApiModelProperty(name="검색내용", example="검색내용")
    String word;
}
