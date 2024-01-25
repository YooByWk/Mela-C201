package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QTeamspace;
import com.ssafy.db.entity.QUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TeamspaceRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QTeamspace qUser = QTeamspace.teamspace;
}
