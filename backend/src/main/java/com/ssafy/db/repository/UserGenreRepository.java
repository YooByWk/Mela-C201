package com.ssafy.db.repository;

import com.ssafy.db.entity.Genre;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserGenreRepository extends JpaRepository<UserGenre, Long> {
    Optional<List<Genre>> findGenreIdxByUserIdx(User userIdx);
}
