package com.ssafy.db.repository;

import com.ssafy.db.entity.Shorts;
import com.ssafy.db.entity.ShortsLike;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShortsLikeRepository extends JpaRepository<ShortsLike, Long> {
    Optional<List<Shorts>> findShortsIdxByUserIdx(User userIdx);

    Optional<ShortsLike>  findByShortsIdxAndUserIdx(Shorts shortsIdx, User userIdx);

    Optional<List<ShortsLike>> findByUserIdxAndUploaderUserIdx(User userIdx, User uploaderUserIdx);

}
