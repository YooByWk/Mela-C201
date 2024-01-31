package com.ssafy.api.file.service;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface FileService {
    String saveFile(MultipartFile file);
//    Stream<Path> loadAll();
//    Path getFilename(String filename);
    Resource loadAsResource(String filename);
//    void deleteAll();
    void deleteFile(String filename);
}

