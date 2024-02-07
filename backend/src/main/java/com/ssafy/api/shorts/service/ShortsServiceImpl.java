package com.ssafy.api.shorts.service;

import com.ssafy.api.file.service.FileService;
import com.ssafy.api.shorts.request.ShortsPostReq;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import static com.ssafy.common.util.ExtensionUtil.isValidVideoExtension;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("shortsService")
public class ShortsServiceImpl implements  ShortsService {
    @Autowired
    FileService fileService;

    @Autowired
    ShortsRepository shortsRepository;

    @Autowired
    ShortsLikeRepository shortsLikeRepository;

    @Autowired
    ShortsDislikeRepository shortsDislikeRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    UserGenreRepository userGenreRepository;


    //지원하는 동영상 확장자 ArrayList
    String[] supportedVideoExtension = {"MKV", "MP4", "AVI"};

    boolean isValidVideoExtension(String extension) {
        for(String s : supportedVideoExtension) {
            if(extension.equals(s.toUpperCase()) || extension.equals(s.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    @Override
    public List<Shorts> getShortsList(User nowLoginUser) {
        //1. 현재 사용자의 선호장르, 싫어요 표시한 쇼츠의 리스트를 가져오기
        List<Genre> preferedGenre = userGenreRepository.findGenreIdxByUserIdx(nowLoginUser).get();  //사용자의 선호장르
        List<Shorts> dislikedShorts = shortsDislikeRepository.findShortsIdxByUserIdx(nowLoginUser).get();   //사용자가 싫어요 표시한 쇼츠 리스트

        //1.1 싫어요 표시한 쇼츠의 idx값을 가져오기
        List<Shorts> dislikedShortsIdx = new ArrayList<>();
        for(Shorts disShort : dislikedShorts){
            dislikedShortsIdx.add(disShort);
        }

        //2. 사용자가 싫어요 표시한 쇼츠를 제외하고 쇼츠리스트 전체를 가져오기
//        List<Shorts> shortsList = shortsRepository.findByShortsIdxNotIn(dislikedShortsIdx).get();
//        System.out.println("++++++++++++++++++++++++++++++++");
//        System.out.println(dislikedShortsIdx.size());
//        System.out.println(shortsList.size());
//        System.out.println("++++++++++++++++++++++++++++++++");
        List<Shorts> shortsList = shortsRepository.findAll();

        //3. 가져온 쇼츠 리스트에서 쇼츠를 올린 사람의 장르를, 현재 사용자의 선호장르와 비교하여 쇼츠 리스트를 추출함
        List<Shorts> selectedShortsList = new ArrayList<>();
        boolean isShortsAdd;
        for(Shorts shorts : shortsList){
            //쇼츠업로더의 userIdx
            User shortsUploaderUserIdx = shorts.getUserIdx();
            List<Genre> uploaderPreferedGenre = userGenreRepository.findGenreIdxByUserIdx(shortsUploaderUserIdx).get();
            isShortsAdd = false;
            //사용자가 싫어요 표시한 쇼츠라면 반환리스트에서 제외
            if(dislikedShortsIdx.contains(shorts.getShortsIdx())){
                continue;
            }

            //업로드한 사용자의 선호 장르가 없다면 일단 반환리스트에 추가
            if(uploaderPreferedGenre.size() == 0){
                selectedShortsList.add(shorts);
                continue;
            }

            //업로드한 사용자의 선호장르가 있다면, 로그인한 사용자의 선호장르와 비교하여 반환리스트에 추가
            for(int i=0; i<preferedGenre.size(); i++){
                for(int j=0; j<uploaderPreferedGenre.size(); j++){
                    if(preferedGenre.get(i).getGenreIdx() == uploaderPreferedGenre.get(j).getGenreIdx()){
                        selectedShortsList.add(shorts);
                        isShortsAdd = true;
                        break;
                    }
                }
                if(isShortsAdd) break;
            }
        }

        return selectedShortsList;
//        return shortsList;
    }

    @Override
    public int uploadShorts(Shorts shorts, MultipartFile multipartFile, ShortsPostReq shortsPostReq) {
        String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());                            //클라이언트가 업로드한 파일의 확장자 추출

        //1. 지원하는 비디오 확장자인지 검사
        if(!isValidVideoExtension(extension)) {
            return 415; //Not Supported Type
        }

        //2. Amazon S3에 동영상 업로드
        com.ssafy.db.entity.File file = fileService.saveFile(multipartFile, shortsPostReq.getFileDescription());

        //3. file 테이블에 관련 정보 저장
        file = fileService.addTableRecord(file);

        //4. shorts VO 설정
        shorts.setTitle(shortsPostReq.getTitle());
        shorts.setDescription(shortsPostReq.getFileDescription());
        shorts.setShortsPathFileIdx(file);

        //5. shorts 테이블에 관련 정보 저장
        shortsRepository.save(shorts);

        //6. 정상 업로드: 200 리턴
        return 200;
    }

    @Override
    public com.ssafy.db.entity.File getFileInstanceByShortsIdx(Long shortsIdx) {
        return shortsRepository.findByShortsIdx(shortsIdx).get().getShortsPathFileIdx();
    }

    @Override
    public void setShortsLike(User user, Long shortsId) {
        Shorts shorts = shortsRepository.getOne(shortsId);

        Optional<ShortsLike> isShortsLiked = shortsLikeRepository.findByShortsIdxAndUserIdx(shorts,user);
        if(isShortsLiked.isPresent()){
            shortsLikeRepository.delete(isShortsLiked.get());
            System.out.println("좋아요 취소됐습니다");
            return ;
        }

        ShortsLike shortsLike = new ShortsLike();
        shortsLike.setUserIdx(user);
        shortsLike.setShortsIdx(shorts);
        shortsLike.setUploaderUserIdx(shorts.getUserIdx());
        shortsLikeRepository.save(shortsLike);


        User getAlarmUser = shortsLike.getUploaderUserIdx();

        Notification notification = new Notification();
        notification.setUserIdx(getAlarmUser);    //알람을 받을 사용자; User 객체 타입
        notification.setAlarmContent(user.getNickname()+"님이 당신의 쇼츠 "+ shorts.getTitle() +" 에 좋아요를 눌렀습니다.");
        notification.setChecked(false);
        notification.setAlarmDate(LocalDateTime.now());
        notificationRepository.save(notification);


        if(shortsLikeRepository.findByUserIdxAndUploaderUserIdx(getAlarmUser,user).get().size() == 1){
            Notification notification1 = new Notification();
            Notification notification2 = new Notification();
            notification1.setUserIdx(getAlarmUser);    //알람을 받을 사용자; User 객체 타입
            notification2.setUserIdx(user);    //알람을 받을 사용자; User 객체 타입
            notification1.setAlarmContent(user.getNickname()+"님과 서로의 쇼츠에 좋아요를 눌렀습니다.");
            notification2.setAlarmContent(getAlarmUser.getNickname()+"님과 서로의 쇼츠에 좋아요를 눌렀습니다.");
            notification1.setChecked(false);
            notification2.setChecked(false);
            notification1.setAlarmDate(LocalDateTime.now());
            notification2.setAlarmDate(LocalDateTime.now());
            notificationRepository.save(notification1);
            notificationRepository.save(notification2);
        }
    }

    @Override
    public void setShortsDislike(User user, Long shortsId) {
        Shorts shorts = shortsRepository.getOne(shortsId);

        Optional<ShortsDislike> isShortsDisliked = shortsDislikeRepository.findByShortsIdxAndUserIdx(shorts,user);
        if(isShortsDisliked.isPresent()){
            shortsDislikeRepository.delete(isShortsDisliked.get());
            System.out.println("싫어요 취소됐습니다");
            return ;
        }

        ShortsDislike shortsDislike = new ShortsDislike();
        shortsDislike.setUserIdx(user);
        shortsDislike.setShortsIdx(shorts);
        shortsDislikeRepository.save(shortsDislike);
    }
}
