package com.ssafy.api.user.controller;

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
import springfox.documentation.annotations.ApiIgnore;

@Slf4j
@Api(value = "포트폴리오 API", tags = {"Portfolio"})
@RestController
@RequestMapping("/api/v1/users")
public class PortfolioController {

    @Autowired
    PortfolioService portfolioService;
//    @PostMapping()
    @PostMapping("/musics")
    @ApiOperation(value = "포트폴리오 음악 등록", notes = "포트폴리오 음악을 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> addPortfolioMusic(
            @ApiIgnore Authentication authentication,
            @RequestBody @ApiParam(value="등록할 포트폴리오 음악 정보", required = true) PortfolioMusicPostReq portfolioMusicPostReq) {
        System.out.println("portfolioMusicPostReq:" + portfolioMusicPostReq);

        //토큰으로부터 사용자 확인
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();

        System.out.println("userDetails: " + userDetails);

        //TODO: 토큰 유효성 검증

//        long userIdx = userDetails.getUserIdx();                  //1. 요청 헤더의 토큰으로부터 UserIdx를 가져옴
        portfolioMusicPostReq.setUserIdx(userDetails.getUser());    //2. UserIdx를 PortfolioMusicPostReq 객체에 설정
        portfolioService.addPortfolioMusic(portfolioMusicPostReq);  //3. Service 구현체를 통해 포트폴리오 음악 추가

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
