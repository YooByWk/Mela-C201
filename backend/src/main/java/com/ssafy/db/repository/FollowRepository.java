package com.ssafy.db.repository;

import com.ssafy.db.entity.Follow;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    Optional<Follow> findByFollowerAndFollowe(User nowLoginUser, User followedUser);
}
