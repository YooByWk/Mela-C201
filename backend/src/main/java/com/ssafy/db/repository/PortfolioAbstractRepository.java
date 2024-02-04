package com.ssafy.db.repository;

import com.ssafy.db.entity.PortfolioAbstract;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PortfolioAbstractRepository extends JpaRepository<PortfolioAbstract, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.
    //TODO: 테스트 필요!
//    Optional<PortfolioAbstract> findPortfolioAbstractByUserIdx(long userIdx);
    Optional<PortfolioAbstract> findByUserIdx(User user);
}
