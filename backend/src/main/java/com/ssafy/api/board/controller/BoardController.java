package com.ssafy.api.board.controller;

import com.ssafy.api.board.request.BoardGetListReq;
import com.ssafy.api.board.request.BoardRegisterPostReq;
import com.ssafy.api.board.request.BoardUpdatePutReq;
import com.ssafy.api.board.request.CommentRegisterPostReq;
import com.ssafy.api.board.response.BoardListRes;
import com.ssafy.api.board.response.BoardRes;
import com.ssafy.api.board.response.CommentRes;
import com.ssafy.api.board.service.BoardService;
import com.ssafy.api.user.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Api(value = "게시판 API", tags = {"Board"})
@RestController
@RequestMapping("/api/v1/board")
public class BoardController {

    @Autowired
    BoardService boardService;
    @Autowired
    UserService userService;

    @GetMapping("")
    @ApiOperation(value = "게시글 리스트 조회", notes = "<string>페이지번호(page), 페이지당 글 수(size), 검색어(word), 정렬조건(sortKey) </string>에 따라 게시글을 조회한다.")
    public ResponseEntity<BoardListRes> getBoardList(
            @ApiParam(value = "페이지 번호 (1부터 시작)", example = "1") @RequestParam int page,
            @ApiParam(value = "페이지당 글 수", example = "10") @RequestParam int size,
            @ApiParam(value = "검색어", example = "검색내용") @RequestParam(required = false) String word,
            @ApiParam(value = "정렬 조건", example = "viewNum") @RequestParam(required = false) String sortKey
    ) {
        page-=1; // 1부터 시작하도록 함

        BoardGetListReq boardGetListReq = new BoardGetListReq();
        boardGetListReq.setPage(page);
        boardGetListReq.setSize(size);
        boardGetListReq.setWord(word);
        boardGetListReq.setSortKey(sortKey);

        List<Board> boards = boardService.getBoardList(boardGetListReq);
        List<BoardRes> boardRes = new ArrayList<>();
        for (Board board : boards) {
            int likeNum = boardService.getBoardLikeNum(board.getBoardIdx());
            int commentNum = boardService.getBoardCommentNum(board.getBoardIdx());
            boardRes.add(BoardRes.of(board, likeNum, commentNum));
        }

        return ResponseEntity.status(200).body(BoardListRes.of(boardRes, boardService.getBoardTotalCount()));
    }

    @PostMapping("")
    @ApiOperation(value = "게시글 등록", notes = "<string></strong>게시글을 등록한다.")
    public ResponseEntity<? extends BaseResponseBody> registerBoard(
            @ApiIgnore Authentication authentication,
            @RequestBody BoardRegisterPostReq registInfo) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);

        Board board;
        try{
            board = boardService.registBoard(registInfo, user);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(404, "not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, board.getBoardIdx() + ""));
    }

    @PutMapping("/{boardid}")
    @ApiOperation(value = "게시글 수정", notes = "게시글을 수정한다")
    public ResponseEntity<? extends BaseResponseBody> updateBoard(
            @ApiIgnore Authentication authentication,
            @PathVariable(name = "boardid") Long boardIdx,
            @RequestBody BoardUpdatePutReq updateInfo
            ){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);

        boardService.updateBoard(updateInfo, boardIdx, user.getUserIdx());

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/{boardid}")
    @ApiOperation(value = "게시글 삭제", notes = "<string>게시글 아이디로</strong>로 게시글을 삭제한다.")
    public ResponseEntity<? extends BaseResponseBody> deleteBoard(
            @PathVariable(name = "boardid") Long boardIdx
    ) {
        boardService.deleteBoard(boardIdx);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/{boardid}")
    @ApiOperation(value = "게시글 상세보기", notes = "<string>게시글 아이디</string>로 게시글을 조회한다.")
    public ResponseEntity<BoardRes> getBoard(@PathVariable(name = "boardid") Long boardIdx) {
        try {
            Board board = boardService.getBoard(boardIdx);

            int likeNum = boardService.getBoardLikeNum(board.getBoardIdx());
            int commentNum = boardService.getBoardCommentNum(board.getBoardIdx());

            return ResponseEntity.status(200).body(BoardRes.of(board,likeNum, commentNum));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }

    }

    @PostMapping("/{boardid}/comments")
    @ApiOperation(value = "댓글 등록", notes = "<string></strong>댓글을 등록한다.")
    public ResponseEntity<? extends BaseResponseBody> registerComment(
            @ApiIgnore Authentication authentication,
            @RequestBody CommentRegisterPostReq registInfo,
            @PathVariable(name = "boardid") Long boardIdx) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);

        try{
            boardService.registComment(registInfo, boardService.getBoard(boardIdx), user);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(404, "not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/{boardid}/comments")
    @ApiOperation(value = "댓글 목록 조회", notes = "<string>게시글 아이디</strong>로 댓글 목록을 불러온다.")
    public ResponseEntity<List<CommentRes>> getCommentList(
            @PathVariable(name = "boardid") Long boardId
    ) {
        List<Comment> comments = boardService.listComment(boardId);
        List<CommentRes> res = new ArrayList<>();
        for (Comment c : comments) {
            res.add(CommentRes.of(c));
        }

        return  ResponseEntity.status(200).body(res);
    }

    @DeleteMapping("/{boardid}/comments/{commentid}")
    @ApiOperation(value = "댓글 삭제", notes = "<string>댓글 아이디로</strong>로 댓글을 삭제한다.")
    public ResponseEntity<? extends BaseResponseBody> deleteComment(
            @PathVariable(name = "boardid") Long boardIdx, @PathVariable(name = "commentid") Long commentIdx
    ) {
        boardService.deleteComment(commentIdx);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PutMapping("/{boardid}/like")
    @ApiOperation(value = "게시글 좋아요", notes = "게시글 좋아요 / 좋아요 취소를 한다.")
    public ResponseEntity<? extends BaseResponseBody> likeBoard(
            @ApiIgnore Authentication authentication,
            @PathVariable(name = "boardid") Long boardIdx
    ) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);

        boardService.likeBoard(boardIdx, user);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/{boardid}/like/{userid}")
    @ApiOperation(value = "게시글 좋아요 여부 확인")
    public ResponseEntity<? extends BaseResponseBody> isLikeBoard(
            @PathVariable(name = "boardid") Long boardIdx,
            @PathVariable(name = "userid") Long userIdx
    ) {
        String message = boardService.isLikeBoard(boardIdx, userIdx) + "";

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, message));
    }
}
