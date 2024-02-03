package com.ssafy.db.repository;

import com.ssafy.db.entity.BoardRecruit;
import com.ssafy.db.entity.BoardRecruitPosition;
import com.ssafy.db.entity.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRecruitPositionRepository extends JpaRepository<BoardRecruitPosition, Long> {
    List<BoardRecruitPosition> findByBoardRecruitIdx(BoardRecruit boardRecruitIdx);
    Optional<BoardRecruitPosition> findByBoardRecruitIdxAndPositionIdx(BoardRecruit boardRecruitIdx, Position positionIdx);
}
