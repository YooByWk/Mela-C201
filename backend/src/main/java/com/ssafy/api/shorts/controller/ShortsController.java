package com.ssafy.api.shorts.controller;

import com.ssafy.api.file.service.FileService;
import com.ssafy.api.shorts.request.ShortsPostReq;
import com.ssafy.api.shorts.service.ShortsService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Shorts;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

@Slf4j
@Api(value = "쇼츠 API", tags = {"shorts"})
@RestController
@RequestMapping("/api/v1/shorts")
public class ShortsController {
    @Autowired
    FileService fileService;

    @Autowired
    ShortsService shortsService;

    @PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
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

        //TODO: 토큰 유효성 확인

        //토큰으로부터 사용자 확인 후 VO에 설정
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        shorts.setUserIdx(userDetails.getUser());

        //2. Amazon S3에 파일 저장
        int returnCode = shortsService.uploadShorts(shorts, multipartFile, shortsPostReq);

        if(returnCode == 200) {             //파일 정상 저장 (Response 200)
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else if(returnCode == 415) {      //지원하지 않는 확장자 (
            return ResponseEntity.status(415).body(BaseResponseBody.of(415, "Fail (Unsupported Video Extension)"));
        } else {                            //파일 저장 실패 (Response 500)
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Fail"));
        }
    }
}
