package com.ssafy.api.shorts.controller;

import com.ssafy.api.file.service.FileService;
import com.ssafy.api.shorts.request.ShortsPostReq;
import com.ssafy.api.shorts.service.ShortsService;
import com.ssafy.api.user.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.exception.handler.NotValidExtensionException;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Shorts;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;


@Slf4j
@Api(value = "쇼츠 API", tags = {"Shorts"})
@RestController
@RequestMapping("/api/v1/shorts")
public class ShortsController {
    @Autowired
    FileService fileService;

    @Autowired
    ShortsService shortsService;

    @Autowired
    UserService userService;

    @GetMapping()
    @ApiOperation(value = "쇼츠 동영상 리스트", notes = "자신이 설정한 장르, 포지션, 싫어요 표시 여부를 반영한 쇼츠 동영상 리스트를 가져온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "삭제 실패"),
    })
    public ResponseEntity<?> shortList (
            @ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = null;
        User user = null;

        //1. 로그인한 사용자 체크 (토큰 확인)
        try {
            userDetails = (SsafyUserDetails) authentication.getDetails();
            user = userDetails.getUser();
        } catch(NullPointerException e) {
            e.printStackTrace();

            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Authentication failed!"));
        } catch(Exception e) {
            e.printStackTrace();
        }

        //2. 로그인한 사용자가 설정한 장르, 포지션, 싫어요 표시 여부를 반영한 쇼츠 동영상 리스트를 가져옴
        List<com.ssafy.api.board.response.Shorts> shortsList = shortsService.getShortsList(user);

        return ResponseEntity.status(200).body(shortsList);
    }

    @GetMapping("/mylist")
    @ApiOperation(value = "내가 업로드한 쇼츠 동영상 리스트", notes = "내가 업로드한 쇼츠 동영상 리스트를 가져온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<?> myShortList (
            @ApiIgnore Authentication authentication) {

        SsafyUserDetails userDetails = null;
        User user = null;

        //1-1. 로그인한 사용자 체크 (토큰 확인)
        try {
            userDetails = (SsafyUserDetails) authentication.getDetails();
            user = userDetails.getUser();
        } catch(NullPointerException e) {
            e.printStackTrace();

            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Authentication failed!"));
        } catch(Exception e) {
            e.printStackTrace();
        }

        //2. 로그인한 사용자의 쇼츠 리스트 가져옴
        List<Shorts> shortsList = shortsService.getShortsListByUserIdx(user);
        List<com.ssafy.api.board.response.Shorts> shortsListResponse = new ArrayList<>();

        for(Shorts shorts : shortsList) {
            com.ssafy.api.board.response.Shorts shortsResponse = new com.ssafy.api.board.response.Shorts();

            //setter 호출
            shortsResponse.setShortsIdx(shorts.getShortsIdx());
            shortsResponse.setUserIdx(shorts.getUserIdx());
            shortsResponse.setTitle(shorts.getTitle());
            shortsResponse.setDescription(shorts.getDescription());
            shortsResponse.setShortsPathFileIdx(shorts.getShortsPathFileIdx());

            String videoUrl = null;

            //fileservice를 이용해 Amazon S3 영상 링크 가져오기
            try {
                videoUrl = fileService.getVideoUrlBySaveFileIdx(shorts.getShortsPathFileIdx().getFileIdx());
            } catch (Exception e) {
                e.printStackTrace();
            }

            //com.ssafy.api.board.response.Shorts DTO에 영상 링크 설정
            shortsResponse.setFileURL(videoUrl);
            //리스트 추가
            shortsListResponse.add(shortsResponse);
        }

        return ResponseEntity.status(200).body(shortsListResponse);
    }

    @GetMapping("/getshort")
    @ApiOperation(value = "(매칭) 쇼츠 1개 가져오기", notes = "자신이 설정한 장르, 포지션, 싫어요 표시 여부를 반영한 쇼츠 동영상 한 개를 가져온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "삭제 실패"),
    })
    public ResponseEntity<?> getOneShort (
            @ApiIgnore Authentication authentication) {

        SsafyUserDetails userDetails = null;
        User user = null;

        //1. 로그인한 사용자 체크 (토큰 확인)
        try {
            userDetails = (SsafyUserDetails) authentication.getDetails();
            user = userDetails.getUser();
        } catch(NullPointerException e) {
            e.printStackTrace();

            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Authentication failed!"));
        } catch(Exception e) {
            e.printStackTrace();
        }

        //2. 로그인한 사용자가 설정한 장르, 포지션, 싫어요 표시 여부를 반영한 쇼츠 동영상 리스트를 가져옴
        com.ssafy.api.board.response.Shorts shortsResponse = shortsService.getSingleShortsByUserIdx(user);

        return ResponseEntity.status(200).body(shortsResponse);
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "쇼츠 동영상 등록", notes = "쇼츠 동영상을 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })

    public ResponseEntity<? extends BaseResponseBody> uploadShorts (
            @ApiIgnore Authentication authentication,
            @RequestPart @ApiParam(value="shortsPostReq", required = true) ShortsPostReq shortsPostReq,
            @RequestPart(value = "file", required = true) MultipartFile multipartFile) {

        Shorts shorts = new Shorts();

        //1. 토큰으로부터 사용자 확인 후 VO에 설정
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        shorts.setUserIdx(userDetails.getUser());

        //2. Amazon S3에 파일 저장
        int returnCode = shortsService.uploadShorts(shorts, multipartFile, shortsPostReq, user);

        if(returnCode == 200) {             //파일 정상 저장 (Response 200)
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else if(returnCode == 415) {      //지원하지 않는 확장자 (
            return ResponseEntity.status(415).body(BaseResponseBody.of(415, "Fail (Unsupported Video Extension)"));
        } else {                            //파일 저장 실패 (Response 500)
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Fail"));
        }
    }

    @DeleteMapping(value = "/{shortsid}")
    @ApiOperation(value = "쇼츠 동영상 삭제", notes = "쇼츠 동영상을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "삭제 실패"),
    })
    public ResponseEntity<? extends BaseResponseBody> deleteShorts (
            @ApiIgnore Authentication authentication,
            @PathVariable(name = "shortsid") Long shortsid) {

        //TODO: 토큰 유효성 확인

        //1. 클라이언트로부터 전달받은 shortsid로
        //FileRepository를 이용해
        //com.ssafy.db.entity 패키지 -> Shorts 클래스 -> File 타입의 shortsPathFileIdx 객체 가져오기
        com.ssafy.db.entity.File file = shortsService.getFileInstanceByShortsIdx(shortsid);

        //2. FileService클래스의 deleteFile 메소드를 이용해 파일 삭제 (Amazon S3에서의 삭제 및 file 테이블에서의 삭제)
        if(fileService.deleteFileByFileInstance(file)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Fail"));
        }
    }

    @PostMapping("/{shortsid}/like")
    @ApiOperation(value = "쇼츠 동영상 좋아요", notes = "쇼츠 동영상을 좋아요 표시한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> likeShorts (
            @ApiIgnore Authentication authentication,
            @PathVariable(name = "shortsid") Long shortsid)
    {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);
        shortsService.setShortsLike(user, shortsid);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/{shortsid}/dislike")
    @ApiOperation(value = "쇼츠 동영상 싫어요", notes = "쇼츠 동영상을 싫어요 표시한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> dislikeShorts (
            @ApiIgnore Authentication authentication,
            @PathVariable(name = "shortsid") Long shortsid)
    {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);
        shortsService.setShortsDislike(user, shortsid);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/{shortsid}")
    @ApiOperation(value = "쇼츠 1개 URL 조회", notes = "html <video> 태그에 넣을 수 있는 쇼츠의 주소를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "동영상 주소 리턴"),
            @ApiResponse(code = 400, message = "동영상 파일이 아님"),
            @ApiResponse(code = 404, message = "파일을 찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getVideoURLByFileIdx(@PathVariable(name = "shortsid") String shortsid) {

        try {
            //shortsIdx로 fileIdx 찾기
            long fileIdx = shortsService.getShortsIdxByFileIdx(Long.parseLong(shortsid));
            String shortsUrl = fileService.getVideoUrlBySaveFileIdx(fileIdx);

            return ResponseEntity.status(200).body(BaseResponseBody.of(200, shortsUrl));
        } catch (NotValidExtensionException e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "동영상 파일이 아님"));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "파일을 찾을 수 없음"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }
}
