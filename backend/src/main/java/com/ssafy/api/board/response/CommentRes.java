package com.ssafy.api.board.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.User;
import com.sun.istack.NotNull;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Getter
@Setter
@ApiOperation("CommentResponse")
public class CommentRes {
    Long commentIdx;

    String nickname;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    LocalDateTime registDate;

    String content;

    Long userIdx;

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
