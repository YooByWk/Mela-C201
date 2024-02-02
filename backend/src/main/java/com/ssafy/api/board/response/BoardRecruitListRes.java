package com.ssafy.api.board.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("BoardRecruitListResponse")
public class BoardRecruitListRes {
    @ApiModelProperty(name="board recruit list")
    List<BoardRecruitRes> boardRecruitRes;
    @ApiModelProperty(name="total page count")
    int totalPageCount;

    public static BoardRecruitListRes of(List<BoardRecruitRes> recruits, int cnt) {
        BoardRecruitListRes res = new BoardRecruitListRes();
        res.setBoardRecruitRes(recruits);
        res.setTotalPageCount(cnt);
        return res;
    }
}
