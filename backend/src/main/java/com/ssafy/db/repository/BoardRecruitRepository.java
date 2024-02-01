package com.ssafy.db.repository;

import com.ssafy.db.entity.BoardRecruit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRecruitRepository extends JpaRepository<BoardRecruit, Long> {
}
