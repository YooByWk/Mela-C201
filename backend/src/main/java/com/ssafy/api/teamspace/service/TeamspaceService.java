package com.ssafy.api.teamspace.service;

import com.ssafy.api.teamspace.request.ScheduleRegisterPostReq;
import com.ssafy.api.teamspace.request.ScheduleUpdatePutReq;
import com.ssafy.api.teamspace.request.TeamspaceRegisterPostReq;
import com.ssafy.api.teamspace.request.TeamspaceUpdatePutReq;
import com.ssafy.api.teamspace.response.TeamspaceListRes;
import com.ssafy.api.teamspace.response.TeamspaceMemberListRes;
import com.ssafy.api.teamspace.response.TeamspaceRes;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.Teamspace;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.List;

public interface TeamspaceService {
    Teamspace createTeamspace(TeamspaceRegisterPostReq registerInfo, Long userIdx, MultipartFile teamspacePicture, MultipartFile teamspaceBackgroundPicture);

    Teamspace getTeamspaceById(Long id) throws Exception;

    Teamspace updateTeamspace(Teamspace teamspace, TeamspaceUpdatePutReq updateInfo);

    void deleteTeamspace(Teamspace teamspace);

    List<Teamspace> getTeamspaceList(Long userIdx);

    void addMember(Long teamspaceIdx, Long userIdx);

    void leaveTeamspace(Long teamspaceIdx, Long userIdx);

    List<TeamspaceMemberListRes> getTeamspaceMemberList(Long teamspaceIdx);

    void addSchedule(ScheduleRegisterPostReq registInfo, Long teamspaceIdx) throws Exception;

    void deleteSchedule(Long scheduleId);

    void updateSchedule(ScheduleUpdatePutReq updateInfo, Long scheduleIdx) throws EntityNotFoundException;

    List<Schedule> getScheduleList(Long teamspaceIdx);
}
