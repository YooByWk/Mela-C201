package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QTeamspaceMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TeamspaceMemberRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QTeamspaceMember qTeamspaceMember = QTeamspaceMember.teamspaceMember;
}
