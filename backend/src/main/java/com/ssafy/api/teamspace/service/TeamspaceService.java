package com.ssafy.api.teamspace.service;

import com.ssafy.api.teamspace.request.TeamspaceRegisterPostReq;
import com.ssafy.api.teamspace.request.TeamspaceUpdatePutReq;
import com.ssafy.db.entity.Teamspace;

public interface TeamspaceService {
    Teamspace createTeamspace(TeamspaceRegisterPostReq registerInfo);

    Teamspace getTeamspaceById(Long id) throws Exception;

    Teamspace updateTeamspace(Teamspace teamspace, TeamspaceUpdatePutReq updateInfo);

    void deleteTeamspace(Teamspace teamspace);
}
