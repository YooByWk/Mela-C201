package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QSchedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ScheduleRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QSchedule qSchedule = QSchedule.schedule;
}
