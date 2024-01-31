package com.ssafy.api.teamspace.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("ScheduleRegisterPostRequest")
public class ScheduleRegisterPostReq {
    @ApiModelProperty(name="시작 시간", example="yyyy-MM-dd HH:mm:ss")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    LocalDateTime startTime;

    @ApiModelProperty(name="종료 시간", example="yyyy-MM-dd HH:mm:ss")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    LocalDateTime endTime;

    @ApiModelProperty(name="내용", example="스케쥴 내용")
    String content;

    @ApiModelProperty(name="장소", example="장소")
    String place;
}
