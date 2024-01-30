package com.ssafy.db.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.api.teamspace.response.TeamspaceListRes;
import com.ssafy.api.teamspace.response.TeamspaceMemberListRes;
import com.ssafy.api.teamspace.response.TeamspaceRes;
import com.ssafy.api.user.response.UserRes;
import com.ssafy.db.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.db.entity.QTeamspace.teamspace;
import static com.ssafy.db.entity.QTeamspaceMember.teamspaceMember;
import static com.ssafy.db.entity.QUser.user;

@Repository
public class TeamspaceRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QTeamspace qTeamspace = teamspace;
    QTeamspaceMember qTeamspaceMember = teamspaceMember;
    QUser qUser = user;

    public List<Teamspace> findTeamspaceList(User userIdx) {
        List<Teamspace> teamspaces = jpaQueryFactory
                .select(qTeamspace)
                .from(teamspace)
                .join(teamspaceMember).on(teamspace.teamspaceIdx.eq(qTeamspaceMember.teamspaceIdx.teamspaceIdx))
                .join(teamspaceMember).on(teamspaceMember.teamspaceIdx.eq(teamspace))
                .join(user).on(teamspaceMember.userIdx.eq(userIdx))
                .where(user.userIdx.eq(userIdx.getUserIdx()))
                .fetch();

        return teamspaces;
    }

    public List<TeamspaceMemberListRes> findTeamspaceMemberList(Teamspace teamspaceIdx) {
        List<TeamspaceMemberListRes> users = jpaQueryFactory
                .select(Projections.bean(TeamspaceMemberListRes.class, qUser.userIdx, qUser.birth, qUser.emailDomain, qUser.emailId, qUser.gender, qUser.name, qUser.nickname))
                .from(qTeamspaceMember)
                .join(qUser).on(qTeamspaceMember.userIdx.eq(qUser))
                .where(qTeamspaceMember.teamspaceIdx.eq(teamspaceIdx))
                .fetch();

        return users; // 결과 반환
    }
}
