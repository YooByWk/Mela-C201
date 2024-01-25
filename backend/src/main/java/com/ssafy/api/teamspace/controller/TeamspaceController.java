package com.ssafy.api.teamspace.controller;

import com.ssafy.api.teamspace.request.TeamspaceRegisterPostReq;
import com.ssafy.api.teamspace.request.TeamspaceUpdatePutReq;
import com.ssafy.api.teamspace.service.TeamspaceService;
import com.ssafy.api.user.request.UserRegisterPostReq;
import com.ssafy.api.user.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Teamspace;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

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
    @ApiOperation(value = "팀스페이스 생성", notes = "<strong>를</strong>를 통해 팀스페이스를 생성한다.")
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

        registerInfo.setHost(user);
        Teamspace teamspace = teamspaceService.createTeamspace(registerInfo);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PutMapping("/{teamspaceid}")
    @ApiOperation(value = "팀스페이스 정보 수정", notes = "<strong>이름, 시작일, 종료일, </strong>를 통해 팀스페이스를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 팀스페이스"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends  BaseResponseBody> updateTeamspace(
            @RequestBody @ApiParam(value="회원가입 정보", required = true) TeamspaceUpdatePutReq updateInfo,
            @PathVariable(name = "teamspaceid") String teamspaceId
    ) {
        try{
            // 여기서 teamspace 조회 안되면 어떤 값 나오는지?
            Teamspace teamspace = teamspaceService.getTeamspaceById(Long.valueOf(teamspaceId));
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
}
