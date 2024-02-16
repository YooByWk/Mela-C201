package com.ssafy.db.repository;

import com.ssafy.db.entity.Feed;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {
    Optional<Feed> findByUserIdx(User user);
}
