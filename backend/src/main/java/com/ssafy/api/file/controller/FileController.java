package com.ssafy.api.file.controller;

import com.ssafy.api.file.service.FileService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@Slf4j
@Api(value = "파일 서비스 API", tags = {"File"})
@RestController
@RequestMapping("/api/v1/file")
public class FileController {
    @Autowired
    FileService fileService;

    @PostMapping(value = "/add-item", consumes = MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "파일 업로드", notes = "파일을 업로드합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> uploadFile(
            @RequestPart(value = "file", required = true) MultipartFile[] files) {

        for(MultipartFile file : files) {
            fileService.saveFileTest(file);
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
