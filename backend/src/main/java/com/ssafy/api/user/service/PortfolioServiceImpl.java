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
    public void addPortfolioMusic(PortfolioMusicPostReq portfolioMusicPostReq) {
        PortfolioMusic portfolioMusic = new PortfolioMusic();
        portfolioMusic.setTitle(portfolioMusicPostReq.getTitle());
        portfolioMusic.setPinFixed(portfolioMusicPostReq.isPinFixed());
        portfolioMusic.setUserIdx(portfolioMusicPostReq.getUserIdx());

        //TODO: MusicFileIdx, FileIdx, AlbumArtFileIdx 저장해주기

//        portfolioMusic.setMusicFileIdx(portfolioMusicPostReq.getMusicFileIdx());
//        portfolioMusic.setLyricFileIdx(portfolioMusicPostReq.getLyricFileIdx());
//        portfolioMusic.setAlbumArtFileIdx(portfolioMusicPostReq.getAlbumArtFileIdx());

        portfolioRepository.save(portfolioMusic);
    }
}
