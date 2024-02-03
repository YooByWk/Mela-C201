package com.ssafy.api.shorts.service;

import com.ssafy.api.shorts.request.ShortsPostReq;
import com.ssafy.db.entity.PortfolioMusic;
import com.ssafy.db.entity.Shorts;
import org.springframework.web.multipart.MultipartFile;

public interface ShortsService {
    int uploadShorts(Shorts shorts, MultipartFile multipartFile, ShortsPostReq shortsPostReq);
    long getFileIndexByShortsIdx(Long shortsIdx);
    com.ssafy.db.entity.File getFileInstanceByShortsIdx(Long shortsIdx);
}
