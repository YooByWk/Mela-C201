package com.ssafy.db.repository;

import com.ssafy.db.entity.PortfolioMusic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * 포트폴리오 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
public interface PortfolioMusicRepository extends JpaRepository<PortfolioMusic, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.
    Optional<PortfolioMusic> findByportfolioMusicIdx(long portfolioMusicIdx);

    List<PortfolioMusic> findByTitleContaining(String word);
}
