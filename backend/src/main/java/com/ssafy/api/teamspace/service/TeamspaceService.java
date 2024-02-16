package com.ssafy.api.teamspace.service;

import com.ssafy.api.teamspace.request.ScheduleRegisterPostReq;
import com.ssafy.api.teamspace.request.ScheduleUpdatePutReq;
import com.ssafy.api.teamspace.request.TeamspaceRegisterPostReq;
import com.ssafy.api.teamspace.request.TeamspaceUpdatePutReq;
import com.ssafy.api.teamspace.response.TeamspaceMemberListRes;
import com.ssafy.db.entity.Meeting;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.Teamspace;
import com.ssafy.db.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.persistence.EntityNotFoundException;
import java.util.List;

public interface TeamspaceService {
    Teamspace createTeamspace(TeamspaceRegisterPostReq registerInfo, Long userIdx, MultipartFile teamspacePicture, MultipartFile teamspaceBackgroundPicture, User user);
    Teamspace getTeamspaceById(Long id) throws Exception;
    Teamspace updateTeamspace(Teamspace teamspace, TeamspaceUpdatePutReq updateInfo, MultipartFile teamspacePicture, MultipartFile teamspaceBackgroundPicture, User user);
    void deleteTeamspace(Teamspace teamspace);
    List<Teamspace> getTeamspaceList(Long userIdx);
    void addMember(Long teamspaceIdx, Long userIdx);
    void leaveTeamspace(Long teamspaceIdx, Long userIdx);
    List<TeamspaceMemberListRes> getTeamspaceMemberList(Long teamspaceIdx);

    void addSchedule(ScheduleRegisterPostReq registInfo, Long teamspaceIdx) throws Exception;
    void deleteSchedule(Long scheduleId);
    void updateSchedule(ScheduleUpdatePutReq updateInfo, Long scheduleIdx) throws EntityNotFoundException;
    List<Schedule> getScheduleList(Long teamspaceIdx);
    List<Schedule> getScheduleListNotPassed(Long teamspaceIdx);
    Schedule getSchedule(Long scheduleIdx);
    List<Schedule> getTodaySchedule(Long teamspaceIdx);

    void uploadFile(long teamspaceid, MultipartFile[] multipartFiles, String fileDescription, User user);
    List<com.ssafy.db.entity.File> getFileListByTeamspaceIdx(Teamspace teamspace);
    Teamspace findById(Long teamspaceIdx);

    void updateTeamspaceOpenViduSessionId(Long teamspaceIdx, String sessionId);
}
