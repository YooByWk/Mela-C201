package com.ssafy.api.board.service;

import com.ssafy.api.board.request.RecruitGetListReq;
import com.ssafy.api.board.request.RecruitRegisterPostReq;
import com.ssafy.api.board.request.RecruitUpdatePutReq;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.User;

import java.util.List;

public interface RecruitService {
    void registBoard(RecruitRegisterPostReq registInfo, User user);
    void updateBoard(RecruitUpdatePutReq updateInfo, Long boardIdx, Long userIdx);
    void deleteBoard(Long boardIdx);
    Board getBoard(Long boardIdx) throws Exception;
    List<Board> getBoardList(RecruitGetListReq getListInfo);
}
