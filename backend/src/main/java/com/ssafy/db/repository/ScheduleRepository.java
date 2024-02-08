package com.ssafy.db.repository;

import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.Teamspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByTeamspaceIdxOrderByStartTime(Teamspace teamspaceIdx);
    List<Schedule> findByEndTimeGreaterThanOrderByStartTime(LocalDateTime endTime);
}
