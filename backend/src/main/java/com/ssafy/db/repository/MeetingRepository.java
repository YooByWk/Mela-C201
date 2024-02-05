package com.ssafy.db.repository;

import com.ssafy.db.entity.Meeting;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, String> {
    List<Meeting> findByConsultantEmailId(User consultantEmailId);

}
