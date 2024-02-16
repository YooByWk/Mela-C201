package com.ssafy.api.board.controller;

import com.ssafy.api.board.request.RecruitGetListReq;
import com.ssafy.api.board.request.RecruitRegisterPostReq;
import com.ssafy.api.board.request.RecruitUpdatePutReq;
import com.ssafy.api.board.response.BoardRecruitListRes;
import com.ssafy.api.board.response.BoardRecruitRes;
import com.ssafy.api.board.service.BoardService;
import com.ssafy.api.board.service.RecruitService;
import com.ssafy.api.user.service.PortfolioService;
import com.ssafy.api.user.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.BoardRecruit;
import com.ssafy.db.entity.Position;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Api(value = "구인 API", tags = {"Recruit"})
@RestController
@RequestMapping("/api/v1/recruit")
public class RecruitController {
    @Autowired
    RecruitService recruitService;
    @Autowired
    UserService userService;
    @Autowired
    BoardService boardService;

    @Autowired
    PortfolioService portfolioService;

    @GetMapping("")
    @ApiOperation(value = "구인글 리스트 조회", notes = "<string>페이지번호(page), 페이지당 글 수(size), 검색어(word), 정렬조건(sortKey) </string>에 따라 게시글을 조회한다.")
    public ResponseEntity<BoardRecruitListRes> getBoardList(
            @ApiParam(value = "페이지 번호 (1부터 시작)", example = "1") @RequestParam int page,
            @ApiParam(value = "페이지당 글 수", example = "10") @RequestParam int size,
            @ApiParam(value = "검색어", example = "검색내용") @RequestParam(required = false) String word,
            @ApiParam(value = "정렬 조건", example = "viewNum") @RequestParam(required = false) String sortKey
    ) {
        page-=1; // 1부터 시작하도록 함

        RecruitGetListReq recruitGetListReq = new RecruitGetListReq();
        recruitGetListReq.setPage(page);
        recruitGetListReq.setSize(size);
        recruitGetListReq.setWord(word);
        recruitGetListReq.setSortKey(sortKey);

        List<BoardRecruit> recruits = recruitService.getBoardList(recruitGetListReq);  //boardService.getBoardList(boardGetListReq);

        List<BoardRecruitRes> res = new ArrayList<>();
        for (BoardRecruit board : recruits) {
            List<Position> positions = recruitService.getPositions(board.getBoardRecruitIdx());
            res.add(BoardRecruitRes.of(board.getBoardIdx(), board, positions, boardService.getBoardLikeNum(board.getBoardIdx().getBoardIdx())));
        }


        return ResponseEntity.status(200).body(BoardRecruitListRes.of(res, recruitService.getBoardTotalCount()));
    }

    @GetMapping("/recommend")
    @ApiOperation(value = "나를 찾는 (추천) 구인글 리스트 조회", notes = "<string>페이지번호(page), 페이지당 글 수(size), 검색어(word), 정렬조건(sortKey) </string>에 따라 게시글을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BoardRecruitListRes> getRecommendedBoardList(
            @ApiIgnore Authentication authentication,
            @ApiParam(value = "페이지 번호 (1부터 시작)", example = "1") @RequestParam int page,
            @ApiParam(value = "페이지당 글 수", example = "10") @RequestParam int size,
            @ApiParam(value = "검색어", example = "검색내용") @RequestParam(required = false) String word,
            @ApiParam(value = "정렬 조건", example = "viewNum") @RequestParam(required = false) String sortKey) {

        SsafyUserDetails userDetails = null;
        User user = null;

        //1-1. 로그인한 사용자 체크 (토큰 확인)
        try {
            userDetails = (SsafyUserDetails) authentication.getDetails();
            String userEmail = userDetails.getUsername();
            user = userService.getUserByEmail(userEmail);
        } catch(NullPointerException e) {
            //e.printStackTrace();

            return ResponseEntity.status(401).body(null);
        } catch(Exception e) {
            e.printStackTrace();
        }

        page-=1; // 1부터 시작하도록 함

        RecruitGetListReq recruitGetListReq = new RecruitGetListReq();
        recruitGetListReq.setPage(page);
        recruitGetListReq.setSize(size);
        recruitGetListReq.setWord(word);
        recruitGetListReq.setSortKey(sortKey);

        //1. user 객체를 전달인자 (parameter)로 넘겨 희망하는 포지션과 선호 장르가 일치하는 글을 찾아낸다.
        List<BoardRecruit> recruits = recruitService.getRecommendedBoardList(recruitGetListReq, user);

        //2. 구인글 리스트 생성
        List<BoardRecruitRes> res = new ArrayList<>();
        for (BoardRecruit board : recruits) {
            List<Position> positions = recruitService.getPositions(board.getBoardRecruitIdx());
            res.add(BoardRecruitRes.of(board.getBoardIdx(), board, positions, boardService.getBoardLikeNum(board.getBoardIdx().getBoardIdx())));
        }


        return ResponseEntity.status(200).body(BoardRecruitListRes.of(res, res.size()));
    }

    @PostMapping("")
    @ApiOperation(value = "구인글 등록", notes = "<string></strong>게시글을 등록한다.")
    public ResponseEntity<? extends BaseResponseBody> registerBoard(
            @ApiIgnore Authentication authentication,
            @ApiParam(value = "제목, 내용, 끝나는 날, 장르123(장르명), 포지션(포지션명 리스트)") @RequestBody RecruitRegisterPostReq registInfo) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);

        BoardRecruit boardRecruit;
        try{
            boardRecruit = recruitService.registBoard(registInfo, user);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, boardRecruit.getBoardRecruitIdx() + ""));
    }

    @PutMapping("/{recruitid}")
    @ApiOperation(value = "구인글 수정", notes = "구인글을 수정한다")
    public ResponseEntity<? extends BaseResponseBody> updateBoard(
            @ApiIgnore Authentication authentication,
            @PathVariable(name = "recruitid") Long recruitIdx,
            @RequestBody RecruitUpdatePutReq updateInfo
    ){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);

        recruitService.updateBoard(updateInfo, recruitIdx, user);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/{recruitid}")
    @ApiOperation(value = "구인글 삭제", notes = "<string>구인글 아이디로</strong>로 구인글을 삭제한다.")
    public ResponseEntity<? extends BaseResponseBody> deleteBoard(
            @PathVariable(name = "recruitid") Long recruitIdx
    ) {
        recruitService.deleteBoard(recruitIdx);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/{recruitid}")
    @ApiOperation(value = "구인글 상세보기", notes = "<string>구인글 아이디</string>로 구인글을 조회한다.")
    public ResponseEntity<BoardRecruitRes> getBoard(@PathVariable(name = "recruitid") Long recruitIdx) throws Exception {
        System.out.println("start 구인글 상세보기");
        try {
            BoardRecruitRes boardRecruit = recruitService.getBoard(recruitIdx);

            return ResponseEntity.status(200).body(boardRecruit);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }

}
