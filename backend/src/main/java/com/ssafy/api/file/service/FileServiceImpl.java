package com.ssafy.api.file.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Service("fileServiceImpl")
public class FileServiceImpl implements FileService {
    @Value("${spring.servlet.multipart.location}")
    private String uploadPath;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Autowired
    AmazonS3 amazonS3Client;

    public File multipartFile2File(MultipartFile multipartFile) {
        File file = new File(multipartFile.getOriginalFilename());

        try {
            file.createNewFile();
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(multipartFile.getBytes());
            fos.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return file;
    }
    @Override
    public void saveFile(MultipartFile file) {
        //1. 업로드 한 파일이 비어있는지 확인
        try {
            if (file.isEmpty()) {
                throw new Exception("Empty file -FileServiceImpl.java");
            }
        } catch(Exception e) {
            e.printStackTrace();
        }

        Path root = Paths.get(uploadPath);

        //2. 파일 업로드
        try (InputStream inputStream = file.getInputStream()) {
            //2-1. UUID 생성
            UUID uuid = UUID.randomUUID();

            //2-2. 오늘 날짜 가져옴
            Date today = new Date(); //현재 날짜를 가져오기

            // SimpleDateFormat을 사용하여 원하는 형식으로 날짜를 포맷
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
            String formattedDate = dateFormat.format(today);

            String year = formattedDate.substring(0, 4);
            String month = formattedDate.substring(4, 6);
            String date = formattedDate.substring(6, 8);

            //2-3. 업로드할 폴더 생성
            //TODO: 확장자 또는 날짜별 파일 디렉토리 다르게 하기
            Path savePath = root.resolve(year).resolve(month).resolve(date);

            //확장자 가져오는 소스 #사용 안 하면 삭제하기!
            String extension = FilenameUtils.getExtension(file.getOriginalFilename());
            savePath = savePath.resolve(extension);

            //파일이 저장될 폴더 생성 작동 확인 필요
            Files.createDirectories(Paths.get(savePath.toString()));

            //2-4. 파일 업로드 (서버 PC에 저장되므로 코드 지우기!)
            //StandardCopyOption.REPLACE_EXISTING 옵션: 같은 이름의 파일이 존재하는 경우 기존 파일 대체
            Files.copy(inputStream, savePath.resolve(uuid.toString() + "_" + file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);

            //2-5. 파일 업로드 (Amazon S3)
            String newFileName = savePath.resolve(uuid.toString() + "_" + file.getOriginalFilename()).toString();
            newFileName = newFileName.replace("\\", "/");

            File convertedFile = multipartFile2File(file);      //MultipartFile -> File 변환 (Amazon S3 업로드 위함)

            // PublicRead 권한으로 업로드
            amazonS3Client.putObject(new PutObjectRequest(bucket, newFileName, convertedFile).withCannedAcl(CannedAccessControlList.PublicRead));
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public Resource loadAsResource(String filePath) {
        try {
            Resource resource = new UrlResource(filePath);
            Path root = Paths.get(filePath);

            if (resource.exists() || resource.isReadable()) {
                return resource;
            }

        } catch (MalformedURLException e) {
            throw new RuntimeException("파일을 읽을 수 없습니다. : " + filePath, e);
        }

        System.err.println("Should Never Reach Here! - FileServiceImpl.java");

        return null;
    }

//    @Override
//    public void deleteAll() {
//
//    }

    @Override
    public void deleteFile(String filePath) {
        FileSystemUtils.deleteRecursively(Paths.get(filePath).toFile());
    }
}
