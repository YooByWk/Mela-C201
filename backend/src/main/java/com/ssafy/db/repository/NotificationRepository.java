package com.ssafy.db.repository;

import com.ssafy.db.entity.Notification;
import com.ssafy.db.entity.PortfolioMusic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
