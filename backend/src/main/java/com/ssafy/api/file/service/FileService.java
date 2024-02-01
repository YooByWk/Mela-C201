package com.ssafy.api.file.service;

import com.ssafy.api.user.request.PortfolioMusicPostReq;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface FileService {
    void saveFileTest(MultipartFile multipartFile);
    com.ssafy.db.entity.File saveFile(PortfolioMusicPostReq portfolioMusicPostReq, MultipartFile multipartFile);
    boolean saveFiles(PortfolioMusicPostReq portfolioMusicPostReq, MultipartFile[] multipartFile);
//    Stream<Path> loadAll();
//    Path getFilename(String filename);
    Resource loadAsResource(String filename);
//    void deleteAll();
    void deleteFile(String filename);
    com.ssafy.db.entity.File addTableRecord(com.ssafy.db.entity.File file);
}