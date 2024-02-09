import React, { useState, useEffect } from "react"
import styled from "styled-components"
// import TeamspaceMemberCard from "./TeamspaceMemberCard"
import { TeamspaceInfo,TeamspaceMember } from "../../API/TeamspaceAPI"
import { useParams } from "react-router-dom"
import defaultBackImage from "../../assets/images/default-cover.jpg"
import defaultTeamspaceImage from "../../assets/images/default-image.png"
import defaultProfile from "../../assets/images/default-profile.png"
import { getImg } from "../../API/FileAPI"

const H1 = styled.h1`
    color: white;
`

const ImageContainer = styled.div`
    position: relative;
`
const BackgroundImage = styled.img`
    background-image: url(backImgURL);
    width: 57vw;
    height: 33vh;
    border-radius: 20px;
    margin-left: 2%;
`

const TeamspaceImage = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 15%;
    transform: translate(-50%, -50%);
`
function TeamspaceTeam () {
    const { teamspaceIdx } = useParams()
    const [values, setValues] = useState({})
    const [backImgURL, setBackImgURL] = useState()
    const [teamspaceImgURL, setTeamspaceImgURL] = useState()
    const [profileURL, setProfileURL] = useState()

    // 멤버 정보
    const [members, setMembers] = useState({
        nickname: "",
        position: "",
        // profile: "" 
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

    useEffect(() => {
        const backImgInfo = async() => {     
            try {
              if (values.teamspaceBackgroundPictureFileURL) {
                setBackImgURL(values.teamspaceBackgroundPictureFileURL)
              } else{
                  setBackImgURL(defaultBackImage)
                }
              } catch (err) {
                console.error(err)
              }
            }
            
            backImgInfo()

        const teamImgInfo = async() => {     
            try {
                if (values.teamspacePictureFileURL) {
                setTeamspaceImgURL(values.teamspacePictureFileURL)
                } else{
                    setTeamspaceImgURL(defaultTeamspaceImage)
                }
                } catch (err) {
                console.error(err)
                }
            }
            
            teamImgInfo()

        // const profileImgInfo = async() => {     
        //     try {
        //         if (members.profile) {
        //         setProfileURL(values.teamspaceBackgroundPictureFileURL)
        //         } else{
        //             setProfileURL(defaultProfile)
        //         }
        //         } catch (err) {
        //         console.error(err)
        //         }
        //     }
            
        //     profileImgInfo()

    },[values])

    return(
        <>
        <Container>
            {/* <H1>{values.teamName}</H1> */}

            <ImageContainer>
                <BackgroundImage src={backImgURL} alt="팀스페이스 배경 이미지"/>
                <TeamspaceImage src={teamspaceImgURL} alt="팀스페이스 이미지" />
            </ImageContainer>
            {/* <CalendarBar /> */}
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
`
// const H1 = styled.h1`
//     color: white;
//`
