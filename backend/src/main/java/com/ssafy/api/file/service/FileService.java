package com.ssafy.api.file.service;

import com.ssafy.common.exception.handler.NotValidExtensionException;
import com.ssafy.db.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.NoSuchElementException;

public interface FileService {
    //org.springframework.web.multipart.MultipartFile -> java.io.File convert
    File multipartFile2File(MultipartFile multipartFile);
    //로컬 파일 삭제 (스프링에서 파일을 처리하는 MultipartFile를 Amazon S3에 업로드 하기 위해 로컬에 생성한 java.io.File 인스턴스)
    void removeFile(File targetFile);
    //FIXME: 파일 업로드 테스트용 (정식 릴리즈에서는 삭제)
    void saveFileTest(MultipartFile multipartFile);
    //Amazon S3 파일 업로드
    com.ssafy.db.entity.File saveFile(MultipartFile multipartFile, String fileDescription, User user);
    com.ssafy.db.entity.File getFileByFileIdx(long fileIdx);
    String getImageUrlBySaveFilenameAndFileIdx(String saveFilename, String savePath);
    String getDefaultTeamspacePictureImageUrl();
    String getDefaultTeamspaceBackgroundPictureImageUrl();
    String getImageUrlBySaveFileIdx(long fileIdx) throws NoSuchElementException, NotValidExtensionException;
    String getVideoUrlBySaveFileIdx(long fileIdx) throws NoSuchElementException, NotValidExtensionException;
    String getAudioUrlBySaveFileIdx(long fileIdx) throws NoSuchElementException, NotValidExtensionException;
    //Amazon S3에 업로드된 파일 정보를 file 테이블에 저장
    com.ssafy.db.entity.File addTableRecord(com.ssafy.db.entity.File file);
    //Amazon S3에 저장된 파일 다운로드
    byte[] getFile(String storedFileName) throws IOException;
    byte[] getFile(long fileIdx) throws IOException;
    //Amazon S3에 저장된 파일을 파일 경로로 삭제 (예: mela/upload/2024/02/03/mp3/9da691a4-9873-492b-a785-0d0411773a60_Variations On The Canon By Pachelbel.mp3)
    boolean deleteFileByFilePath(String filePath) throws IOException;
    //Amazon S3에 저장된 파일을 파일 idx로 삭제 (예: 1)
    boolean deleteFileByFileInstance(long fileIdx);
    //Amazon S3에 저장된 파일을 file 테이블 인스턴스로 삭제
    boolean deleteFileByFileInstance(com.ssafy.db.entity.File file);
    //Amazon S3에 저장된 파일들을 file 테이블 인스턴스로 삭제 #테스트 중
    boolean deleteFilesByFileInstances(com.ssafy.db.entity.File[] files);
    //파일 이름과 경로로부터 file 인스턴스 리턴
    com.ssafy.db.entity.File getFileBySaveFilenameAndSavePath(String saveFilename, String savePath);
    String getUploaderProfileImageURL(com.ssafy.db.entity.File file);
}