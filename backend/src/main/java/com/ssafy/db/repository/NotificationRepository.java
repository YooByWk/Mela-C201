package com.ssafy.db.repository;

import com.ssafy.db.entity.Notification;
import com.ssafy.db.entity.PortfolioMusic;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    Optional<List<Notification>> findByUserIdx(User userIdx);

    Optional<Notification> findByNotificationIdxAndUserIdx(Long notificationIdx, User userIdx);

    void deleteByNotificationIdxAndUserIdx(Long notificationIdx, User userIdx);


}
