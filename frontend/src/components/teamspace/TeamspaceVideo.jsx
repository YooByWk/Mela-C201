import React, { useState } from "react";
import { MeetingProvider} from '@videosdk.live/react-sdk';
import { createMeeting } from "../../API/VideoAPI"

import JoinScreen from './JoinScreen'
import MeetingView from "./MeetingView"


function TeamspaceVideo () {
    const token = localStorage.getItem('accessToken')
    const [meetingId, setMeetingId] = useState(null)

    const getMeetingAndToken = async (id) => {
        const meetingId =
          id == null ? await createMeeting({ token: token }) : id;
        setMeetingId(meetingId);
    };

    const onMeetingLeave = () => {
        setMeetingId(null);
    };

    return token && meetingId ? (
        <MeetingProvider
            config={{
            meetingId,
            micEnabled: true,
            webcamEnabled: true,
            name: "C.V. Raman",
        }}
        token={token}
        >
            <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        </MeetingProvider>
    ) : (
        <JoinScreen getMeetingAndToken={getMeetingAndToken} />
    )
}

export default TeamspaceVideo
