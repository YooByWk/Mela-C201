package com.ssafy.api.openvidu.service;


import com.ssafy.api.openvidu.request.MeetingPostReq;
import com.ssafy.db.entity.Meeting;
import com.ssafy.db.repository.MeetingRepository;
import com.ssafy.db.repository.TeamspaceRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MeetingServiceImpl implements MeetingService {

    @Autowired
    MeetingRepository meetingRepository;

    @Autowired
    TeamspaceRepository teamspaceRepository;

    @Autowired
    UserRepository userRepository;

//    private final MeetingDAO meetingDAO;
//    @Autowired
//    public MeetingServiceImpl(MeetingDAO meetingDAO) {this.meetingDAO = meetingDAO;}

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    @Override
    public MeetingPostReq createSession(MeetingPostReq meetingPostReq, String consultantEmailId) throws Exception {

        Meeting meeting = toMeeting(meetingPostReq);
        meeting.setConsultantEmailId(userRepository.findByEmailId(consultantEmailId).get());
        Meeting createMeeting = meetingRepository.save(meeting);
        return toMeetingPostReq(createMeeting);
    }

    @Override
    public List<MeetingPostReq> readAllMeeting() throws Exception {

        ArrayList<MeetingPostReq> meetingPostReqsList = new ArrayList<MeetingPostReq>();

        List<Meeting> readAllMeeting = meetingRepository.findAll();

        for(Meeting meeting : readAllMeeting){
            meetingPostReqsList.add(new MeetingPostReq(
                    meeting.getSessionId(),
                    meeting.getConsultantEmailId(),
                    meeting.getNumberOfPeople(),
                    meeting.getMeetingRegisterTime()
            ));
        }

        return meetingPostReqsList;
    }

    @Override
    public MeetingPostReq readMeeting(String sessionId) throws Exception {
        Meeting readMeeting = meetingRepository.findById(sessionId).get();
        return toMeetingPostReq(readMeeting);
    }

    @Override
    public MeetingPostReq updateMeeting(MeetingPostReq meetingPostReq) throws Exception {
        Meeting meeting = toMeeting(meetingPostReq);
        return toMeetingPostReq(meetingRepository.save(meeting));
    }

    @Override
    public void deleteMeeting(String sessionId) throws Exception {
        Optional<Meeting> readMeeting = meetingRepository.findById(sessionId);
        if(readMeeting.isPresent()){
            Meeting deleteMeeting = readMeeting.get();

            meetingRepository.delete(deleteMeeting);
        } else {
            throw new Exception();
        }
    }

    @Override
    public void deleteAllSessionConsultantId(String consultantEmailId) throws Exception {

        List<Meeting> meetingList = meetingRepository.findByConsultantEmailId(userRepository.findByEmailId(consultantEmailId).get());

        for(Meeting meeting : meetingList){
            meetingRepository.delete(meeting);
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    private Meeting toMeeting(MeetingPostReq meetingPostReq) {
        Meeting meeting = new Meeting();
        meeting.setSessionId(meetingPostReq.getSessionId());
        meeting.setConsultantEmailId(meetingPostReq.getConsultantId());
        meeting.setNumberOfPeople(meetingPostReq.getNumberOfPeople());
        meeting.setMeetingRegisterTime(meetingPostReq.getMeetingRegisterTime());
        return meeting;
    }

    private MeetingPostReq toMeetingPostReq(Meeting meeting) {
        MeetingPostReq MeetingPostReq = new MeetingPostReq();
        MeetingPostReq.setSessionId(meeting.getSessionId());
        MeetingPostReq.setConsultantId(meeting.getConsultantEmailId());
        MeetingPostReq.setNumberOfPeople(meeting.getNumberOfPeople());
        MeetingPostReq.setMeetingRegisterTime(meeting.getMeetingRegisterTime());
        return MeetingPostReq;
    }
}