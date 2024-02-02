package com.ssafy.api.board.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("BoardListResponse")
public class BoardListRes {
    @ApiModelProperty(name="board list")
    List<BoardRes> boardResList;
    @ApiModelProperty(name="total page count")
    int totalPageCount;

    public static BoardListRes of(List<BoardRes> boards, int cnt) {
        BoardListRes res = new BoardListRes();
        res.setBoardResList(boards);
        res.setTotalPageCount(cnt);
        return res;
    }
}
