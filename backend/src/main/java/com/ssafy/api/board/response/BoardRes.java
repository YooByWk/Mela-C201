package com.ssafy.api.board.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.db.entity.Board;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("BoardResponse")
public class BoardRes {
    Long boardIdx;

    String nickname;

    String title;

    String content;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    LocalDateTime registDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    LocalDateTime updateDate;

    int viewNum=0;

    Long userIdx;

    public static BoardRes of(Board board){
        BoardRes res = new BoardRes();
        res.setBoardIdx(board.getBoardIdx());
        res.setTitle(board.getTitle());
        res.setContent(board.getContent());
        res.setNickname(board.getNickname());
        res.setRegistDate(board.getRegistDate());
        res.setUpdateDate(board.getUpdateDate());
        res.setViewNum(board.getViewNum());
        res.setUserIdx(board.getUserIdx().getUserIdx());
        return res;
    }
}
