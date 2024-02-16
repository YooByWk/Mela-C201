package com.ssafy.api.openvidu.service;

import com.ssafy.api.openvidu.request.MeetingPostReq;

import java.util.List;

public interface MeetingService {
    MeetingPostReq createSession(MeetingPostReq meetingPostReq, String consultantId) throws Exception;
    List<MeetingPostReq> readAllMeeting() throws Exception;
    MeetingPostReq readMeeting(String sessionId) throws Exception;
    MeetingPostReq updateMeeting(MeetingPostReq meetingPostReq) throws Exception;
    void deleteMeeting(String sessionId) throws Exception;
    void deleteAllSessionConsultantId(String consultantId) throws Exception;
}