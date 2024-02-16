package com.ssafy.api.file.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.ssafy.api.file.service.FileService;
import com.ssafy.api.user.service.UserService;
import com.ssafy.common.exception.handler.NotValidExtensionException;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.PortfolioAbstract;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.PortfolioAbstractRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.NoSuchElementException;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@Slf4j
@Api(value = "파일 서비스 API", tags = {"File"})
@RestController
@RequestMapping("/api/v1/file")
public class FileController {
    @Autowired
    FileService fileService;

    @Autowired
    AmazonS3 amazonS3Client;

    @Autowired
    UserService userService;

    @Autowired
    PortfolioAbstractRepository portfolioAbstractRepository;

    //FIXME: 테스트 코드이므로 file 테이블에 삽입 작업 없음 (코드 재사용 유의)
    @PostMapping(value = "/upload", consumes = MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "파일 업로드 (테스트용)", notes = "파일을 업로드합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> uploadFile (@RequestPart(value = "file", required = true) MultipartFile[] files) {

        for(MultipartFile file : files) {
            fileService.saveFileTest(file);
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping(value = "/download")
    @ApiOperation(value = "파일 다운로드", notes = "파일을 다운로드합니다.")
    public ResponseEntity<byte[]> downloadFile(long fileIdx) {
        try {
            //ArrayList<Object> returnVO = new ArrayList<>();
            byte[] bytes = fileService.getFile(fileIdx);
            com.ssafy.db.entity.File file = fileService.getFileByFileIdx(fileIdx);
            //1. 응답에 파일 저장
            String filePath = file.getOriginalFilename();

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

    @DeleteMapping(value = "/deleteFileByFilePath")
    @ApiOperation(value = "파일 삭제 (전체 파일 경로)", notes = "파일을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 500, message = "삭제 실패"),
    })
    public ResponseEntity<? extends BaseResponseBody> deleteFileByFilePath(String filePath) throws IOException {
        boolean returnState = fileService.deleteFileByFilePath(filePath);

        if(returnState) {   //파일 정상 삭제
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Delete success"));
        } else {            //파일 삭제 중 오류
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Delete fail"));
        }
    }

    @DeleteMapping(value = "/delete")
    @ApiOperation(value = "파일 삭제 (파일 Idx)", notes = "파일을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 500, message = "삭제 실패"),
    })
    public ResponseEntity<? extends BaseResponseBody> deleteFileByFileIdx(long fileIdx) throws IOException {

        if(fileService.deleteFileByFileInstance(fileIdx)) {     //파일 정상 삭제
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Delete success"));
        } else {                                                //파일 삭제 중 오류
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Delete fail"));
        }
    }

    @GetMapping("/images/{fileIdx}")
    @ApiOperation(value = "이미지 조회", notes = "html <img> 태그에 넣을 수 있는 이미지의 주소를 반환합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 400, message = "이미지 파일이 아님"),
            @ApiResponse(code = 404, message = "파일을 찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getImageURLByFileIdx(@PathVariable(name = "fileIdx") long fileIdx) {
        Object[] returnVO = new Object[2];

        try {
            String imageUrl = fileService.getImageUrlBySaveFileIdx(fileIdx);

            return ResponseEntity.status(200).body(BaseResponseBody.of(200, imageUrl));
        } catch (NotValidExtensionException e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "이미지 파일이 아님"));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "파일을 찾을 수 없음"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

    @GetMapping("/videos/{fileIdx}")
    @ApiOperation(value = "동영상 조회", notes = "html <video> 태그에 넣을 수 있는 동영상의 주소를 반환합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "동영상 주소 리턴"),
            @ApiResponse(code = 400, message = "동영상 파일이 아님"),
            @ApiResponse(code = 404, message = "파일을 찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getVideoURLByFileIdx(@PathVariable(name = "fileIdx") long fileIdx) {
        try {
            String videoUrl = fileService.getVideoUrlBySaveFileIdx(fileIdx);

            return ResponseEntity.status(200).body(BaseResponseBody.of(200, videoUrl));
        } catch (NotValidExtensionException e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "동영상 파일이 아님"));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "파일을 찾을 수 없음"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

    @GetMapping("/musics/{fileIdx}")
    @ApiOperation(value = "음악 조회", notes = "html <audio> 태그에 넣을 수 있는 음원의 주소를 반환합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "음원 주소 리턴"),
            @ApiResponse(code = 400, message = "음원 파일이 아님"),
            @ApiResponse(code = 404, message = "파일을 찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getMusicURLByFileIdx(@PathVariable(name = "fileIdx") long fileIdx) {
        try {
            String audioUrl = fileService.getAudioUrlBySaveFileIdx(fileIdx);

            return ResponseEntity.status(200).body(BaseResponseBody.of(200, audioUrl));
        } catch (NotValidExtensionException e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "음원 파일이 아님"));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "파일을 찾을 수 없음"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }
}
