package com.ssafy.api.teamspace.service;

import com.ssafy.api.teamspace.request.TeamspaceRegisterPostReq;
import com.ssafy.api.teamspace.request.TeamspaceUpdatePutReq;
import com.ssafy.db.entity.Teamspace;
import com.ssafy.db.repository.FileRepository;
import com.ssafy.db.repository.FileRepositorySupport;
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

    @Autowired
    FileRepository fileRepository;
    @Autowired
    FileRepositorySupport fileRepositorySupport;

    @Override
    public Teamspace createTeamspace(TeamspaceRegisterPostReq registerInfo) {
        // 팀 스페이스 썸네일 저장
        // 팀 스페이스 썸네일 사진 파일 idx 얻기
        // ...


        // 팀 스페이스 생성
        Teamspace teamspace = new Teamspace();
        teamspace.setTeamName(registerInfo.getTeamName());
        teamspace.setStartDate(registerInfo.getStartDate());
        teamspace.setEndDate(registerInfo.getEndDate());
        teamspace.setHost(registerInfo.getHost());
        teamspace.setTeamDescription(registerInfo.getTeamDescription());
        teamspace.setTeamspace_picture_file_idx(registerInfo.getTeamspace_picture_file_idx());
        return teamspaceRepository.save(teamspace);
    }

    @Override
    public Teamspace getTeamspaceById(Long id) {
        Teamspace teamspace = teamspaceRepository.getOne(id);

        return teamspace;
    }

    @Override
    public Teamspace updateTeamspace(Teamspace teamspace, TeamspaceUpdatePutReq updateInfo) {
        // 파일 삭제
        if (teamspace.getTeamspace_picture_file_idx() != null) {
            fileRepository.delete(teamspace.getTeamspace_picture_file_idx());
        }
        if(teamspace.getTeamspace_background_picture_file_idx() != null) {
            fileRepository.delete(teamspace.getTeamspace_background_picture_file_idx());
        }

        // 사진 파일 저장
        // ...
        // 사진 파일 idx 얻어서 그 값으로 변경해줘야 함

        // 팀스페이스 정보 수정
        teamspace.setTeamName(updateInfo.getTeamName());
        teamspace.setStartDate(updateInfo.getStartDate());
        teamspace.setEndDate(updateInfo.getEndDate());
        teamspace.setTeamDescription(updateInfo.getTeamDescription());
        teamspace.setTeamspace_picture_file_idx(updateInfo.getTeamspace_picture_file_idx());
        teamspace.setTeamspace_background_picture_file_idx(updateInfo.getTeamspace_background_picture_file_idx());

        return teamspaceRepository.save(teamspace);
    }

    @Override
    public void deleteTeamspace(Teamspace teamspace) {
        teamspaceRepository.delete(teamspace);
    }


}
