package com.ssafy.db.repository;

import com.ssafy.db.entity.EmailAuth;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface EmailAuthRepository extends JpaRepository<EmailAuth, Long> {

//    Optional<EmailAuth> findByUserIdx(Long userIdx);
    Optional<EmailAuth> findByUserIdx(User userIdx);

}
