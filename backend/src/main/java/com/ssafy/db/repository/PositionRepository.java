package com.ssafy.db.repository;

import com.ssafy.db.entity.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {
    Optional<Position> findByPositionName(String positionName);

    //FIXME: 테스트 중!
    @Modifying
//    @Query(value = "INSERT INTO Position (positionIdx, positionName) " +
    @Query(value = "INSERT INTO Position (position_idx, position_name) " +
            "VALUES ('1', '보컬'), ('2', '작곡'), ('3', '작사'), ('4', '세션'), ('5', '믹싱'), ('6', '기타')", nativeQuery = true)
    @Transactional
    void init();

//    @Modifying
//    @Query(value = "INSERT INTO Position (positionIdx, positionName) " +
//            "VALUES (1, '보컬'), (2, '작곡'), (3, '작사'), (4, '세션'), (5, '믹싱'), (6, '기타')", nativeQuery = true)
//    @Transactional
//    void init();

    /*
    @Query(value = "INSERT INTO Position (positionIdx, positionName) SELECT 1, '보컬'; SELECT 2, '작곡'; SELECT 3, '작사'", nativeQuery = true)
    void init();
     */

    /*
    @Query("INSERT INTO Position (positionIdx, positionName) " +
//            "VALUES (1, '보컬'), (2, '작곡'), (3, '작사'), (4, '세션'), (5, '믹싱'), (6, '기타')")
            "VALUES (1, '보컬'), (2, '작곡'), (3, '작사'), (4, '세션'), (5, '믹싱'), (6, '기타'), nativeQuery = true")
    void init();
     */
}