package com.ssafy.db.repository;

import com.ssafy.db.entity.Shorts;
import com.ssafy.db.entity.ShortsDislike;
import com.ssafy.db.entity.ShortsLike;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShortsDislikeRepository extends JpaRepository<ShortsDislike, Long> {
//    Optional<List<Shorts>> findShortsIdxByUserIdx(User userIdx);
//    List<Shorts> findShortsIdxByUserIdx(User userIdx);
    List<ShortsDislike> findShortsIdxByUserIdx(User userIdx);


    Optional<ShortsDislike>  findByShortsIdxAndUserIdx(Shorts shortsIdx, User userIdx);
}
