package com.ssafy.api.teamspace.service;

import com.ssafy.api.teamspace.request.TeamspaceRegisterPostReq;
import com.ssafy.db.entity.Teamspace;

public interface TeamspaceService {
    Teamspace createTeamspace(TeamspaceRegisterPostReq registerInfo);
}
