package com.ssafy.api.board.service;

import com.ssafy.api.board.request.RecruitGetListReq;
import com.ssafy.api.board.request.RecruitRegisterPostReq;
import com.ssafy.api.board.request.RecruitUpdatePutReq;
import com.ssafy.api.board.response.BoardRecruitRes;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.BoardRecruit;
import com.ssafy.db.entity.Position;
import com.ssafy.db.entity.User;

import java.util.List;

public interface RecruitService {
    void registBoard(RecruitRegisterPostReq registInfo, User user);
    void updateBoard(RecruitUpdatePutReq updateInfo, Long recruitIdx, User user);
    void deleteBoard(Long recruitIdx);
    BoardRecruitRes getBoard(Long recruitIdx) throws Exception;
    List<BoardRecruit> getBoardList(RecruitGetListReq getListInfo);
    void createBoardRecruitPosition(BoardRecruit boardRecruit, List<String> genres);
    void deleteBoardRecruitPosition(BoardRecruit boardRecruit);
    List<Position> getPositions(Long recruitIdx);
}
