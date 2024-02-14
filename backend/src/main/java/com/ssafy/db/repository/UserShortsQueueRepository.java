package com.ssafy.db.repository;

import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserShortsQueue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * 쇼츠 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
public interface UserShortsQueueRepository extends JpaRepository<UserShortsQueue, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.
    List<UserShortsQueue> findByUserIdx(User user);

    @Query("SELECT usq FROM UserShortsQueue usq " +
            "WHERE usq.userIdx = :userIdx LIMIT 1 ")
    UserShortsQueue getSingleRecord(@Param("userIdx") User userIdx);
}
