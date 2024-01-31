package com.ssafy.api.teamspace.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.db.entity.Schedule;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("ScheduleResponse")
public class ScheduleRes {
    @ApiModelProperty(name="schedule idx", example = "1")
    Long scheduleIdx;

    @ApiModelProperty(name="teamspace idx", example = "1")
    Long teamspaceIdx;

    @ApiModelProperty(name="schedule 시작시간", example = "2000-02-02 22:22:22")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    LocalDateTime startTime;

    @ApiModelProperty(name="schedule 끝나는시간", example = "2000-02-02 22:22:22")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    LocalDateTime endTime;

    @ApiModelProperty(name="schedule 내용", example = "내용")
    String content;

    @ApiModelProperty(name="schedule 장소", example = "장소")
    String place;

    public static ScheduleRes of(Schedule schedule) {
        ScheduleRes res = new ScheduleRes();
        res.setScheduleIdx(schedule.getScheduleIdx());
        res.setTeamspaceIdx(schedule.getTeamspaceIdx().getTeamspaceIdx());
        res.setContent(schedule.getContent());
        res.setPlace(schedule.getPlace());
        res.setStartTime(schedule.getStartTime());
        res.setEndTime(schedule.getEndTime());
        return res;
    }
}
