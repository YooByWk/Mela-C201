package com.ssafy.api.board.service;

import com.ssafy.api.board.request.BoardRegisterPostReq;
import com.ssafy.api.board.request.BoardUpdatePutReq;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.BoardRepository;
import com.ssafy.db.repository.BoardRepositorySupport;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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

    @Override
    public void updateBoard(BoardUpdatePutReq updateInfo, Long boardIdx, Long userIdx) {
        Board board = boardRepository.getOne(boardIdx);
        board.setTitle(updateInfo.getTitle());
        board.setContent(updateInfo.getContent());
        board.setNickname(userRepository.getOne(userIdx).getNickname());
        board.setUpdateDate(LocalDateTime.now());
        boardRepository.save(board);
    }

    @Override
    public void deleteBoard(Long boardIdx) {
        Board board = boardRepository.getOne(boardIdx);
        boardRepository.delete(board);
    }

    @Override
    public Board getBoard(Long boardIdx) throws Exception{
        Board board = boardRepository.getOne(boardIdx);
        return board;
    }

    @Override
    public List<Board> getBoardList() {
        return null;
    }
}
