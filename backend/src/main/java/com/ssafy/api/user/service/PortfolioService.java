package com.ssafy.api.user.service;

import com.ssafy.api.user.request.PortfolioMusicPostReq;
import com.ssafy.db.entity.PortfolioMusic;

public interface PortfolioService {
    void addPortfolioMusic(PortfolioMusic portfolioMusic);
}
