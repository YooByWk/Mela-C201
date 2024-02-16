package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QTeamspaceFile;
import com.ssafy.db.entity.Teamspace;
import com.ssafy.db.entity.TeamspaceFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.db.entity.QTeamspaceFile.teamspaceFile;

@Repository
public class TeamspaceFileRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QTeamspaceFile qTeamspaceFile = teamspaceFile;

    public List<TeamspaceFile> getFileListByTeamspaceIdx(Teamspace teamspace) {
        List<TeamspaceFile> teamspaceFileList = jpaQueryFactory.select(qTeamspaceFile).from(teamspaceFile).where(teamspaceFile.teamspaceIdx.eq(teamspace)).fetch();

        return teamspaceFileList;
    }
}
