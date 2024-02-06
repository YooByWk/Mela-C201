package com.ssafy.db.repository;

import com.ssafy.db.entity.Position;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserPosition;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserPositionRepository {
    Optional<List<Position>> findPositionIdxByUserIdx(User userIdx);
}
