package com.ssafy.api.board.service;

import com.ssafy.api.board.request.BoardGetListReq;
import com.ssafy.api.board.request.BoardUpdatePutReq;
import com.ssafy.api.board.request.BoardRegisterPostReq;
import com.ssafy.api.board.request.CommentRegisterPostReq;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.User;

import java.util.List;

public interface BoardService {
    Board registBoard(BoardRegisterPostReq registInfo, User user);
    Board updateBoard(BoardUpdatePutReq updateInfo, Long boardIdx, Long userIdx);
    void deleteBoard(Long boardIdx);
    Board getBoard(Long boardIdx) throws Exception;
    List<Board> getBoardList(BoardGetListReq getListInfo);
    int getBoardTotalCount();

    void registComment(CommentRegisterPostReq registInfo, Board board, User user);
    void deleteComment(Long commentIdx);
    List<Comment> listComment(Long boardIdx);
    int getBoardCommentNum(Long boardIdx);

    void likeBoard(Long boardIdx, User user);
    boolean isLikeBoard(Long boardIdx, Long userIdx);
    void createLikeBoard(Long boardIdx, User user);
    void deleteLikeBoard(Long boardIdx, User user);
    int getBoardLikeNum(Long boardIdx);

}
