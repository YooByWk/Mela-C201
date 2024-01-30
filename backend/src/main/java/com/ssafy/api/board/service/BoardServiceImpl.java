package com.ssafy.api.board.service;

import com.ssafy.api.board.response.BoardRegisterPostReq;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.BoardRepository;
import com.ssafy.db.repository.BoardRepositorySupport;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("BoardService")
public class BoardServiceImpl implements BoardService {
    @Autowired
    BoardRepository boardRepository;
    @Autowired
    BoardRepositorySupport boardRepositorySupport;
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserRepositorySupport userRepositorySupport;
    @Override
    public void registBoard(BoardRegisterPostReq registInfo, User user) {
        Board board = new Board();
        board.setNickname(user.getNickname());
        board.setContent(registInfo.getContent());
        board.setTitle(registInfo.getTitle());
        board.setUserIdx(user);
        board.setViewNum(0);
        boardRepository.save(board);
    }
}
