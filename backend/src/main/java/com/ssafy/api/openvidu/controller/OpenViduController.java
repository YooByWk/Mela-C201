package com.ssafy.api.openvidu.controller;

//import com.ssafy.api.openvidu.request.MeetingPostReq;
//import com.ssafy.api.openvidu.service.MeetingService;
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiOperation;
//import io.swagger.annotations.ApiParam;
//import lombok.extern.slf4j.Slf4j;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import io.openvidu.java.client.*;
//
//import javax.annotation.PostConstruct;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import com.ssafy.api.openvidu.request.MeetingPostReq;
import com.ssafy.api.openvidu.service.MeetingService;
import com.ssafy.api.teamspace.service.TeamspaceService;
import com.ssafy.api.user.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import springfox.documentation.annotations.ApiIgnore;

@Slf4j
@Api(value = "OpenVidu API", tags = {"OpenVidu"})
@RestController
@RequestMapping("/api/v1/openvidu")
public class OpenViduController {

    @Autowired
    UserService userService;

    @Autowired
    TeamspaceService teamspaceService;

    public static final Logger logger = LoggerFactory.getLogger(OpenViduController.class);
    private final MeetingService meetingService;
    @Autowired
    public OpenViduController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openVidu;

    @PostConstruct
    public void init() {
        this.openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    /**
     * @return The Session ID
     */

    /////////////////////////////////////////////////////////////////////////////////////////////////////


    @PostMapping("/createsession/{teamspaceidx}")
    @ApiOperation(value = "방 생성을 위한 세션ID 생성")
    public ResponseEntity<?> createSession(@ApiIgnore Authentication authentication,
                                           @PathVariable Long teamspaceidx)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User nowLoginuser = userService.getUserByEmail(userId);

        Map<String, Object> check = new HashMap<>();

        logger.info("*** createSession 메소드 호출");

        SessionProperties properties = SessionProperties.fromJson(new HashMap<>()).build();
        Session session = openVidu.createSession(properties);

//        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC).data(serverData).role(role).build();

//        Session session = openVidu.createSession();
        MeetingPostReq meetingPostReq = new MeetingPostReq();
        meetingPostReq.setSessionId(session.getSessionId());

        try {
//            meetingService.deleteAllSessionConsultantId(nowLoginuser.getEmailId());
//            logger.info("*** deleteAllSessionConsultantId 호출 : " + nowLoginuser.getEmailId() );

            meetingService.createSession(meetingPostReq, nowLoginuser.getEmailId());
            logger.info("*** createSession 호출 : " + nowLoginuser.getEmailId());

            check.put("msg", "success");
            check.put("sessionId", session.getSessionId());


            logger.info("*** createSession 메소드 종료");
            logger.info("*** 세션 생성 : " + session.getSessionId());
            teamspaceService.updateTeamspaceOpenViduSessionId(teamspaceidx, session.getSessionId());
            return ResponseEntity.status(HttpStatus.OK).body(check);
        } catch (Exception e) {

            System.out.println("++++++++++++++++++++");
            System.out.println("에러뜸");
            System.out.println("++++++++++++++++++++");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * @param sessionId The Session in which to create the Connection
     * @return The Token associated to the Connection
     */
    @PostMapping("/entersession/{sessionId}/connections")
    @ApiOperation(value = "세션ID로 생성된 방 입장")
    public ResponseEntity<?> createConnection(@PathVariable("sessionId") @ApiParam(value = "세션 아이디", required = true) String sessionId)
            throws OpenViduJavaClientException, OpenViduHttpException {

        Map<String, Object> mapSessions = new HashMap<>();

        logger.info("*** createConnection 메소드 호출");

        Session session = openVidu.getActiveSession(sessionId);
        if (session == null) {
            // 세션이 없다
            mapSessions.put("msg","fail");
            logger.info("*** createConnection 메소드 오류");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(mapSessions);
        } else {
            ConnectionProperties properties = ConnectionProperties.fromJson(new HashMap<>()).build();
            Connection connection = session.createConnection(properties);

            try {
                MeetingPostReq meetingPostReq = meetingService.readMeeting(session.getSessionId());
                logger.info("*** getMeeting 호출");

//                if(meetingPostReq.getNumberOfPeople() >= 2) {
                // 세션 방에 인원이 2명 이상이면 입장 안됨.
                if(meetingPostReq.getNumberOfPeople() >= 10) {

                    mapSessions.put("msg", "The session room is full.");
                    logger.info("*** createConnection 오류 - 방 인원이 가득 참");
                    return ResponseEntity.status(HttpStatus.OK).body(mapSessions);
                } else {
                    meetingPostReq.setNumberOfPeople(meetingPostReq.getNumberOfPeople() + 1);
                    meetingService.updateMeeting(meetingPostReq);

                    mapSessions.put("msg", "success");
                    mapSessions.put("sessionId", session.getSessionId());
                    mapSessions.put("token", connection.getToken());

                    logger.info("*** createConnection 종료");
                    logger.info("*** sessionId : {}", session.getSessionId());
                    logger.info("*** token : {}", connection.getToken());
                    return ResponseEntity.status(HttpStatus.OK).body(mapSessions);
                }
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }

        }
    }

    @PostMapping("/exitsession/{sessionId}/disconnections")
    @ApiOperation(value = "세션ID로 생성된 방 퇴장")
    public ResponseEntity<?> deleteConnection(@PathVariable("sessionId") @ApiParam(value = "세션 아이디", required = true) String sessionId) {

        Map<String, Object> mapSessions = new HashMap<>();
        Map<String, Object> check = new HashMap<>();

        logger.info("*** deleteConnection 메소드 호출");

        Session session = openVidu.getActiveSession(sessionId);

        if (session == null) {
            // 세션이 없다
            mapSessions.put("msg","fail");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(mapSessions);
        } else {

            try {
                MeetingPostReq meetingPostReq = meetingService.readMeeting(session.getSessionId());
                meetingPostReq.setNumberOfPeople(meetingPostReq.getNumberOfPeople() - 1);

                if(meetingPostReq.getNumberOfPeople() <= 0) {
                    meetingService.deleteMeeting(meetingPostReq.getSessionId());
                } else {
                    meetingService.updateMeeting(meetingPostReq);
                }

                check.put("msg", "success");

                logger.info("*** deleteConnection 메소드 종료");
                return ResponseEntity.status(HttpStatus.OK).body(check);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }

        }
    }

    @GetMapping("/getsessions")
    @ApiOperation(value = "생성된 방 모두 조회")
    public ResponseEntity<?> readAllSession() {

        Map<String, Object> check = new HashMap<>();

        logger.info("*** readAllSession - 호출");

        try {
            List<MeetingPostReq> list = meetingService.readAllMeeting();

            if(list != null) {

                logger.info("*** readAllSession list : {} ", list);

                check.put("msg", "success");
                check.put("data", list);

                return ResponseEntity.status(HttpStatus.OK).body(check);
            } else {
                check.put("msg", "fail");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @DeleteMapping("/deletesession/{sessionId}")
    @ApiOperation(value = "세션ID로 생성된 방 삭제")
    public ResponseEntity<?> deleteSession(@PathVariable("sessionId") @ApiParam(value = "세션 아이디", required = true) String sessionId) throws Exception{

        Map<String, Object> check = new HashMap<>();

        logger.info("*** deleteSession - 호출");

        meetingService.deleteMeeting(sessionId);

        check.put("msg", "success");

        return ResponseEntity.status(HttpStatus.OK).body(check);

//        try {
//            meetingService.deleteMeeting(sessionId);
//
//            check.put("msg", "success");
//
//            return ResponseEntity.status(HttpStatus.OK).body(check);
//        } catch (Exception e) {
//            check.put("msg", "fail");
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
//        }

    }
}
