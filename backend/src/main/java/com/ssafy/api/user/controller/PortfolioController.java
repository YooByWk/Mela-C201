package com.ssafy.api.user.controller;

import com.ssafy.api.file.service.FileService;
import com.ssafy.api.user.request.PortfolioMusicPostReq;
import com.ssafy.api.user.service.PortfolioService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@Slf4j
@Api(value = "포트폴리오 API", tags = {"Portfolio"})
@RestController
@RequestMapping("/api/v1/users")
public class PortfolioController {
    @Autowired
    FileService fileService;

    @Autowired
    PortfolioService portfolioService;
    @PostMapping(value = "/musics", consumes = MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "포트폴리오 음악 등록", notes = "포트폴리오 음악을 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> addPortfolioMusic (
            //MultipartFile에는 @ModelAttribute 쓰면 안 될듯 (TextArea 생성됨)

            @ApiIgnore Authentication authentication,
            //[Spring Boot] 컨트롤러에서 Multipart/form-data 처리 방법과 유의점 (https://mopil.tistory.com/69)
//            @RequestPart @ApiParam(value="등록할 포트폴리오 음악 정보", required = true) PortfolioMusicPostReq portfolioMusicPostReq,

            @ModelAttribute @ApiParam(value="등록할 포트폴리오 음악 정보", required = true) PortfolioMusicPostReq portfolioMusicPostReq,
            @RequestPart(value = "file", required = true) MultipartFile[] multipartFile) {

            //안됨 (textarea 2개 덩어리)
//            @RequestParam @ApiParam(value="등록할 포트폴리오 음악 정보", required = true) PortfolioMusicPostReq portfolioMusicPostReq,
//            @RequestParam(value = "file", required = true) MultipartFile[] multipartFile) {

            //안됨 Completed 415 UNSUPPORTED_MEDIA_TYPE
//            @RequestPart @ApiParam(value="등록할 포트폴리오 음악 정보", required = true) PortfolioMusicPostReq portfolioMusicPostReq,
//            @RequestPart(value = "file", required = true) MultipartFile[] multipartFile) {

            //안됨 (textarea 2개 덩어리)
//            @ModelAttribute @ApiParam(value="등록할 포트폴리오 음악 정보", required = true) PortfolioMusicPostReq portfolioMusicPostReq,
//            @ModelAttribute(value = "file") MultipartFile[] multipartFile) {

        //TODO: 아래 라인 삭제
        System.err.println("클라이언트 portfolioMusicPostReq 1: " + portfolioMusicPostReq);

        //토큰으로부터 사용자 확인
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();

        //TODO: 토큰 유효성 검증

        portfolioMusicPostReq.setUserIdx(userDetails.getUser());                                    //1. 요청 헤더의 토큰으로부터 UserIdx를 가져와 PortfolioMusicPostReq 객체에 설정
        System.err.println("클라이언트 portfolioMusicPostReq 2: " + portfolioMusicPostReq);

        //2. Amazon S3에 파일 저장
        if(fileService.saveFiles(portfolioMusicPostReq, multipartFile)) {       //파일 정상 저장 (Response 200)
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else {                                                                //파일 저장 실패 (Response 500)
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Fail"));
        }
    }
}
