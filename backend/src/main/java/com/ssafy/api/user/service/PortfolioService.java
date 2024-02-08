package com.ssafy.api.user.service;

import com.ssafy.api.user.request.PortfolioMusicPostReq;
import com.ssafy.db.entity.PortfolioAbstract;
import com.ssafy.db.entity.PortfolioMusic;
import com.ssafy.db.entity.User;
import org.springframework.web.multipart.MultipartFile;

public interface PortfolioService {
    boolean addPortfolioMusic(PortfolioMusic portfolioMusic, MultipartFile[] multipartFile, PortfolioMusicPostReq portfolioMusicPostReq);
    PortfolioMusic getPortfolioMusicInstanceByPortfolioMusicIdx(long PortfolioMusicIdx);
    PortfolioAbstract getPortfolioAbstractByUserIdx(User user);
}
