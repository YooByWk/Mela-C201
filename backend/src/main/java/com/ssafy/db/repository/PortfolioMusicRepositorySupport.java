package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.PortfolioMusic;
import com.ssafy.db.entity.QPortfolioMusic;
import com.ssafy.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 포트폴리오 뮤직 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class PortfolioMusicRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QPortfolioMusic qPortfolioMusic = QPortfolioMusic.portfolioMusic;

    public List<PortfolioMusic> getPortfolioMusicListByUserIdx(User user) {
        List<PortfolioMusic> portfolioMusicList = jpaQueryFactory.select(qPortfolioMusic).from(qPortfolioMusic).where(qPortfolioMusic.userIdx.eq(user)).fetch();

        return portfolioMusicList;
    }
}
