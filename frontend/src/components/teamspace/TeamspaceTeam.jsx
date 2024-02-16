import React, { useState, useEffect } from "react"
import styled from "styled-components"
// import TeamspaceMemberCard from "./TeamspaceMemberCard"
import { TeamspaceInfo,TeamspaceMember } from "../../API/TeamspaceAPI"
import { useParams } from "react-router-dom"
import defaultBackImage from "../../assets/images/default-cover.jpg"
import defaultTeamspaceImage from "../../assets/images/default-image.png"
import defaultProfile from "../../assets/images/default-profile.png"


function TeamspaceTeam () {
    const { teamspaceIdx } = useParams()
    const [values, setValues] = useState({})
    const [backImgURL, setBackImgURL] = useState()
    const [teamspaceImgURL, setTeamspaceImgURL] = useState()
    const [profileURL, setProfileURL] = useState()

    // 멤버 정보
    const [members, setMembers] = useState([])

    useEffect(() => {
        const info = async() => {
            try {
                const teamInfo = await TeamspaceInfo(teamspaceIdx)
                setValues(teamInfo)
            
                const memberInfo = await TeamspaceMember(teamspaceIdx)
                setMembers(memberInfo)
                
            } catch (err) {
                // console.log(err)
            }
        }
        info()
        
    },[members])

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

    },[values])

    // console.log(members)
    return(
        <>
        <Container>
            <ImageContainer>
                <BackgroundImage src={backImgURL} alt="팀스페이스 배경 이미지"/>
                <TeamspaceImage src={teamspaceImgURL} alt="팀스페이스 이미지" />
                <H1>{values.teamName}</H1>
                <p>{values.teamDescription}</p>
            </ImageContainer>
            <br/>
            <H2>Members</H2>
            <br/>
            <MemberContainer>
            {Object.entries(members).map(([key, member]) => (
            <TeamspaceMemberCard key={member.userIdx}> 
                {member.profileImageURL === null ? (
                    <>
                    <Profile src={defaultProfile} alt="프로필 이미지" />
                    </>
                ) : (
                    <>
                    <Profile src={member.profileImageURL} alt="프로필 이미지" />
                    </>
                )}
                <Nickname>
                {member.nickname}
                </Nickname>
            </TeamspaceMemberCard>
            ))}
            </MemberContainer>
        </Container>
        </>
    )
}

export default TeamspaceTeam


const Container = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: space-evenly;
    padding: 5px;
`

const ImageContainer = styled.div`
    position: relative;

    p {
        color: white;
        position: absolute;
        text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
        top: 9rem;
        left: 13rem;
        font-size: large;
    }
`
    
const H1 = styled.h1`
    color: white;
    position: absolute;
    text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
    left: 13rem;
    top: 2rem;
`

const BackgroundImage = styled.img`
    background-image: url(backImgURL);
    width: 57vw;
    height: 33vh;
    border-radius: 20px;
`

const TeamspaceImage = styled.img`
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    position: absolute;
    top: 7rem;
    left: 6rem;
    transform: translate(-50%, -50%);
    `

const MemberContainer = styled.div`
    display: flex;
    flex-direction: row;
    overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`

const TeamspaceMemberCard = styled.div`
    width: 200px;
    height: 250px;
    border-radius: 15%;
    background-color: #151C2C;
    text-align: center;
    margin-right: 7%;
`

const Profile = styled.img`
    width: 170px;
    height: 170px;
    border-radius: 15%;
    text-align: center;
    margin-top: 10%;
`

const H2 = styled.h2`
    color: white;
`

const Nickname = styled.p`
    color: white;
    padding-top: 10%;
`