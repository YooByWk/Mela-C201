package com.ssafy.db.repository;

import com.ssafy.db.entity.Position;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserPositionRepository extends JpaRepository<UserPosition, Long> {
    Optional<List<Position>> findPositionIdxByUserIdx(User userIdx);
}
