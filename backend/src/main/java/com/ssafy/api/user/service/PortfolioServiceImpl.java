package com.ssafy.api.user.service;

import com.ssafy.api.file.service.FileService;
import com.ssafy.api.user.request.PortfolioMusicPostReq;
import com.ssafy.db.entity.PortfolioAbstract;
import com.ssafy.db.entity.PortfolioMusic;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.PortfolioAbstractRepository;
import com.ssafy.db.repository.PortfolioMusicRepository;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.Spliterator;

@Service("portfolioService")
public class PortfolioServiceImpl implements PortfolioService {
    @Autowired
    FileService fileService;
    @Autowired
    PortfolioMusicRepository portfolioMusicRepository;

    @Autowired
    PortfolioAbstractRepository portfolioAbstractRepository;

    public boolean addPortfolioMusic(PortfolioMusic portfolioMusic, MultipartFile[] multipartFile, PortfolioMusicPostReq portfolioMusicPostReq, User user) {
        for(MultipartFile mf : multipartFile) {
            String extension = FilenameUtils.getExtension(mf.getOriginalFilename());                            //클라이언트가 업로드한 파일의 확장자 추출
            com.ssafy.db.entity.File file;                                                                      //Amazon S3에 업로드한 파일에 관한 정보를 담고 있는 객체 (파일 경로, 원본 파일 명, 저장되는 파일 명, 파일 설명, 용량)

            try {
                //FIXME: swith-case 문으로 수정 가능
                if (extension.equals("mp3") || extension.equals("flac")) {                                       //2-4-1. 음원 파일 (mp3, flac)
                    file = fileService.saveFile(mf, portfolioMusicPostReq.getFileDescription(), user);
                    file = fileService.addTableRecord(file);
                    portfolioMusic.setMusicFileIdx(file);
                } else if (extension.equals("txt") || extension.equals("xml")) {                                 //2-4-2. 가사 파일 (txt, xml)
                    file = fileService.saveFile(mf, portfolioMusicPostReq.getFileDescription(), user);
                    file = fileService.addTableRecord(file);
                    portfolioMusic.setLyricFileIdx(file);
                } else if (extension.equals("jpg") || extension.equals("jpeg") || extension.equals("png")) {     //2-4-3. 앨범 아트(jpg, jpeg, png)
                    file = fileService.saveFile(mf, portfolioMusicPostReq.getFileDescription(), user);
                    file = fileService.addTableRecord(file);
                    portfolioMusic.setAlbumArtFileIdx(file);
                } else {
                    throw new Exception("지원하지 않는 파일 형식입니다.");
                }
            } catch(Exception e) {
                e.printStackTrace();
            }
        }

        portfolioMusic.setTitle(portfolioMusicPostReq.getTitle());          //1. 음원 제목
        portfolioMusic.setPinFixed(portfolioMusicPostReq.isPinFixed());     //2. 핀 (고정) 여부

        portfolioMusicRepository.save(portfolioMusic);                      //테이블에 저장

        return true;
    }

    @Override
    public PortfolioMusic getPortfolioMusicInstanceByPortfolioMusicIdx(long PortfolioMusicIdx) {
        return portfolioMusicRepository.findById(PortfolioMusicIdx).get();
    }

    @Override
    public PortfolioAbstract getPortfolioAbstractByUserIdx(User user) {
//        return portfolioAbstractRepository.findByUserIdx(user).get();
        return portfolioAbstractRepository.findByUserIdx(user);
    }

    @Override
    public List<PortfolioMusic> getPortfolioMusicListByTitle(String word) {
        List<PortfolioMusic> portfolioMusicList = portfolioMusicRepository.findByTitleContaining(word);

        return portfolioMusicList;
    }
}
