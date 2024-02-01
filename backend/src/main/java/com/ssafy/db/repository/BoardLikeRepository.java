package com.ssafy.db.repository;

import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.BoardLike;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {
    Optional<BoardLike> findByUserIdxAndBoardIdx(User userIdx, Board boardIdx);
    int countByBoardIdx(Board boardIdx);

}
