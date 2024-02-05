import React, { useState } from "react";
import { createMeeting } from "../../API/VideoAPI";

function JoinScreen () {
    const [meetingId, setMeetingId] = useState('')
    
    const getMeetingAndToken = async (id) => {
        const meetingId = id == null ?
            await createMeeting({ }) : id
        setMeetingId(meetingId);
    }

    const onClick = async () => {
        await getMeetingAndToken(meetingId)
    }

    return (
        <div>
           <input
                type="text"
                placeholder="Enter Meeting Id"
                onChange={(e) => {
                setMeetingId(e.target.value);
                }}
            />
            <button onClick={onClick}>Join</button>
            {" or "}
            <button onClick={onClick}>Create Meeting</button> 
        </div>
    )
}

export default JoinScreen