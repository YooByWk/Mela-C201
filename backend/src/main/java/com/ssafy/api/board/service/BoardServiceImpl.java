package com.ssafy.api.board.service;

import com.ssafy.api.board.request.BoardGetListReq;
import com.ssafy.api.board.request.BoardRegisterPostReq;
import com.ssafy.api.board.request.BoardUpdatePutReq;
import com.ssafy.api.board.request.CommentRegisterPostReq;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    CommentRepository commentRepository;
    @Autowired
    CommentRepositorySupport commentRepositorySupport;
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
        board.setRegistDate(LocalDateTime.now());
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
        board.setViewNum(board.getViewNum()+1);
        boardRepository.save(board);
        return board;
    }

    @Override
    public List<Board> getBoardList(BoardGetListReq getListInfo) {
        Pageable pageable;
        Page<Board> page;

        //TODO: 좋아요 순 정렬
        
        // 기본 정렬: 최신순
        Sort sort = (getListInfo.getSortKey() != null)
                ? Sort.by(Sort.Direction.DESC, getListInfo.getSortKey())
                : Sort.by(Sort.Direction.DESC, "boardIdx");

        if (getListInfo.getWord() == null) {
            pageable = PageRequest.of(getListInfo.getPage(), getListInfo.getSize(), sort);
            page = boardRepository.findAll(pageable);
        } else {
            pageable = PageRequest.of(getListInfo.getPage(), getListInfo.getSize(), sort);
            page = boardRepository.findByTitleContainingOrContentContaining(getListInfo.getWord(), getListInfo.getWord(), pageable);
        }

        return page.getContent();
    }

    @Override
    public void registComment(CommentRegisterPostReq registInfo, Board board, User user) {
        Comment comment = new Comment();
        comment.setContent(registInfo.getContent());
        comment.setNickname(user.getNickname());
        comment.setUserIdx(user);
        comment.setRegistDate(LocalDateTime.now());
        comment.setBoardIdx(board);
        commentRepository.save(comment);
    }

    @Override
    public void deleteComment(Long commentIdx) {
        Comment comment = commentRepository.getOne(commentIdx);
        commentRepository.delete(comment);
    }

    @Override
    public List<Comment> listComment(Long boardIdx) {
        List<Comment> comments = commentRepository.findByBoardIdxOrderByRegistDateDesc(boardRepository.getOne(boardIdx));

        return comments;
    }
}
