package com.ssafy.api.shorts.service;

import com.ssafy.api.chat.request.ChatMessage;
import com.ssafy.api.chat.service.ChatRoomService;
import com.ssafy.api.chat.service.ChatService;
import com.ssafy.api.file.service.FileService;
import com.ssafy.api.shorts.request.ShortsPostReq;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.apache.commons.io.FilenameUtils;
import org.checkerframework.checker.units.qual.C;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import static com.ssafy.common.util.ExtensionUtil.isValidVideoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service("shortsService")
public class ShortsServiceImpl implements ShortsService {
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

    @Autowired
    ChatService chatService;
    @Autowired
    ChatRoomService chatRoomService;

    @Autowired
    UserShortsQueueRepository userShortsQueueRepository;

    //지원하는 동영상 확장자 ArrayList
    String[] supportedVideoExtension = {"MKV", "MP4", "AVI"};

    boolean isValidVideoExtension(String extension) {
        for (String s : supportedVideoExtension) {
            if (extension.equals(s.toUpperCase()) || extension.equals(s.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    @Override
    public List<com.ssafy.api.board.response.Shorts> getShortsList(User nowLoginUser) {
        //1. 현재 사용자의 선호장르, 싫어요 표시한 쇼츠의 리스트를 가져오기
        List<UserGenre> preferedGenre = userGenreRepository.findGenreIdxByUserIdx(nowLoginUser);                    //사용자의 선호장르
        List<ShortsDislike> shortsDislikeList = shortsDislikeRepository.findShortsIdxByUserIdx(nowLoginUser);       //사용자가 싫어요 표시한 쇼츠 리스트

        //1.1 싫어요 표시한 쇼츠의 idx값을 가져오기
        List<Shorts> dislikedShortsIdx = new ArrayList<>();
        for (ShortsDislike shortsDislike : shortsDislikeList) {
            dislikedShortsIdx.add(shortsDislike.getShortsIdx());
        }

        //2. 사용자가 싫어요 표시한 쇼츠를 제외하고 쇼츠리스트 전체를 가져오기
//        List<Shorts> shortsList = shortsRepository.findByShortsIdxNotIn(dislikedShortsIdx).get();
//        System.out.println("++++++++++++++++++++++++++++++++");
//        System.out.println(dislikedShortsIdx.size());
//        System.out.println(shortsList.size());
//        System.out.println("++++++++++++++++++++++++++++++++");
        List<Shorts> shortsList = shortsRepository.findAll();

        //3. 가져온 쇼츠 리스트에서 쇼츠를 올린 사람의 장르를, 현재 사용자의 선호장르와 비교하여 쇼츠 리스트를 추출함
        List<com.ssafy.api.board.response.Shorts> selectedShortsListResponse = new ArrayList<>();

        boolean isShortsAdd;
        for (Shorts shorts : shortsList) {
            //쇼츠업로더의 userIdx
            User shortsUploaderUserIdx = shorts.getUserIdx();
            List<UserGenre> uploaderPreferedGenre = userGenreRepository.findGenreIdxByUserIdx(shortsUploaderUserIdx);
            isShortsAdd = false;
            //사용자가 싫어요 표시한 쇼츠라면 반환리스트에서 제외
            if (dislikedShortsIdx.contains(shorts)) {
                continue;
            }

            //1. 로그인 한 사용자의 선호 없다면
            //2. 업로드한 사용자의 선호 장르가 없다면 일단 반환리스트에 추가
            if (preferedGenre == null || preferedGenre.isEmpty() || uploaderPreferedGenre.size() == 0) {
                com.ssafy.api.board.response.Shorts shortsResponse = new com.ssafy.api.board.response.Shorts();
                //setter 호출
                shortsResponse.setShortsIdx(shorts.getShortsIdx());
                shortsResponse.setUserIdx(shorts.getUserIdx());
                shortsResponse.setTitle(shorts.getTitle());
                shortsResponse.setDescription(shorts.getDescription());
                shortsResponse.setShortsPathFileIdx(shorts.getShortsPathFileIdx());

                String videoUrl = null;

                //fileservice를 이용해 Amazon S3 영상 링크 가져오기
                try {
                    videoUrl = fileService.getVideoUrlBySaveFileIdx(shorts.getShortsPathFileIdx().getFileIdx());
                } catch (Exception e) {
                    e.printStackTrace();
                }

                //com.ssafy.api.board.response.Shorts DTO에 영상 링크 설정
                shortsResponse.setFileURL(videoUrl);
                //리스트 추가
                selectedShortsListResponse.add(shortsResponse);

                continue;
            }

            //3. 업로드한 사용자의 선호장르가 있다면, 로그인한 사용자의 선호장르와 비교하여 반환리스트에 추가
            for (int i = 0; i < preferedGenre.size(); i++) {
                for (int j = 0; j < uploaderPreferedGenre.size(); j++) {
                    if (preferedGenre.get(i).getGenreIdx() == uploaderPreferedGenre.get(j).getGenreIdx()) {
                        com.ssafy.api.board.response.Shorts shortsResponse = new com.ssafy.api.board.response.Shorts();
                        //setter 호출
                        shortsResponse.setShortsIdx(shorts.getShortsIdx());
                        shortsResponse.setUserIdx(shorts.getUserIdx());
                        shortsResponse.setTitle(shorts.getTitle());
                        shortsResponse.setDescription(shorts.getDescription());
                        shortsResponse.setShortsPathFileIdx(shorts.getShortsPathFileIdx());

                        String videoUrl = null;

                        //fileservice를 이용해 Amazon S3 영상 링크 가져오기
                        try {
                            videoUrl = fileService.getVideoUrlBySaveFileIdx(shorts.getShortsPathFileIdx().getFileIdx());
                            System.err.println("videoUrl2: " + videoUrl);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }

                        //com.ssafy.api.board.response.Shorts DTO에 영상 링크 설정
                        shortsResponse.setFileURL(videoUrl);
                        //리스트 추가
                        selectedShortsListResponse.add(shortsResponse);
                        isShortsAdd = true;
                        break;
                    }
                }
                if (isShortsAdd) break;
            }
        }

        return selectedShortsListResponse;
    }

    @Override
    public int uploadShorts(Shorts shorts, MultipartFile multipartFile, ShortsPostReq shortsPostReq, User user) {
        String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());                            //클라이언트가 업로드한 파일의 확장자 추출

        //1. 지원하는 비디오 확장자인지 검사
        if (!isValidVideoExtension(extension)) {
            return 415; //Not Supported Type
        }

        //2. Amazon S3에 동영상 업로드
        com.ssafy.db.entity.File file = fileService.saveFile(multipartFile, shortsPostReq.getFileDescription(), user);

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

        Optional<ShortsLike> isShortsLiked = shortsLikeRepository.findByShortsIdxAndUserIdx(shorts, user);
        if (isShortsLiked.isPresent()) {
            shortsLikeRepository.delete(isShortsLiked.get());
            System.out.println("좋아요 취소됐습니다");
            return;
        }

        ShortsLike shortsLike = new ShortsLike();
        shortsLike.setUserIdx(user);
        shortsLike.setShortsIdx(shorts);
        shortsLike.setUploaderUserIdx(shorts.getUserIdx());
        shortsLikeRepository.save(shortsLike);


        User getAlarmUser = shortsLike.getUploaderUserIdx();

        Notification notification = new Notification();
        notification.setUserIdx(getAlarmUser);    //알람을 받을 사용자; User 객체 타입
        notification.setAlarmContent(user.getNickname() + "님이 당신의 쇼츠에 좋아요를 눌렀습니다.");
        notification.setChecked(false);
        notification.setAlarmDate(LocalDateTime.now());
        notificationRepository.save(notification);


        if (shortsLikeRepository.findByUserIdxAndUploaderUserIdx(getAlarmUser, user).get().size() == 1) {
            Notification notification1 = new Notification();
            Notification notification2 = new Notification();
            notification1.setUserIdx(getAlarmUser);    //알람을 받을 사용자; User 객체 타입
            notification2.setUserIdx(user);    //알람을 받을 사용자; User 객체 타입
            notification1.setAlarmContent(user.getNickname()+"님과 서로의 쇼츠에 좋아요를 눌렀습니다. 채팅방으로 이동하여 대화를 시작해보세요.");
            notification2.setAlarmContent(getAlarmUser.getNickname()+"님과 서로의 쇼츠에 좋아요를 눌렀습니다. 채팅방으로 이동하여 대화를 시작해보세요.");
            notification1.setChecked(false);
            notification2.setChecked(false);
            notification1.setAlarmDate(LocalDateTime.now());
            notification2.setAlarmDate(LocalDateTime.now());
            notificationRepository.save(notification1);
            notificationRepository.save(notification2);

            // 채팅방 만들어주기
            String roomIdx = chatRoomService.enterOneToOneRoom(user.getUserIdx(), getAlarmUser.getUserIdx());

            // 메시지 보내기 1
            String content = getAlarmUser.getNickname() + "님이 " + user.getNickname() +"님을 마음에 들어합니다.";
            ChatMessage message = new ChatMessage();
            message.setSendTime(LocalDateTime.now()+"");
            message.setMessage(content);
            message.setNickname(getAlarmUser.getNickname());
            message.setUserIdx(getAlarmUser.getUserIdx()+"");
            message.setRoomIdx(roomIdx);
            chatService.saveMessage(message);

            // 메시지 보내기 2
            content = user.getNickname() + "님이 " + getAlarmUser.getNickname() +"님을 마음에 들어합니다.";
            message = new ChatMessage();
            message.setSendTime(LocalDateTime.now()+"");
            message.setMessage(content);
            message.setNickname(user.getNickname());
            message.setUserIdx(user.getUserIdx()+"");
            message.setRoomIdx(roomIdx);
            chatService.saveMessage(message);
        }


    }

    @Override
    public void setShortsDislike(User user, Long shortsId) {
        Shorts shorts = shortsRepository.getOne(shortsId);

        Optional<ShortsDislike> isShortsDisliked = shortsDislikeRepository.findByShortsIdxAndUserIdx(shorts, user);
        if (isShortsDisliked.isPresent()) {
            shortsDislikeRepository.delete(isShortsDisliked.get());
            System.out.println("싫어요 취소됐습니다");
            return;
        }

        ShortsDislike shortsDislike = new ShortsDislike();
        shortsDislike.setUserIdx(user);
        shortsDislike.setShortsIdx(shorts);
        shortsDislikeRepository.save(shortsDislike);
    }

    @Override
    public long getShortsIdxByFileIdx(long shortsIdx) {
        return shortsRepository.findByShortsIdx(shortsIdx).get().getShortsPathFileIdx().getFileIdx();
    }

    @Override
    public com.ssafy.api.board.response.Shorts getSingleShortsByUserIdx(User user) {
        //1-1. 로그인한 사용자의 쇼츠 동영상 큐 로드
        List<UserShortsQueue> userShortsQueueList = null;
        try {
            userShortsQueueList = userShortsQueueRepository.findByUserIdx(user);
        } catch (Exception e) {
            e.printStackTrace();
        }

        //1-2. 로그인한 사용자의 쇼츠 동영상 리스트가 UserShortsQueue 테이블에 없다면 새로 로드 후 테이블에 추가
        if (userShortsQueueList == null || userShortsQueueList.isEmpty()) {
            List<com.ssafy.api.board.response.Shorts> shortsResponseList = getShortsList(user);
            List<Shorts> shortsList = new ArrayList<>();

            Collections.shuffle(shortsResponseList);                        //순서 무작위로 변경

            for(com.ssafy.api.board.response.Shorts shortsResponse : shortsResponseList) {
                System.err.println("shortsResponse: " + shortsResponse);

                Shorts shorts = new Shorts();

                shorts.setShortsIdx(shortsResponse.getShortsIdx());
                shorts.setUserIdx(shortsResponse.getUserIdx());
                shorts.setTitle(shortsResponse.getTitle());
                shorts.setDescription(shortsResponse.getDescription());
                shorts.setShortsPathFileIdx(shortsResponse.getShortsPathFileIdx());

                shortsList.add(shorts);
            }

            saveRecordIntoUserShortsQueueTable(shortsList, user);
        }

        List<UserShortsQueue> userShortsQueuePageList = userShortsQueueRepository.getSingleRecord(user, PageRequest.of(0, 1));

        UserShortsQueue userShortsQueue = userShortsQueuePageList.get(0);
        Shorts shorts = userShortsQueue.getShortsIdx();
        com.ssafy.api.board.response.Shorts shortsResponse = new com.ssafy.api.board.response.Shorts();
        String videoUrl = null;

        //setter 호출
        shortsResponse.setShortsIdx(shorts.getShortsIdx());
        shortsResponse.setUserIdx(shorts.getUserIdx());
        shortsResponse.setTitle(shorts.getTitle());
        shortsResponse.setDescription(shorts.getDescription());
        shortsResponse.setShortsPathFileIdx(shorts.getShortsPathFileIdx());

        //fileservice를 이용해 Amazon S3 영상 링크 가져오기
        try {
            videoUrl = fileService.getVideoUrlBySaveFileIdx(shorts.getShortsPathFileIdx().getFileIdx());
        } catch (Exception e) {
            e.printStackTrace();
        }

        //3. shorts 테이블에서 전송한 레코드 삭제
        userShortsQueueRepository.delete(userShortsQueue);

        shortsResponse.setFileURL(videoUrl);

        return shortsResponse;
    }

    @Override
    public List<Shorts> getShortsListByUserIdx(User user) {
        List<Shorts> shortsList = shortsRepository.findByUserIdx(user);

        return shortsList;
    }

    public Long getShortsSize() {
        return shortsRepository.countBy();
    }

    @Override
    public void saveRecordIntoUserShortsQueueTable(List<Shorts> shorts, User user) {
        for (Shorts data : shorts) {
            UserShortsQueue userShortsQueue = new UserShortsQueue();
            userShortsQueue.setUserIdx(user);
            System.err.println("saveRecordIntoUserShortsQueueTable data: " + data);
            userShortsQueue.setShortsIdx(data);

            userShortsQueueRepository.save(userShortsQueue);
        }

    }
}
