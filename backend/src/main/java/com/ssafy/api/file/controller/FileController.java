package com.ssafy.api.file.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.ssafy.api.file.service.FileService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;
import static org.springframework.web.servlet.function.RequestPredicates.contentType;

@Slf4j
@Api(value = "파일 서비스 API", tags = {"File"})
@RestController
@RequestMapping("/api/v1/file")
public class FileController {
    @Autowired
    FileService fileService;

    @Autowired
    AmazonS3 amazonS3Client;

    @PostMapping(value = "/upload", consumes = MULTIPART_FORM_DATA_VALUE)
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

    @GetMapping(value = "/download")
    @ApiOperation(value = "파일 다운로드", notes = "파일을 다운로드합니다.")
    public ResponseEntity<byte[]> downloadFile(String filePath) throws IOException { // 객체 다운  fileUrl : 폴더명/파일네임.파일확장자
        try {
            byte[] bytes = fileService.getFile(filePath);

            String fileName = URLEncoder.encode(filePath, "UTF-8").replaceAll("\\+", "%20");
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            httpHeaders.setContentLength(bytes.length);
            httpHeaders.setContentDispositionFormData("attachment", fileName);

            return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
        } catch (Exception e) {
            //요청한 파일을 찾을 수 없는 경우
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
