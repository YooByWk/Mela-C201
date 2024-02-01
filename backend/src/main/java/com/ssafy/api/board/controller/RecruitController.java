package com.ssafy.api.board.controller;

import com.ssafy.api.board.request.RecruitRegisterPostReq;
import com.ssafy.api.board.service.RecruitService;
import com.ssafy.api.user.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@Slf4j
@Api(value = "구인 API", tags = {"Recruit"})
@RestController
@RequestMapping("/api/v1/recruit")
public class RecruitController {
    @Autowired
    RecruitService recruitService;
    @Autowired
    UserService userService;

    @PostMapping("")
    @ApiOperation(value = "구인글 등록", notes = "<string></strong>게시글을 등록한다.")
    public ResponseEntity<? extends BaseResponseBody> registerBoard(
            @ApiIgnore Authentication authentication,
            @RequestBody RecruitRegisterPostReq registInfo) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userEmail = userDetails.getUsername();
        User user = userService.getUserByEmail(userEmail);

        try{
            recruitService.registBoard(registInfo, user);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(404, "not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
