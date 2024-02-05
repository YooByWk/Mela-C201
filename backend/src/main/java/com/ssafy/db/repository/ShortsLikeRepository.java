package com.ssafy.db.repository;

import com.ssafy.db.entity.Shorts;
import com.ssafy.db.entity.ShortsLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShortsLikeRepository extends JpaRepository<ShortsLike, Long> {
}
