package com.ssafy.api.teamspace.controller;

import com.querydsl.core.Tuple;
import com.ssafy.api.teamspace.request.ScheduleRegisterPostReq;
import com.ssafy.api.teamspace.request.ScheduleUpdatePutReq;
import com.ssafy.api.teamspace.request.TeamspaceRegisterPostReq;
import com.ssafy.api.teamspace.request.TeamspaceUpdatePutReq;
import com.ssafy.api.teamspace.response.TeamspaceListRes;
import com.ssafy.api.teamspace.response.TeamspaceMemberListRes;
import com.ssafy.api.teamspace.response.TeamspaceRes;
import com.ssafy.api.teamspace.service.TeamspaceService;
import com.ssafy.api.user.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.Teamspace;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Slf4j
@Api(value = "팀스페이스 API", tags = {"Teamspace"})
@RestController
@RequestMapping("api/v1/teamspaces")
public class TeamspaceController {
    @Autowired
    TeamspaceService teamspaceService;

    @Autowired
    UserService userService;

    @PostMapping()
    @ApiOperation(value = "팀스페이스 생성", notes = "<strong>팀스페이스 이름, 시작일, 종료일, 팀스페이스 설명, 썸네일을</strong>를 통해 팀스페이스를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value="팀스페이스 생성 정보", required = true) TeamspaceRegisterPostReq registerInfo,
            @ApiIgnore Authentication authentication) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();

        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);

        Teamspace teamspace = teamspaceService.createTeamspace(registerInfo, user.getUserIdx());

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PutMapping("/{teamspaceid}")
    @ApiOperation(value = "팀스페이스 정보 수정", notes = "<strong>팀스페이스 이름, 시작일, 종료일, 팀스페이스 설명, 배경 이미지, 썸네일 그리고 팀스페이스 인덱스</strong>정보를 보내 팀스페이스 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 팀스페이스"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends  BaseResponseBody> updateTeamspace(
            @RequestBody @ApiParam(value="회원가입 정보", required = true) TeamspaceUpdatePutReq updateInfo,
            @PathVariable(name = "teamspaceid") Long teamspaceId
    ) {
        try{
            // 여기서 teamspace 조회 안되면 어떤 값 나오는지? // 후기 기다리는 중입니다.
            Teamspace teamspace = teamspaceService.getTeamspaceById(teamspaceId);
            teamspaceService.updateTeamspace(teamspace, updateInfo);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(404, "not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @DeleteMapping("/{teamspaceid}")
    @ApiOperation(value = "팀스페이스 삭제", notes ="<string>팀스페이스 아이디<strong>를 통해 팀스페이스를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 팀스페이스"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteTeamspace(
            @PathVariable(name = "teamspaceid") String teamspaceId
    ) {
        try {
            Teamspace teamspace = teamspaceService.getTeamspaceById(Long.valueOf(teamspaceId));
            teamspaceService.deleteTeamspace(teamspace);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(404, "not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @GetMapping(value = "/{teamspaceid}", name = "teamspaceId")
    @ApiOperation(value = "팀스페이스 정보 조회", notes ="<string>팀스페이스 아이디<strong>를 통해 팀스페이스 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 팀스페이스"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<TeamspaceRes> getTeamspace(@PathVariable String teamspaceId) {
        Teamspace teamspace = null;
        try {
            teamspace = teamspaceService.getTeamspaceById(Long.valueOf(teamspaceId));

            return ResponseEntity.status(200).body(TeamspaceRes.of(teamspace));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping()
    @ApiOperation(value = "내 팀스페이스 목록 조회", notes ="<string>유저 아이디<strong>를 통해 내 팀스페이스 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Teamspace>> getTeamspaceList(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();

        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);

        List<Teamspace> teamspaceList = teamspaceService.getTeamspaceList(user.getUserIdx());

        return ResponseEntity.status(200).body(teamspaceList);
    }

    @PostMapping(value = "/{teamspaceid}/users/{userid}")
    @ApiOperation(value = "팀원 추가", notes ="<string>팀스페이스 아이디, 유저 이메일 아이디<strong>를 통해 팀스페이스에 초대한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 팀스페이스"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> addMember(
            @PathVariable(name = "teamspaceid") String teamspaceId,
            @PathVariable(name = "userid") String userId
    ) {
        User user = userService.getUserByEmailId(userId);

        try {
            teamspaceService.addMember(Long.valueOf(teamspaceId), user.getUserIdx());

            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "not found"));
        }
    }

    @DeleteMapping(value = "/{teamspaceid}/users")
    @ApiOperation(value = "팀스페이스 탈퇴", notes ="<string>팀스페이스 아이디, 유저아이디<strong>를 통해 팀스페이스를 탈퇴한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 팀스페이스"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> leaveTeamspace(
            @PathVariable(name = "teamspaceid") String teamspaceId,
            @ApiIgnore Authentication authentication
    ) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();

        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);

        try {
            teamspaceService.leaveTeamspace(Long.valueOf(teamspaceId), user.getUserIdx());

            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "not found"));
        }
    }

    @GetMapping("/{teamspaceid}/users")
    @ApiOperation(value = "팀스페이스 멤버 조회", notes ="<string>팀스페이스 아이디<strong>를 통해 팀스페이스 멤버를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 팀스페이스"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<TeamspaceMemberListRes>> getTeamspaceMember(
            @PathVariable(name = "teamspaceid") Long teamspaceIdx
    ) {
        List<TeamspaceMemberListRes> users = teamspaceService.getTeamspaceMemberList(teamspaceIdx);

        return ResponseEntity.status(200).body(users);
    }

    @PostMapping(value = "/{teamspaceid}/schedules")
    @ApiOperation(value = "일정 추가", notes ="<string>내용, 장소, 시작시간, 종료시간<strong>을 통해 일정을 추가한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "잘못된 요청"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
        public ResponseEntity<? extends BaseResponseBody> addSchedule(
            @RequestBody @ApiParam(value="일정 정보", required = true) ScheduleRegisterPostReq registInfo,
            @PathVariable(name = "teamspaceid") Long teamspaceId
    ) {
        try {
            teamspaceService.addSchedule(registInfo, teamspaceId);

            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "bad request"));
        }

    }

    @PutMapping(value = "/{teamspaceid}/schedules/{scheduleid}")
    @ApiOperation(value = "일정 수정", notes ="<string>내용, 장소, 시작시간, 종료시간<strong>을 통해 일정을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 일정"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateSchedule(
            @RequestBody @ApiParam(value="일정 정보", required = true) ScheduleUpdatePutReq updateInfo,
            @PathVariable(name = "scheduleid") Long scheduleIdx
    ) {
        try {
            teamspaceService.updateSchedule(updateInfo, scheduleIdx);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "not found"));
        }

    }

    @DeleteMapping(value = "/{teamspaceid}/schedules/{scheduleid}")
    @ApiOperation(value = "일정 삭제", notes ="<string>일정 아이디<strong>를 통해 일정을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 팀스페이스"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteSchedule(
            @PathVariable(name = "scheduleid") Long scheduleIdx
    ) {
        try {
            teamspaceService.deleteSchedule(scheduleIdx);

            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "not found"));
        }
    }

    @GetMapping(value = "/{teamspaceid}/schedules")
    @ApiOperation(value = "일정 목록", notes ="<string>팀스페이스 아이디<strong>를 통해 일정 목록을 얻는다. 정렬X")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "잘못된 요청"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Schedule>> getScheduleList(
            @PathVariable(name = "teamspaceid") Long teamspaceIdx
    ) {
        try {
            List<Schedule> schedules = teamspaceService.getScheduleList(teamspaceIdx);

            return ResponseEntity.status(200).body(schedules);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }

    @GetMapping(value = "/{teamspaceid}/schedules/{schdulesid}")
    @ApiOperation(value = "일정 단건 조회 (지원X)", notes ="<string>일정 아이디<strong>를 통해 일정을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "잘못된 요청"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Schedule> getSchedule(
            @PathVariable(name = "schdulesid") Long schdulesIdx
    ) {

            return ResponseEntity.status(200).body(null);

    }
}
