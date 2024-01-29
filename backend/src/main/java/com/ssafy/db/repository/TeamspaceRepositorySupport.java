package com.ssafy.db.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.api.teamspace.response.TeamspaceMemberListRes;
import com.ssafy.db.entity.QTeamspace;
import com.ssafy.db.entity.QUser;
import com.ssafy.db.entity.Teamspace;
import com.ssafy.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.db.entity.QTeamspaceMember.teamspaceMember;

@Repository
public class TeamspaceRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QTeamspace qTeamspace = QTeamspace.teamspace;
    QUser qUser = QUser.user;

    public List<TeamspaceMemberListRes> findTeamspaceMemberList(Teamspace teamspaceIdx) {
        List<TeamspaceMemberListRes> users = jpaQueryFactory
                .select(Projections.bean(TeamspaceMemberListRes.class, qUser.userIdx, qUser.birth, qUser.emailDomain, qUser.emailId, qUser.gender, qUser.name, qUser.nickname))
                .from(teamspaceMember)
                .join(qUser).on(teamspaceMember.userIdx.eq(qUser))
                .where(teamspaceMember.teamspaceIdx.eq(teamspaceIdx))
                .fetch();

        return users; // 결과 반환
    }
}
