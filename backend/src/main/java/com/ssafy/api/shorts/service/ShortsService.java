package com.ssafy.api.shorts.service;

import com.ssafy.api.shorts.request.ShortsPostReq;
import com.ssafy.db.entity.Shorts;
import com.ssafy.db.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ShortsService {

    List<Shorts> getShortsList(User nowLoginUser);

    int uploadShorts(Shorts shorts, MultipartFile multipartFile, ShortsPostReq shortsPostReq);
    com.ssafy.db.entity.File getFileInstanceByShortsIdx(Long shortsIdx);

    void setShortsLike(User user, Long shortsId);
    void setShortsDislike(User user, Long shortsId);
    long getShortsIdxByFileIdx(long shortsIdx);

    Long getShortsSize();
}
