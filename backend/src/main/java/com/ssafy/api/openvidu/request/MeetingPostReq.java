package com.ssafy.api.openvidu.request;

import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("MeetingPostRequest")
public class MeetingPostReq {

    @ApiModelProperty(value = "세션아이디")
    private String sessionId;
    @ApiModelProperty(value = "컨설턴트아이디")
    private User consultantId;
    @ApiModelProperty(value = "미팅룸 인원")
    private int numberOfPeople;
    @ApiModelProperty(value = "미팅룸 생성날짜")
    private LocalDateTime meetingRegisterTime;

}