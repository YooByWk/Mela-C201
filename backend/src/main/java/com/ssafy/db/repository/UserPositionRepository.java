package com.ssafy.db.repository;

import com.ssafy.db.entity.Position;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserPositionRepository extends JpaRepository<UserPosition, Long> {
    List<UserPosition> findPositionIdxByUserIdx(User userIdx);

    @Modifying
    @Query("DELETE FROM UserPosition up WHERE up.userIdx = :user")
    void deleteAllRecordsByUserIdx(@Param("user") User user);
}
