package com.ssafy.api.teamspace.controller;

import com.ssafy.api.teamspace.service.TeamspaceService;
import com.ssafy.api.user.request.UserRegisterPostReq;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Api(value = "팀스페이스 API", tags = {"Teamspace"})
@RestController
@RequestMapping("/teamspaces")
public class TeamspaceController {
//    @Autowired
//    TeamspaceService teamspaceService;

    @PostMapping()
    @ApiOperation(value = "팀스페이스 생성", notes = "<strong>를</strong>를 통해 팀스페이스를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {

        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
//        User user = userService.createUser(registerInfo);
//        user.setUserType("unauth");

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
