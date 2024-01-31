package com.ssafy.api.file.controller;

import com.ssafy.api.file.service.FileService;
import com.ssafy.api.user.request.UserRegisterPostReq;
import com.ssafy.api.user.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@Slf4j
@Api(value = "파일 서비스 API", tags = {"File"})
@RestController
@RequestMapping("/api/v1/file")
public class FileController {
    @Autowired
    FileService fileService;

//    @PostMapping()
    @PostMapping(value = "/add-item", consumes = MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "파일 업로드", notes = "파일을 업로드합니다.")
//    @ApiImplicitParam(name = "file", value = "File to upload", required = true, dataType = "file")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> uploadFile(
            @RequestPart(value = "file", required = true) MultipartFile[] files) {

        System.err.println("files: " + files);

        for(MultipartFile file : files) {
            System.err.println("파일 이름: " + file.getOriginalFilename());
            fileService.saveFile(file);
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
