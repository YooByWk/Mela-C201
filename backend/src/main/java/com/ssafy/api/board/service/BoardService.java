package com.ssafy.api.board.service;

import com.ssafy.api.board.response.BoardRegisterPostReq;
import com.ssafy.db.entity.User;

public interface BoardService {
    void registBoard(BoardRegisterPostReq registInfo, User user);
}
