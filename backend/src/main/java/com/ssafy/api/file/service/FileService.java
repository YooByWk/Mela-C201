package com.ssafy.api.file.service;

import com.ssafy.api.shorts.request.ShortsPostReq;
import com.ssafy.api.user.request.PortfolioMusicPostReq;
import com.ssafy.db.entity.PortfolioMusic;
import com.ssafy.db.entity.Shorts;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public interface FileService {
    //TODO: 사용하지 않는 메소드 삭제

    File multipartFile2File(MultipartFile multipartFile);
    void removeFile(File targetFile);

    void saveFileTest(MultipartFile multipartFile);
    com.ssafy.db.entity.File saveFile(MultipartFile multipartFile, String fileDescription);
    Resource loadAsResource(String filename);
    com.ssafy.db.entity.File addTableRecord(com.ssafy.db.entity.File file);
}