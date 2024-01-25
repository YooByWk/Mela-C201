package com.ssafy.api.teamspace.service;

import com.ssafy.api.teamspace.request.TeamspaceRegisterPostReq;
import com.ssafy.db.entity.Teamspace;
import com.ssafy.db.repository.TeamspaceRepository;
import com.ssafy.db.repository.TeamspaceRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("teamspaceService")
public class TeamspaceServiceImpl implements TeamspaceService{

    @Autowired
    TeamspaceRepository teamspaceRepository;

    @Autowired
    TeamspaceRepositorySupport teamspaceRepositorySupport;

    @Override
    public Teamspace createTeamspace(TeamspaceRegisterPostReq registerInfo) {
        Teamspace teamspace = new Teamspace();
        teamspace.setTeamName(registerInfo.getTeamName());
        teamspace.setStartDate(registerInfo.getStartDate());
        teamspace.setEndDate(registerInfo.getEndDate());
        teamspace.setHost(registerInfo.getHost());
        return null;
    }
}
