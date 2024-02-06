import React, { useState, useEffect } from "react"
import styled from "styled-components"
// import TeamspaceMemberCard from "./TeamspaceMemberCard"
import { TeamspaceInfo,TeamspaceMember } from "../../API/TeamspaceAPI"
import { ScheduleGenerate } from '../../API/ScheduleAPI'
import { useParams } from "react-router-dom"
import CalendarBox from "./calendar/CalendarBox"
import ScheduleCreateModal from "../Modals/ScheduleCreate"


function TeamspaceTeam ({className, fontSize, padding}) {
    const { teamspaceIdx } = useParams()
    const [values, setValues] = useState({})
    const [mark, setMark] = useState([])

    const handleScheduleCreate = (newSchedule) => {
        setMark([...mark, newSchedule.startTime])
    }
  
    // 멤버 정보
    const [members, setMembers] = useState({
        nickname: "",
        position: "",
        // profile: ""  => 프로필 사진
    })

    useEffect(() => {
        const info = async() => {
            try {
                const teamInfo = await TeamspaceInfo(teamspaceIdx)
                setValues(teamInfo)
                const memberInfo = await TeamspaceMember(teamspaceIdx)
                setMembers(memberInfo)
            } catch (err) {
                console.log(err)
            }
        }

        info()
    },[])


    return(
        <>
        <Container>
            <H1>{values.teamName}</H1>
            <BackgroundImage></BackgroundImage>
            <div className="schedule-box">
                <div className="title">
                    <h3>Schedule</h3>
                    <ScheduleCreateModal 
                        teamspaceId={teamspaceIdx}
                        onScheduleCreate={handleScheduleCreate}
                    />
                </div>
                <CalendarBox mark={mark}/>

            </div>
            {/* <H1>Members</H1> */}
            {/* {Object.entries(members).map(([key, member]) => (
            <TeamspaceMemberCard 
                key={member.userIdx}
                name={member.nickname}
                position={member.position}
            />
            ))} */}
        </Container>
        </>
    )
}

export default TeamspaceTeam


const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 5px;

    .schedule-box {
        color: white;
        background-color: #151C2C;
        border-radius: 20px;
        width: 20rem;
        height: 32rem;
        display: flex;
        flex-direction: column;
    }

    .title {
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
`

const H1 = styled.h1`
    color: white;
`
const BackgroundImage = styled.div`
    background-color: white;
    width: 70%;
    height: 250px;
    border-radius: 20px;
    // background-image: axios 요청으로 값 가져와서 넣어야 될 듯
`