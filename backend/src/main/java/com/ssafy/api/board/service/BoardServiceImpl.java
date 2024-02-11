package com.ssafy.api.board.service;

import com.ssafy.api.board.request.BoardGetListReq;
import com.ssafy.api.board.request.BoardRegisterPostReq;
import com.ssafy.api.board.request.BoardUpdatePutReq;
import com.ssafy.api.board.request.CommentRegisterPostReq;
import com.ssafy.common.util.NotificationUtil;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.BoardLike;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Transactional
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
    @Autowired
    BoardLikeRepository boardLikeRepository;

    @Autowired
    NotificationUtil notificationUtil;

    @Override
    public Board registBoard(BoardRegisterPostReq registInfo, User user) {
        Board board = new Board();
        board.setNickname(user.getNickname());
        board.setContent(registInfo.getContent());
        board.setTitle(registInfo.getTitle());
        board.setUserIdx(user);
        board.setViewNum(0);
        board.setRegistDate(LocalDateTime.now());
        boardRepository.save(board);

        String message = user.getNickname() + " 님이 게시물을 작성하였습니다.";
        notificationUtil.addFeed(message, user);

        return board;
    }

    @Override
    public Board updateBoard(BoardUpdatePutReq updateInfo, Long boardIdx, Long userIdx) {
        Board board = boardRepository.getOne(boardIdx);
        board.setTitle(updateInfo.getTitle());
        board.setContent(updateInfo.getContent());

        board.setNickname(userRepository.getOne(userIdx).getNickname());
        board.setUpdateDate(LocalDateTime.now());

        return boardRepository.save(board);
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

        // 기본 정렬: 최신순
        Sort sort = (getListInfo.getSortKey() != null)
                ? Sort.by(Sort.Direction.DESC, getListInfo.getSortKey())
                : Sort.by(Sort.Direction.DESC, "boardIdx");

        pageable = PageRequest.of(getListInfo.getPage(), getListInfo.getSize(), sort);
        page = boardRepository.findByTitleContainingOrContentContaining(getListInfo.getWord(), pageable);

        return page.getContent();
    }

    public int getBoardTotalCount() {
        return boardRepositorySupport.countByBoards();
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

        if (board.getUserIdx().getUserIdx() != user.getUserIdx()) {
            String message = board.getTitle();
            if (message.length() >= 7) {
                message = message.substring(0, 7) + "..";
            }

            message = "'" + message + "' 에 댓글이 등록되었습니다.";
            notificationUtil.sendNotification(message, board.getUserIdx());
        }
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

    @Override
    public int getBoardCommentNum(Long boardIdx) {

        return commentRepository.countByBoardIdx(boardRepository.getOne(boardIdx));
    }

    @Override
    public void likeBoard(Long boardIdx, User user) {
        Optional<BoardLike> boardLike = boardLikeRepository.findByUserIdxAndBoardIdx(user, boardRepository.getOne(boardIdx));
        if(boardLike.isPresent()) {
            deleteLikeBoard(boardIdx, user);
        } else {
            createLikeBoard(boardIdx, user);
        }
    }

    @Override
    public boolean isLikeBoard(Long boardIdx, Long userIdx) {
        Optional<BoardLike> boardLike = boardLikeRepository.findByUserIdxAndBoardIdx(userRepository.getOne(userIdx), boardRepository.getOne(boardIdx));

        if (boardLike.isPresent()) {
            return true;
        }

        return false;
    }


    @Override
    public void createLikeBoard(Long boardIdx, User user) {
        BoardLike boardLike = new BoardLike();
        boardLike.setBoardIdx(boardRepository.getOne(boardIdx));
        boardLike.setUserIdx(user);
        boardLikeRepository.save(boardLike);
    }

    @Override
    public void deleteLikeBoard(Long boardIdx, User user) {
        BoardLike boardLike = boardLikeRepository.findByUserIdxAndBoardIdx(user, boardRepository.getOne(boardIdx)).get();
        boardLikeRepository.delete(boardLike);
    }

    @Override
    public int getBoardLikeNum(Long boardIdx) {
        return boardLikeRepository.countByBoardIdx(boardRepository.getOne(boardIdx));
    }

}
