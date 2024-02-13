package com.ssafy.api.user.controller;

import com.ssafy.api.file.service.FileService;
import com.ssafy.api.user.request.PortfolioMusicPostReq;
import com.ssafy.api.user.service.PortfolioService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.PortfolioMusic;
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

@Slf4j
@Api(value = "포트폴리오 API", tags = {"Portfolio"})
@RestController
@RequestMapping("/api/v1/users")

public class PortfolioController {
    @Autowired
    FileService fileService;

    @Autowired
    PortfolioService portfolioService;

    @PostMapping(value = "/musics", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
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

        //1. 토큰으로부터 사용자 확인 후 VO에 설정
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        portfolioMusic.setUserIdx(userDetails.getUser());

        //2. Amazon S3에 파일 저장
        if(portfolioService.addPortfolioMusic(portfolioMusic, multipartFile, portfolioMusicPostReq, user)) {      //파일 정상 저장 (Response 200)
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else {                                                                                            //파일 저장 실패 (Response 500)
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Fail"));
        }
    }

    @DeleteMapping(value = "/{musicid}")
    @ApiOperation(value = "포트폴리오 음악 삭제", notes = "포트폴리오 음악을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "삭제 실패"),
    })
        public ResponseEntity<? extends BaseResponseBody> deletePortfolioMusic (
            @ApiIgnore Authentication authentication,
            @PathVariable(name = "musicid") long[] musicids) {

        //TODO: 토큰 유효성 확인

        //1. 클라이언트로부터 전달받은 musicid로
        //FileRepository를 이용해
        //com.ssafy.db.entity 패키지 -> PortfolioMusic 클래스를 가져와
        for(long musicid : musicids) {
            PortfolioMusic portfolioMusic = portfolioService.getPortfolioMusicInstanceByPortfolioMusicIdx(musicid);

            //File 타입 musicFileIdx, File 타입 lyricFileIdx, File 타입 albumArtFileIdx를 com.ssafy.db.entity.File 클래스 배열로 생성
            com.ssafy.db.entity.File[] files = {portfolioMusic.getMusicFileIdx(), portfolioMusic.getLyricFileIdx(), portfolioMusic.getAlbumArtFileIdx()};

            //2. FileService클래스의 deleteFilesByFileInstances 메소드를 이용해 다수의 파일 삭제 (Amazon S3에서의 삭제 및 file 테이블에서의 삭제)
            if(!fileService.deleteFilesByFileInstances(files)) {
                return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Fail"));
            }
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }


    @GetMapping("/totalsearchmusic/{word}")
    public ResponseEntity<?> totalSearch(
			@PathVariable(name = "word") String word
    ) {



        List<PortfolioMusic> portfolioMusicByTitle = portfolioService.getPortfolioMusicListByTitle(word);

        List<Object[]> returnList = new ArrayList<>();
        for(PortfolioMusic portfolioMusicItem : portfolioMusicByTitle){
            Object[] returnVO = new Object[2];
            returnVO[0] = portfolioMusicItem;
            returnVO[1] = portfolioService.getPortfolioAbstractByUserIdx(portfolioMusicItem.getUserIdx());
            returnList.add(returnVO);
        }

        return ResponseEntity.status(200).body(returnList);
    }
}
