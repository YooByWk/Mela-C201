package com.ssafy.api.file.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public interface FileService {
    File multipartFile2File(MultipartFile multipartFile);
    void removeFile(File targetFile);

    void saveFileTest(MultipartFile multipartFile);
    com.ssafy.db.entity.File saveFile(MultipartFile multipartFile, String fileDescription);
    com.ssafy.db.entity.File addTableRecord(com.ssafy.db.entity.File file);
    byte[] getFile(String storedFileName) throws IOException;
    boolean deleteFileTest(String filePath) throws IOException;
    com.ssafy.db.entity.File getFileBySaveFilenameAndSavePath(String saveFilename, String savePath);
}