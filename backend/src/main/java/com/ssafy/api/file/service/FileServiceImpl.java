package com.ssafy.api.file.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.ssafy.api.user.service.PortfolioService;
import com.ssafy.db.repository.FileRepository;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URLEncoder;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    @Autowired
    FileRepository fileRepository;

    @Autowired
    PortfolioService portfolioService;

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
    public void removeFile(File targetFile) { // 로컬파일 삭제
        if (targetFile.exists()) {
            if (targetFile.delete()) {
                //System.out.println("파일이 삭제되었습니다.");
            } else {
                //System.out.println("파일이 삭제되지 못했습니다.");
            }
        }
    }

    @Override
    public void saveFileTest(MultipartFile multipartFile) {
        com.ssafy.db.entity.File file;

        //1. 업로드 한 파일이 비어있는지 확인
        try {
            if (multipartFile.isEmpty()) {
                throw new Exception("Empty file -FileServiceImpl.java");
            }
        } catch(Exception e) {
            e.printStackTrace();
        }

        //2. 파일 업로드
        try (InputStream inputStream = multipartFile.getInputStream()) {
            //TODO: 컨트롤러 서버에 파일 저장되는지 확인

            //2-1. UUID 생성 (같은 이름의 파일 (확장자 포함) 업로드 충돌 방지)
            UUID uuid = UUID.randomUUID();

            //2-2. 오늘 날짜 가져옴
            Date today = new Date();    //현재 날짜를 가져오기

            //SimpleDateFormat을 사용하여 원하는 형식으로 날짜를 포맷
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
            String formattedDate = dateFormat.format(today);

            String year = formattedDate.substring(0, 4);    //예: 2024
            String month = formattedDate.substring(4, 6);   //예: 01
            String date = formattedDate.substring(6, 8);    //예: 31

            //2-3. 업로드할 파일 명 결정
            //application.properties 파일에 저장된 ${spring.servlet.multipart.location} 값 불러옴 (Amazon S3에 저장할 디렉토리 경로) 예: mela/upload/
            Path root = Paths.get(uploadPath);

            //2-3-1. 클라이언트가 업로드한 파일의 확장자 추출
            String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());

            //2-3-2. {year} '/' + {month} + '/' + {date} + '/' + {확장자} + UUID + '_' + {파일 명}으로 결정 예: mela/upload/2024/01/31/mp3/c6f24614-0f2a-4d74-b1bd-3343cb1fb72a_mela.mp3
            Path savePath = root.resolve(year).resolve(month).resolve(date).resolve(extension);

            //2-4. 파일 업로드 (서버 PC에 저장되는 코드이므로 주석!)
            //StandardCopyOption.REPLACE_EXISTING 옵션: 같은 이름의 파일이 존재하는 경우 기존 파일 대체
            //Files.copy(inputStream, savePath.resolve(uuid.toString() + "_" + file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);

            //2-4. 파일 업로드 (Amazon S3)
            String saveFilename = savePath.resolve(uuid.toString() + "_" + multipartFile.getOriginalFilename()).toString();
            saveFilename = saveFilename.replace("\\", "/");           //Amazon S3의 경로 구분자는 '/'이므로 "\\" -> "/" 치환

            //MultipartFile -> File 변환 (Amazon S3 업로드 위함)
            File convertedFile = multipartFile2File(multipartFile);

            //PublicRead 권한으로 Amazon S3 업로드
            amazonS3Client.putObject(new PutObjectRequest(bucket, saveFilename, convertedFile).withCannedAcl(CannedAccessControlList.PublicRead));

            //MultipartFile -> File로 변환하면서 로컬에 저장된 파일 삭제
            removeFile(convertedFile);
        } catch(Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    public com.ssafy.db.entity.File saveFile(MultipartFile multipartFile, String fileDescription) {
        com.ssafy.db.entity.File file = new com.ssafy.db.entity.File();

        //1. 업로드 한 파일이 비어있는지 확인
        try {
            if (multipartFile.isEmpty()) {
                throw new Exception("Empty file -FileServiceImpl.java");
            }
        } catch(Exception e) {
            e.printStackTrace();
        }

        //2. 파일 업로드
        try (InputStream inputStream = multipartFile.getInputStream()) {
            //TODO: 컨트롤러 서버에 파일 저장되는지 확인

            //2-1. UUID 생성 (같은 이름의 파일 (확장자 포함) 업로드 충돌 방지)
            UUID uuid = UUID.randomUUID();

            //2-2. 오늘 날짜 가져옴
            Date today = new Date();    //현재 날짜를 가져오기

            //SimpleDateFormat을 사용하여 원하는 형식으로 날짜를 포맷
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
            String formattedDate = dateFormat.format(today);

            String year = formattedDate.substring(0, 4);    //예: 2024
            String month = formattedDate.substring(4, 6);   //예: 01
            String date = formattedDate.substring(6, 8);    //예: 31

            //2-3. 업로드할 파일 명 결정
            //application.properties 파일에 저장된 ${spring.servlet.multipart.location} 값 불러옴 (Amazon S3에 저장할 디렉토리 경로) 예: mela/upload/
            Path root = Paths.get(uploadPath);

            //2-3-1. 클라이언트가 업로드한 파일의 확장자 추출
            String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());

            //2-3-2. {year} '/' + {month} + '/' + {date} + '/' + {확장자} + UUID + '_' + {파일 명}으로 결정 예: mela/upload/2024/01/31/mp3/c6f24614-0f2a-4d74-b1bd-3343cb1fb72a_mela.mp3
            Path savePath = root.resolve(year).resolve(month).resolve(date).resolve(extension);

            //2-4. 파일 업로드 (서버 PC에 저장되는 코드이므로 주석!)
            //StandardCopyOption.REPLACE_EXISTING 옵션: 같은 이름의 파일이 존재하는 경우 기존 파일 대체
            //Files.copy(inputStream, savePath.resolve(uuid.toString() + "_" + file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);

            //2-4. 파일 업로드 (Amazon S3)
            String saveFilename = savePath.resolve(uuid.toString() + "_" + multipartFile.getOriginalFilename()).toString();
            saveFilename = saveFilename.replace("\\", "/");           //Amazon S3의 경로 구분자는 '/'이므로 "\\" -> "/" 치환

            //MultipartFile -> File 변환 (Amazon S3 업로드 위함)
            File convertedFile = multipartFile2File(multipartFile);

            //PublicRead 권한으로 Amazon S3 업로드
            amazonS3Client.putObject(new PutObjectRequest(bucket, saveFilename, convertedFile).withCannedAcl(CannedAccessControlList.PublicRead));

            file.setSavePath(savePath.toString().replace("\\", "/"));           //1. 파일 경로
            file.setOriginalFilename(multipartFile.getOriginalFilename());                      //2. 원본 파일 명
            file.setSaveFilename(uuid.toString() + "_" + multipartFile.getOriginalFilename());  //3. 저장되는 파일 명
            file.setFileDescription(fileDescription);                                           //4. 파일 설명
            file.setFileSize(convertedFile.length());                                           //5. 파일 크기 (용량)

            //MultipartFile -> File로 변환하면서 로컬에 저장된 파일 삭제
            removeFile(convertedFile);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return file;
    }

    //TODO: 테스트 코드임
    public ResponseEntity<byte[]> getObject(String storedFileName) throws IOException{
        try {
            S3Object o = amazonS3Client.getObject(new GetObjectRequest(bucket, storedFileName));
            S3ObjectInputStream objectInputStream = o.getObjectContent();
            byte[] bytes = IOUtils.toByteArray(objectInputStream);

            String fileName = URLEncoder.encode(storedFileName, "UTF-8").replaceAll("\\+", "%20");
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            httpHeaders.setContentLength(bytes.length);
            httpHeaders.setContentDispositionFormData("attachment", fileName);
            objectInputStream.close();
            o.close();

            return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
        }

        //요청한 파일을 찾을 수 없는 경우
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @Override
    public byte[] loadAsResource(String filePath) {
        S3Object s3Object = amazonS3Client.getObject(new GetObjectRequest(bucket, filePath));
        S3ObjectInputStream objectInputStream = s3Object.getObjectContent();

        s3Object = amazonS3Client.getObject(bucket, filePath);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            return IOUtils.toByteArray(inputStream);
        } catch (IOException e) {
//            throw new Exception("File Download Failed");
            return null;
        }

        /*
        try {
            //서버에 File Stream 생성
            FileOutputStream fos = new FileOutputStream(new File(fileName));
            byte[] read_buf = new byte[1024];
            int read_len = 0;
            //파일 저장
            while ((read_len = file.read(read_buf)) > 0) {
                fos.write(read_buf, 0, read_len);
            }
            objectInputStream.close();
            fos.close();
        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        */

        /*
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
        */
    }

    @Override
    public com.ssafy.db.entity.File addTableRecord(com.ssafy.db.entity.File file) {
        return fileRepository.save(file);
    }
}
