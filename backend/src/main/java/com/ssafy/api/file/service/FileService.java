package com.ssafy.api.file.service;

import com.ssafy.api.user.request.PortfolioMusicPostReq;
import com.ssafy.db.entity.PortfolioMusic;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    void saveFileTest(MultipartFile multipartFile);
    com.ssafy.db.entity.File saveFile(MultipartFile multipartFile, String fileDescription);
    boolean addPortfolioMusic(PortfolioMusic portfolioMusic, MultipartFile[] multipartFile, PortfolioMusicPostReq portfolioMusicPostReq);
//    Stream<Path> loadAll();
//    Path getFilename(String filename);
    Resource loadAsResource(String filename);
//    void deleteAll();
    void deleteFile(String filename);
    com.ssafy.db.entity.File addTableRecord(com.ssafy.db.entity.File file);
}