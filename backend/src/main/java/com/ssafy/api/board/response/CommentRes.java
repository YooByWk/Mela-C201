package com.ssafy.api.board.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.db.entity.Comment;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiOperation("CommentResponse")
public class CommentRes {
    @ApiModelProperty(name="comment idx")
    Long commentIdx;

    @ApiModelProperty(name="write user nickname")
    String nickname;

    @ApiModelProperty(name="regist time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    LocalDateTime registDate;

    @ApiModelProperty(name="content")
    String content;

    @ApiModelProperty(name="write user idx")
    Long userIdx;

    @ApiModelProperty(name="board idx")
    Long boardIdx;

    public static CommentRes of(Comment comment) {
        CommentRes res = new CommentRes();
        res.setCommentIdx(comment.getCommentIdx());
        res.setNickname(comment.getNickname());
        res.setRegistDate(comment.getRegistDate());
        res.setContent(comment.getContent());
        res.setUserIdx(comment.getUserIdx().getUserIdx());
        res.setBoardIdx(comment.getBoardIdx().getBoardIdx());
        return res;
    }
}
