package com.ssafy.api.user.controller;

import com.ssafy.api.file.service.FileService;
import com.ssafy.api.user.request.PortfolioMusicPostReq;
import com.ssafy.api.user.service.PortfolioService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.PortfolioMusic;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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

    @PostMapping(value = "/music", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "포트폴리오 음악 등록", notes = "포트폴리오 음악을 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })

    public ResponseEntity<? extends BaseResponseBody> addPortfolioMusic (
            @ApiIgnore Authentication authentication,
            @RequestPart @ApiParam(value="portfolioMusicPostReq", required = true) PortfolioMusicPostReq portfolioMusicPostReq,
            @RequestPart(value = "file", required = true) MultipartFile[] multipartFile) {

        PortfolioMusic portfolioMusic = new PortfolioMusic();

        //TODO: 토큰 유효성 확인

        //토큰으로부터 사용자 확인 후 VO에 설정
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        portfolioMusic.setUserIdx(userDetails.getUser());

        //2. Amazon S3에 파일 저장
        if(fileService.addPortfolioMusic(portfolioMusic, multipartFile, portfolioMusicPostReq)) {           //파일 정상 저장 (Response 200)
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else {                                                                                            //파일 저장 실패 (Response 500)
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Fail"));
        }
    }
}
