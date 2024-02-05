package com.ssafy.db.repository;

import com.ssafy.db.entity.Shorts;
import com.ssafy.db.entity.ShortsDislike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShortsDislikeRepository extends JpaRepository<ShortsDislike, Long> {
}
