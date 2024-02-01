package com.ssafy.api.user.service;

import com.ssafy.api.user.request.PortfolioMusicPostReq;
import com.ssafy.db.entity.PortfolioMusic;
import com.ssafy.db.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("portfolioService")
public class PortfolioServiceImpl implements PortfolioService {
    @Autowired
    PortfolioRepository portfolioRepository;

    @Override
    public void addPortfolioMusic(PortfolioMusic portfolioMusic) {
        portfolioMusic.setTitle(portfolioMusic.getTitle());      //1. 음원 제목
        portfolioMusic.setPinFixed(portfolioMusic.getPinFixed()); //2. 핀 (고정) 여부
        portfolioMusic.setUserIdx(portfolioMusic.getUserIdx());  //3. 유저 식별번호

        //TODO: MusicFileIdx, LyricIdx, AlbumArtFileIdx 저장해주기

        portfolioMusic.setMusicFileIdx(portfolioMusic.getMusicFileIdx());
        portfolioMusic.setLyricFileIdx(portfolioMusic.getLyricFileIdx());
        portfolioMusic.setAlbumArtFileIdx(portfolioMusic.getAlbumArtFileIdx());

        System.err.println("portfolioMusic: " + portfolioMusic);

        portfolioRepository.save(portfolioMusic);
    }
}
