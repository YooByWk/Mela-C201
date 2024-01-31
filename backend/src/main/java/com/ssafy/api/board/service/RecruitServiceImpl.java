package com.ssafy.api.board.service;

import com.ssafy.api.board.request.BoardRegisterPostReq;
import com.ssafy.api.board.request.RecruitGetListReq;
import com.ssafy.api.board.request.RecruitRegisterPostReq;
import com.ssafy.api.board.request.RecruitUpdatePutReq;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service("gatherService")
public class RecruitServiceImpl implements RecruitService {

    @Autowired
    BoardRecruitRepository recruitRepository;
    @Autowired
    BoardRecruitRepositorySupport recruitRepositorySupport;
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
    GenreRepository genreRepository;
    @Autowired
    BoardRecruitPositionRepository recruitPositionRepository;

    @Autowired
    BoardService boardService;

    @Override
    public void registBoard(RecruitRegisterPostReq registInfo, User user) {
        BoardRegisterPostReq boardInfo = new BoardRegisterPostReq();
        boardInfo.setTitle(registInfo.getTitle());
        boardInfo.setContent(registInfo.getContent());
        Board board = boardService.registBoard(boardInfo, user);

        BoardRecruit boardRecruit = new BoardRecruit();
        boardRecruit.setBoardIdx(board);
        if (registInfo.getGenreIdx1() != null && registInfo.getGenreIdx1() != "") {
            boardRecruit.setGenreIdx1(genreRepository.findByGenreName(registInfo.getGenreIdx1()).get());
        }
        if (registInfo.getGenreIdx2() != null && registInfo.getGenreIdx2() != "") {
            boardRecruit.setGenreIdx2(genreRepository.findByGenreName(registInfo.getGenreIdx2()).get());
        }
        if (registInfo.getGenreIdx3() != null && registInfo.getGenreIdx3() != "") {
            boardRecruit.setGenreIdx3(genreRepository.findByGenreName(registInfo.getGenreIdx3()).get());
        }

        recruitRepository.save(boardRecruit);

        // 포지션 저장
        List<Position> positions = registInfo.getPositions();
        for (Position position : positions) {
            BoardRecruitPosition boardRecruitPosition = new BoardRecruitPosition();
            boardRecruitPosition.setPositionIdx(position);
            boardRecruitPosition.setBoardRecruitIdx(boardRecruit);
            recruitPositionRepository.save(boardRecruitPosition);
        }

    }

    @Override
    public void updateBoard(RecruitUpdatePutReq updateInfo, Long boardIdx, Long userIdx) {

    }

    @Override
    public void deleteBoard(Long boardIdx) {

    }

    @Override
    public Board getBoard(Long boardIdx) throws Exception {
        return null;
    }

    @Override
    public List<Board> getBoardList(RecruitGetListReq getListInfo) {
        return null;
    }
}
