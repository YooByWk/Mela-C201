package com.ssafy.api.board.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("BoardUpdatePutRequest")
public class BoardUpdatePutReq {
    @ApiModelProperty(name="제목", example="제목")
    String title;

    @ApiModelProperty(name="내용", example="내용")
    String content;
}
