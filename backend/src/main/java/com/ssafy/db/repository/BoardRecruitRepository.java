package com.ssafy.db.repository;

import com.ssafy.db.entity.BoardRecruit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRecruitRepository extends JpaRepository<BoardRecruit, Long> {

    Optional<BoardRecruit> findByBoardIdx(Long boardIdx);

    @Query("SELECT br FROM Board b " +
            "JOIN BoardRecruit br " +
            "ON b.boardIdx = br.boardIdx " +
            "WHERE (:keyword IS NULL OR b.title LIKE %:keyword% OR b.content LIKE %:keyword%)")
    Page<BoardRecruit> findByTitleContainingOrContentContaining(@Param("keyword") String keyword, Pageable pageable);
}
