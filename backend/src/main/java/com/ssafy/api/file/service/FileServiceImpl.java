package com.ssafy.api.file.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.api.user.request.PortfolioMusicPostReq;
import com.ssafy.api.user.service.PortfolioService;
import com.ssafy.db.entity.PortfolioMusic;
import com.ssafy.db.repository.FileRepository;
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

    private void removeFile(File targetFile) { // 로컬파일 삭제
        if (targetFile.exists()) {
            if (targetFile.delete()) {
//                System.out.println("파일이 삭제되었습니다.");
            } else {
//                System.out.println("파일이 삭제되지 못했습니다.");
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

    public boolean addPortfolioMusic(PortfolioMusic portfolioMusic, MultipartFile[] multipartFile, PortfolioMusicPostReq portfolioMusicPostReq) {
        for(MultipartFile mf : multipartFile) {
            String extension = FilenameUtils.getExtension(mf.getOriginalFilename());                            //클라이언트가 업로드한 파일의 확장자 추출
            com.ssafy.db.entity.File file;                                                                      //Amazon S3에 업로드한 파일에 관한 정보를 담고 있는 객체 (파일 경로, 원본 파일 명, 저장되는 파일 명, 파일 설명, 용량)

            try {
                //TODO: swith-case 문으로 수정 가능
                if (extension.equals("mp3") || extension.equals("flac")) {                                       //2-4-1. 음원 파일 (mp3, flac)
                    System.err.println("1. 음원");

                    file = saveFile(mf, portfolioMusicPostReq.getFileDescription());
                    file = addTableRecord(file);                                                                 //file 재할당 필요 없을지도
//                    portfolioMusic.setTitle(file.getOriginalFilename());
                    portfolioMusic.setMusicFileIdx(file);
                } else if (extension.equals("pdf") || extension.equals("xml")) {                                 //2-4-2. 가사 파일 (pdf, xml)
                    System.err.println("2. 가사");

                    file = saveFile(mf, portfolioMusicPostReq.getFileDescription());
                    file = addTableRecord(file);                                                                 //file 재할당 필요 없을지도
//                    portfolioMusic.setTitle(file.getOriginalFilename());
                    portfolioMusic.setLyricFileIdx(file);
                } else if (extension.equals("jpg") || extension.equals("jpeg") || extension.equals("png")) {     //2-4-3. 앨범 아트(jpg, jpeg, png)
                    System.err.println("3. 앨범아트");

                    file = saveFile(mf, portfolioMusicPostReq.getFileDescription());
                    file = addTableRecord(file);                                                                 //file 재할당 필요 없을지도
//                    portfolioMusic.setTitle(file.getOriginalFilename());
                    portfolioMusic.setAlbumArtFileIdx(file);
                } else {
                    throw new Exception("지원하지 않는 파일 형식입니다.");
                }
            } catch(Exception e) {
                e.printStackTrace();
            }
        }

        portfolioMusic.setTitle(portfolioMusic.getTitle());
        portfolioService.addPortfolioMusic(portfolioMusic);                                          //3. Service 구현체를 통해 포트폴리오 음악 추가

        return true;
    }

    @Override
    public com.ssafy.db.entity.File saveFile(MultipartFile multipartFile, String fileDescription) {
//        com.ssafy.db.entity.File file = null;
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

//            file = new com.ssafy.db.entity.File();
            file.setSavePath(savePath.toString());                                              //1. 파일 경로
            file.setOriginalFilename(multipartFile.getOriginalFilename());                      //2. 원본 파일 명
            file.setSaveFilename(uuid.toString() + "_" + multipartFile.getOriginalFilename());  //3. 저장되는 파일 명
            file.setFileDescription(fileDescription);                                           //4. 파일 설명
            file.setFileSize(convertedFile.length());                                           //5. 파일 크기 (용량)
        } catch(Exception e) {
            e.printStackTrace();
        }
//        System.err.println("Should Never Reach Here! - FileServiceImpl.java - saveFile");

        return file;
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

    @Override
    public com.ssafy.db.entity.File addTableRecord(com.ssafy.db.entity.File file) {
        return fileRepository.save(file);
    }
}
