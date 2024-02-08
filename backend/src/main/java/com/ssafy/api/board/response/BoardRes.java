package com.ssafy.api.board.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.db.entity.Board;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("BoardResponse")
public class BoardRes {
    @ApiModelProperty(name="board idx")
    Long boardIdx;
    @ApiModelProperty(name="write user nickname")
    String nickname;
    @ApiModelProperty(name="title")
    String title;
    @ApiModelProperty(name="content")
    String content;
    @ApiModelProperty(name="regist time", example = "20000-02-02 22:22:22")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    LocalDateTime registDate;
    @ApiModelProperty(name="update time", example = "20000-02-02 22:22:22")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    LocalDateTime updateDate;
    @ApiModelProperty(name="viewNum")
    int viewNum=0;
    @ApiModelProperty(name="write user idx")
    Long userIdx;
    @ApiModelProperty(name="like number")
    int likeNum;
    @ApiModelProperty(name="comment number")
    int commentNum;

    public static BoardRes of(Board board, int likeNum, int commentNum){
        BoardRes res = new BoardRes();
        res.setBoardIdx(board.getBoardIdx());
        res.setTitle(board.getTitle());
        res.setContent(board.getContent());
        res.setNickname(board.getNickname());
        res.setRegistDate(board.getRegistDate());
        res.setUpdateDate(board.getUpdateDate());
        res.setViewNum(board.getViewNum());
        res.setUserIdx(board.getUserIdx().getUserIdx());
        res.setLikeNum(likeNum);
        res.setCommentNum(commentNum);
        return res;
    }
}
