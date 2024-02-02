package com.ssafy.api.shorts.service;

import com.ssafy.api.file.service.FileService;
import com.ssafy.api.shorts.request.ShortsPostReq;
import com.ssafy.db.entity.Shorts;
import com.ssafy.db.repository.ShortsRepository;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service("shortsService")
public class ShortsServiceImpl implements  ShortsService {
    @Autowired
    FileService fileService;

    @Autowired
    ShortsRepository shortsRepository;

    //지원하는 동영상 확장자 ArrayList
    String[] supportedVideoExtension = {"MKV", "MP4", "AVI"};

    boolean isValidVideoExtension(String extension) {
        System.err.println("isValidVideoExtension 메소드 extension: " + extension);

        //TODO: 소문자 검사!
        for(String s : supportedVideoExtension) {
            if(extension.equals(s.toUpperCase()) || extension.equals(s.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    @Override
    public int uploadShorts(Shorts shorts, MultipartFile multipartFile, ShortsPostReq shortsPostReq) {
        String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());                            //클라이언트가 업로드한 파일의 확장자 추출

        System.err.println("extension: " + extension);
        System.err.println("!isValidVideoExtension(extension): " + !isValidVideoExtension(extension));

        //1. 지원하는 비디오 확장자인지 검사
        if(!isValidVideoExtension(extension)) {
            //TODO: 메시지 잘 적기 (기존 415 메시지와 달라야 함!)
            return 415; //Not Supported Type
        }

        //2. Amazon S3에 동영상 업로드
        com.ssafy.db.entity.File file = fileService.saveFile(multipartFile, shortsPostReq.getFileDescription());

        //3. file 테이블에 관련 정보 저장
        file = fileService.addTableRecord(file);

        //4. shorts VO 설정
        shorts.setComment(shortsPostReq.getFileDescription());
        shorts.setShortsPathFileIdx(file);

        //5. shorts 테이블에 관련 정보 저장
        shortsRepository.save(shorts);

        //6. 정상 업로드: 200 리턴
        return 200;
    }
}
