package com.ssafy.api.user.service;

import com.ssafy.api.user.request.PortfolioMusicPostReq;
import com.ssafy.db.entity.PortfolioMusic;
import org.springframework.web.multipart.MultipartFile;

public interface PortfolioService {
    boolean addPortfolioMusic(PortfolioMusic portfolioMusic, MultipartFile[] multipartFile, PortfolioMusicPostReq portfolioMusicPostReq);
    PortfolioMusic getPortfolioMusicInstanceByPortfolioMusicIdx(long PortfolioMusicIdx);
}
