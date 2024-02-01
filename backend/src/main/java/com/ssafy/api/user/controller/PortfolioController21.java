package com.ssafy.api.user.controller;

import com.ssafy.api.file.service.FileService;
import com.ssafy.api.user.request.PortfolioMusicPostReq;
import com.ssafy.api.user.service.PortfolioService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.PortfolioMusic;
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
public class PortfolioController21 {
    @Autowired
    FileService fileService;

    @Autowired
    PortfolioService portfolioService;
    private PortfolioMusicPostReq portfolioMusicPostReq;

    //    @PostMapping(value = "/musics", consumes = MULTIPART_FORM_DATA_VALUE)
    @PostMapping(path = "/musics", consumes = {MULTIPART_FORM_DATA_VALUE})
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

//            @ModelAttribute @ApiParam(value="등록할 포트폴리오 음악 정보", required = true) PortfolioMusicPostReq portfolioMusicPostReq,
            @RequestPart(value = "dto") PortfolioMusicPostReq portfolioMusicPostReq,
//            @RequestPart(value="something", required = true) String something,
//            @RequestPart(value="test", required = true) Test test,
            @RequestPart(value = "file", required = true) MultipartFile[] multipartFile) {
            this.portfolioMusicPostReq = portfolioMusicPostReq;

//            @ModelAttribute @ApiParam(value="등록할 포트폴리오 음악 정보", required = true) PortfolioMusicPostReq portfolioMusicPostReq,
//            @RequestPart(value = "file", required = true) MultipartFile[] multipartFile) {

            //Annotation 없이 테스트 당연이 안됨
//            PortfolioMusicPostReq portfolioMusicPostReq,
//            @RequestPart(value = "file", required = true) MultipartFile[] multipartFile) {


            //안됨
//            @RequestPart @ApiParam(value="등록할 포트폴리오 파일 (음악, 악보, 사진) 및 정보", required = true) PortfolioMusicPostReq portfolioMusicPostReq) {

            //안됨
//            @ModelAttribute @ApiParam(value="등록할 포트폴리오 파일 (음악, 악보, 사진) 및 정보", required = true) PortfolioMusicPostReq portfolioMusicPostReq) {

            //안됨 (null)
//            @RequestPart(value = "file", required = true) MultipartFile[] multipartFile,
//            @ApiParam(value="등록할 포트폴리오 음악 정보", required = true) PortfolioMusicPostReq portfolioMusicPostReq) {

            //안됨 (textarea 2개 덩어리)
//            @RequestParam @ApiParam(value="등록할 포트폴리오 음악 정보", required = true) PortfolioMusicPostReq portfolioMusicPostReq,
//            @RequestParam(value = "file", required = true) MultipartFile[] multipartFile) {

            //안됨 Completed 415 UNSUPPORTED_MEDIA_TYPE
//            @RequestPart @ApiParam(value="등록할 포트폴리오 음악 정보", required = true) PortfolioMusicPostReq portfolioMusicPostReq,
//            @RequestPart(value = "file", required = true) MultipartFile[] multipartFile) {

            //안됨 (textarea 2개 덩어리)
//            @ModelAttribute @ApiParam(value="등록할 포트폴리오 음악 정보", required = true) PortfolioMusicPostReq portfolioMusicPostReq,
//            @ModelAttribute(value = "file") MultipartFile[] multipartFile) {

//        MultipartFile[] multipartFile = portfolioMusicPostReq.getMultipartFile();

        PortfolioMusic portfolioMusic = new PortfolioMusic();
        String fileDescription = portfolioMusicPostReq.getFileDescription();
        System.err.println("fileDescription: " + fileDescription);

//        System.err.println("something: " + something);
//        System.err.println("test: " + test);

        //TODO: 아래 라인 삭제
        System.err.println("클라이언트 portfolioMusicPostReq 1: " + portfolioMusicPostReq);

        //토큰으로부터 사용자 확인
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();

        //TODO: 토큰 유효성 검증

        portfolioMusic.setUserIdx(userDetails.getUser());
        System.err.println("클라이언트 portfolioMusicPostReq 2: " + portfolioMusicPostReq);

        //2. Amazon S3에 파일 저장
        if(fileService.addPortfolioMusic(portfolioMusic, multipartFile, fileDescription)) {       //파일 정상 저장 (Response 200)
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else {                                                                //파일 저장 실패 (Response 500)
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Fail"));
        }
    }
}
