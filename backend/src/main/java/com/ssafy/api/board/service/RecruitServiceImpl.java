package com.ssafy.api.board.service;

import com.ssafy.api.board.request.*;
import com.ssafy.api.board.response.BoardRecruitRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    PositionRepository positionRepository;
    @Autowired
    BoardRecruitPositionRepository recruitPositionRepository;

    @Autowired
    BoardService boardService;

    @Override
    public BoardRecruit registBoard(RecruitRegisterPostReq registInfo, User user) {
        BoardRegisterPostReq boardInfo = new BoardRegisterPostReq();
        boardInfo.setTitle(registInfo.getTitle());
        boardInfo.setContent(registInfo.getContent());

        Board board = boardService.registBoard(boardInfo, user);

        BoardRecruit boardRecruit = new BoardRecruit();
        boardRecruit.setBoardIdx(board);
        boardRecruit.setEndDate(registInfo.getEndDate());
        if (registInfo.getGenreName1() != null && registInfo.getGenreName1() != "") {
            boardRecruit.setGenreIdx1(genreRepository.findByGenreName(registInfo.getGenreName1()).get());
        }
        if (registInfo.getGenreName2() != null && registInfo.getGenreName2() != "") {
            boardRecruit.setGenreIdx2(genreRepository.findByGenreName(registInfo.getGenreName2()).get());
        }
        if (registInfo.getGenreName3() != null && registInfo.getGenreName3() != "") {
            boardRecruit.setGenreIdx3(genreRepository.findByGenreName(registInfo.getGenreName3()).get());
        }

        recruitRepository.save(boardRecruit);

        // 포지션 저장
        createBoardRecruitPosition(boardRecruit, registInfo.getPositions());

        return boardRecruit;
    }

    @Override
    public void updateBoard(RecruitUpdatePutReq updateInfo, Long recruitIdx, User user) {
        BoardRecruit boardRecruit = recruitRepository.getOne(recruitIdx);

        // 1. board update
        BoardUpdatePutReq boardInfo = new BoardUpdatePutReq();
        boardInfo.setTitle(updateInfo.getTitle());
        boardInfo.setContent(updateInfo.getContent());
        Board board = boardService.updateBoard(boardInfo, boardRecruit.getBoardIdx().getBoardIdx(), user.getUserIdx());

        // 2. boardRecruit update
        boardRecruit.setEndDate(updateInfo.getEndDate());
        boardRecruit.setGenreIdx1(null);
        boardRecruit.setGenreIdx2(null);
        boardRecruit.setGenreIdx3(null);

        if (updateInfo.getGenreName1() != null && updateInfo.getGenreName1() != "") {
            System.out.println("1");
            boardRecruit.setGenreIdx1(genreRepository.findByGenreName(updateInfo.getGenreName1()).get());
        }
        if (updateInfo.getGenreName2() != null && updateInfo.getGenreName2() != "") {
            System.out.println("2");
            boardRecruit.setGenreIdx2(genreRepository.findByGenreName(updateInfo.getGenreName2()).get());
        }
        if (updateInfo.getGenreName3() != null && updateInfo.getGenreName3() != "") {
            System.out.println("3");
            boardRecruit.setGenreIdx3(genreRepository.findByGenreName(updateInfo.getGenreName3()).get());
        }

        recruitRepository.save(boardRecruit);

        // 3. position update
        deleteBoardRecruitPosition(boardRecruit);
        createBoardRecruitPosition(boardRecruit, updateInfo.getPositions());

    }

    @Override
    public void deleteBoard(Long recruitIdx) {
        BoardRecruit boardRecruit = recruitRepository.findById(recruitIdx).get();
        Board board = boardRecruit.getBoardIdx();

        boardRepository.delete(board);
    }

    @Override
    public BoardRecruitRes getBoard(Long recruitIdx) throws Exception {
        BoardRecruit boardRecruit = recruitRepository.getOne(recruitIdx);

        List<BoardRecruitPosition> recruitPositions = recruitPositionRepository.findByBoardRecruitIdx(boardRecruit);
        List<Position> positions = new ArrayList<>();

        for (BoardRecruitPosition position : recruitPositions) {
            positions.add(position.getPositionIdx());
        }

        return BoardRecruitRes.of(boardRecruit.getBoardIdx(), boardRecruit, positions, boardService.getBoardLikeNum(boardRecruit.getBoardIdx().getBoardIdx()));
    }

    @Override
    public List<BoardRecruit> getBoardList(RecruitGetListReq getListInfo) {
        Pageable pageable;
        Page<BoardRecruit> page;

        //TODO: 좋아요 순 정렬

        // 기본 정렬: 최신순
        Sort sort = (getListInfo.getSortKey() != null)
                ? Sort.by(Sort.Direction.DESC, getListInfo.getSortKey())
                : Sort.by(Sort.Direction.DESC, "boardIdx");

        pageable = PageRequest.of(getListInfo.getPage(), getListInfo.getSize(), sort);
        page = recruitRepository.findByTitleContainingOrContentContaining(getListInfo.getWord(), pageable);

        return page.getContent();
    }

    @Override
    public List<BoardRecruit> getMyBoardList(RecruitGetMyListReq getListInfo, User user) {
        Pageable pageable;
        Page<BoardRecruit> page;

        Sort sort = Sort.by(Sort.Direction.DESC, "boardIdx");

        pageable = PageRequest.of(getListInfo.getPage(), getListInfo.getSize(), sort);
        page = recruitRepository.findByUserIdx(user, pageable);

        return page.getContent();
    }

    @Override
    public int getMyBoardTotalCount(User user) {
        return recruitRepositorySupport.countByMyRecruitBoards(user);
    }

    @Override
    public int getBoardTotalCount() {
        return (int) recruitRepository.count();
    }

    @Override
    public void createBoardRecruitPosition(BoardRecruit boardRecruit, List<String> positions) {
        for (String position : positions) {
            BoardRecruitPosition boardRecruitPosition = new BoardRecruitPosition();
            boardRecruitPosition.setPositionIdx(positionRepository.findByPositionName(position).get());
            boardRecruitPosition.setBoardRecruitIdx(boardRecruit);
            recruitPositionRepository.save(boardRecruitPosition);
        }
    }

    @Override
    public void deleteBoardRecruitPosition(BoardRecruit boardRecruit) {
        List<BoardRecruitPosition> positions = recruitPositionRepository.findByBoardRecruitIdx(boardRecruit);
        for (BoardRecruitPosition position : positions) {
            recruitPositionRepository.delete(position);
        }
    }

    @Override
    public List<Position> getPositions(Long recruitIdx) {
         List<BoardRecruitPosition> recruitPositions = recruitPositionRepository.findByBoardRecruitIdx(recruitRepository.getOne(recruitIdx));

         List<Position> res = new ArrayList<>();
         for (BoardRecruitPosition position : recruitPositions) {
             res.add(position.getPositionIdx());
         }

        return res;
    }

    @Override
    public List<BoardRecruit> getRecommendedBoardList(RecruitGetListReq getListInfo, User user) {
        Pageable pageable;
        Page<BoardRecruit> page;

        // 기본 정렬: 최신순
        Sort sort = (getListInfo.getSortKey() != null)
                ? Sort.by(Sort.Direction.DESC, getListInfo.getSortKey())
                : Sort.by(Sort.Direction.DESC, "boardRecruitIdx");

        pageable = PageRequest.of(getListInfo.getPage(), getListInfo.getSize(), sort);
        page = recruitRepository.findRecommendedBoardListByGenreIdx(getListInfo.getWord(), user, pageable);

        return page.getContent();
    }
}
