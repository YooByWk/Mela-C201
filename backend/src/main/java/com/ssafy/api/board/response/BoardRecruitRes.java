package com.ssafy.api.board.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.BoardRecruit;
import com.ssafy.db.entity.Position;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("BoardRecruitResponse")
public class BoardRecruitRes {
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

    @ApiModelProperty(name="board_recruit idx")
    Long boardRecruitIdx;
    @ApiModelProperty(name="마감일", example="2000-01-01")
    LocalDate endDate;
    @ApiModelProperty(name="장르1", example="Pop")
    String genreName1;
    @ApiModelProperty(name="장르2", example="Rock")
    String genreName2;
    @ApiModelProperty(name="장르3", example="Etc")
    String genreName3;
    @ApiModelProperty(name="포지션 리스트")
    List<String> positions;

    public static BoardRecruitRes of(Board board, BoardRecruit boardRecruit, List<Position> positions, int likeNum){
        BoardRecruitRes res = new BoardRecruitRes();
        res.setBoardIdx(board.getBoardIdx());
        res.setTitle(board.getTitle());
        res.setContent(board.getContent());
        res.setNickname(board.getNickname());
        res.setRegistDate(board.getRegistDate());
        res.setUpdateDate(board.getUpdateDate());
        res.setViewNum(board.getViewNum());
        res.setUserIdx(board.getUserIdx().getUserIdx());
        res.setLikeNum(likeNum);

        res.setBoardRecruitIdx(boardRecruit.getBoardRecruitIdx());
        res.setEndDate(boardRecruit.getEndDate());
        if (boardRecruit.getGenreIdx1() != null) {
            res.setGenreName1(boardRecruit.getGenreIdx1().getGenreName());
        }
        if (boardRecruit.getGenreIdx2() != null) {
            res.setGenreName2(boardRecruit.getGenreIdx2().getGenreName());
        }
        if (boardRecruit.getGenreIdx3() != null) {
            res.setGenreName1(boardRecruit.getGenreIdx3().getGenreName());
        }

        List<String> tmp = new ArrayList<>();
        for (Position position : positions) {
            tmp.add(position.getPositionName());
        }

        res.setPositions(tmp);
        return res;
    }
}
