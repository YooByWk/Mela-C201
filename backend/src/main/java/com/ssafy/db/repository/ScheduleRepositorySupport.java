package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QSchedule;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.Teamspace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public class ScheduleRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QSchedule qSchedule = QSchedule.schedule;

    public List<Schedule> findTodaySchedule(Teamspace teamspaceIdx) {
        LocalDate localDate = LocalDate.now();
        List<Schedule> schedules = jpaQueryFactory
                .selectFrom(qSchedule)
                .where(qSchedule.startTime.loe(localDate.atStartOfDay()),
                        qSchedule.endTime.goe(localDate.atStartOfDay()),
                        qSchedule.teamspaceIdx.eq(teamspaceIdx))
                .orderBy(qSchedule.startTime.asc())
                .fetch();

        return schedules;
    }
}
