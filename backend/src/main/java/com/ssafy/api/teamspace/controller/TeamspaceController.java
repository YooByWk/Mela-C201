package com.ssafy.api.teamspace.controller;

import com.ssafy.api.file.service.FileService;
import com.ssafy.api.teamspace.request.TeamspaceRegisterPostReq;
import com.ssafy.api.teamspace.request.TeamspaceUpdatePutReq;
import com.ssafy.api.teamspace.response.TeamspaceMemberListRes;
import com.ssafy.api.teamspace.response.TeamspaceRes;
import com.ssafy.api.teamspace.service.TeamspaceService;
import com.ssafy.api.user.request.FilePostReq;
import com.ssafy.api.user.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Teamspace;
import com.ssafy.db.entity.TeamspaceFile;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.TeamspaceFileRepository;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@Slf4j
@Api(value = "팀스페이스 API", tags = {"Teamspace"})
@RestController
@RequestMapping("api/v1/teamspaces")
public class TeamspaceController {
    @Autowired
    TeamspaceService teamspaceService;

    @Autowired
    UserService userService;

    @Autowired
    FileService fileService;

    @Autowired
    TeamspaceFileRepository teamspaceFileRepository;

    @PostMapping(consumes = MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "팀스페이스 생성", notes = "<strong>팀스페이스 이름, 시작일, 종료일, 팀스페이스 설명, 썸네일을</strong>를 통해 팀스페이스를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestPart @ApiParam(value="팀스페이스 생성 정보", required = true) TeamspaceRegisterPostReq registerInfo,
            @ApiIgnore Authentication authentication,
            @RequestPart(required = false) MultipartFile teamspacePicture,
            @RequestPart(required = false) MultipartFile teamspaceBackgroundPicture) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();

        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);

        Teamspace teamspace = teamspaceService.createTeamspace(registerInfo, user.getUserIdx(), teamspacePicture, teamspaceBackgroundPicture);

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
            @RequestBody @ApiParam(value="팀스페이스 수정 정보", required = true) TeamspaceUpdatePutReq updateInfo,
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
            @PathVariable(name = "teamspaceid") Long teamspaceId
    ) {
        try {
            Teamspace teamspace = teamspaceService.getTeamspaceById(teamspaceId);
            teamspaceService.deleteTeamspace(teamspace);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(404, "not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @GetMapping(value = "/{teamspaceid}")
    @ApiOperation(value = "팀스페이스 정보 조회", notes ="<string>팀스페이스 아이디<strong>를 통해 팀스페이스 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 팀스페이스"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<TeamspaceRes> getTeamspace(@PathVariable(name = "teamspaceid") Long teamspaceId) {
        Teamspace teamspace = null;
        try {
            teamspace = teamspaceService.getTeamspaceById(teamspaceId);

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

    @PostMapping(value = "/{teamspaceid}/file", consumes = MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "팀스페이스 파일 업로드", notes = "팀스페이스에서 파일을 업로드 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "없는 팀 스페이스 Idx"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> uploadFile (
            @ApiIgnore Authentication authentication,
            @PathVariable(name = "teamspaceid") long teamspaceid,
            @RequestPart @ApiParam(value="filePostReq", required = true) FilePostReq filePostReq,
            @RequestPart(value = "file", required = true) MultipartFile[] multipartFiles) {

        SsafyUserDetails userDetails = null;

        //1-1. 로그인한 사용자 체크 (토큰 확인)
		try {
			userDetails = (SsafyUserDetails) authentication.getDetails();
		} catch(NullPointerException e) {
			e.printStackTrace();

			return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Authentication failed!"));
		} catch(Exception e) {
			e.printStackTrace();
		}

        //2. file 테이블에 있는 teamspace idx인지 확인
        try {
            teamspaceService.findById(teamspaceid);
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Invalid teamspace idx"));
        }

        //3. 파일 업로드
        teamspaceService.uploadFile(teamspaceid, multipartFiles, filePostReq.getFileDescription());

        //4. 응답
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    //FIXME: 작업 중
    @GetMapping("/{teamspaceid}/file")
    @ApiOperation(value = "팀스페이스 파일 조회", notes = "html <img> 태그에 넣을 수 있는 이미지의 주소를 반환합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 400, message = "이미지 파일이 아님"),
            @ApiResponse(code = 404, message = "파일을 찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getFileListByFileTeamspaceIdx(
            @PathVariable(name = "teamspaceid") Long teamspaceid) {

        //1. file 테이블에 있는 teamspace idx인지 확인
        Teamspace teamspace = null;
        try {
            teamspace = teamspaceService.findById(teamspaceid);
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Invalid teamspace idx"));
        }

        List<com.ssafy.db.entity.File> list = teamspaceService.getFileListByTeamspaceIdx(teamspace);

        if(!list.isEmpty()) {
            return ResponseEntity.status(200).body(list);
        } else {
            return ResponseEntity.status(200).body(BaseResponseBody.of(404, "File not found!"));
        }
    }

    @DeleteMapping(value = "/{teamspaceid}/file/{fileid}")
    @ApiOperation(value = "팀스페이스 파일 삭제", notes = "파일을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 404, message = "파일을 찾을 수 없음"),
            @ApiResponse(code = 500, message = "삭제 실패"),
    })
    public ResponseEntity<? extends BaseResponseBody> deleteFileByFilePath(
            //FIXME: pathVariable teamspaceid 필요 없음
            @PathVariable(name = "teamspaceid") Long teamspaceid,
            @PathVariable(name = "fileid") Long fileid) {

        //1. file 테이블에 있는 teamspace idx인지 확인
        Teamspace teamspace = null;
        try {
            teamspace = teamspaceService.findById(teamspaceid);
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Invalid teamspace idx"));
        }

        if(fileService.deleteFileByFileInstance(fileid)) {  //파일 정상 삭제
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Delete success"));
        } else {                                            //파일 삭제 중 오류
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Delete fail"));
        }
    }

}
