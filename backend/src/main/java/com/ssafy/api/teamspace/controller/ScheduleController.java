package com.ssafy.api.teamspace.controller;

import com.ssafy.api.teamspace.request.ScheduleRegisterPostReq;
import com.ssafy.api.teamspace.request.ScheduleUpdatePutReq;
import com.ssafy.api.teamspace.response.ScheduleRes;
import com.ssafy.api.teamspace.service.TeamspaceService;
import com.ssafy.api.user.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Schedule;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Api(value = "팀스페이스 API", tags = {"Schedule"})
@RestController
@RequestMapping("api/v1/teamspaces")
public class ScheduleController {
    @Autowired
    TeamspaceService teamspaceService;

    @Autowired
    UserService userService;


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
    @ApiOperation(value = "일정 목록", notes ="<string>팀스페이스 아이디<strong>를 통해 일정 목록을 얻는다. 시작날짜 순서 정렬")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "잘못된 요청"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ScheduleRes>> getScheduleList(
            @PathVariable(name = "teamspaceid") Long teamspaceIdx
    ) {
        try {
            List<Schedule> schedules = teamspaceService.getScheduleList(teamspaceIdx);
            List<ScheduleRes> res = new ArrayList<>();
            for(Schedule schedule : schedules) {
                res.add(ScheduleRes.of(schedule));
            }

            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }

    @GetMapping(value = "/{teamspaceid}/schedules/upcoming")
    @ApiOperation(value = "지나가지 않은 일정 목록", notes ="<string>팀스페이스 아이디<strong>를 통해 지나가지 않은 일정 목록을 얻는다. 시작날짜 순서 정렬")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "잘못된 요청"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ScheduleRes>> getScheduleListNotPassed(
            @PathVariable(name = "teamspaceid") Long teamspaceIdx
    ) {
        try {
            List<Schedule> schedules = teamspaceService.getScheduleListNotPassed(teamspaceIdx);
            List<ScheduleRes> res = new ArrayList<>();
            for(Schedule schedule : schedules) {
                res.add(ScheduleRes.of(schedule));
            }

            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }

    @GetMapping(value = "/{teamspaceid}/schedules/today")
    @ApiOperation(value = "오늘 일정 목록", notes ="<string>팀스페이스 아이디<strong>를 통해 지나가지 않은 일정 목록을 얻는다. 시작날짜 순서 정렬")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "잘못된 요청"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ScheduleRes>> getTodayScheduleList(
            @PathVariable(name = "teamspaceid") Long teamspaceIdx
    ) {
        try {
            List<Schedule> schedules = teamspaceService.getTodaySchedule(teamspaceIdx);
            List<ScheduleRes> res = new ArrayList<>();
            for(Schedule schedule : schedules) {
                res.add(ScheduleRes.of(schedule));
            }

            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }

    @GetMapping(value = "/{teamspaceid}/schedules/{scheduleid}")
    @ApiOperation(value = "일정 단건 조회", notes ="<string>일정 아이디<strong>를 통해 일정을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "잘못된 요청"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ScheduleRes> getSchedule(
            @PathVariable(name = "scheduleid") Long scheduleidIdx
    ) {
        Schedule schedule = teamspaceService.getSchedule(scheduleidIdx);

        return ResponseEntity.status(200).body(ScheduleRes.of(schedule));

    }
}
