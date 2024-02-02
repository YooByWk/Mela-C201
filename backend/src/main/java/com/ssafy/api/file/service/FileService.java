package com.ssafy.api.file.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public interface FileService {
    //TODO: 사용하지 않는 메소드 삭제

    File multipartFile2File(MultipartFile multipartFile);
    void removeFile(File targetFile);

    void saveFileTest(MultipartFile multipartFile);
    com.ssafy.db.entity.File saveFile(MultipartFile multipartFile, String fileDescription);
    com.ssafy.db.entity.File addTableRecord(com.ssafy.db.entity.File file);
    byte[] getFile(String storedFileName) throws IOException;
    void deleteFile(String filePath) throws IOException;
}