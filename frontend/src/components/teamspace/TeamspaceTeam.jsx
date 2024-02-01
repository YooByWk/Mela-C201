import styled from "styled-components"
import TeamspaceMember from "./TeamspaceMember"

const H1 = styled.h1`
    color: white;
`
const BackgroundImage = styled.div`
    background-color: white;
    width: 1000px;
    height: 250px;
    border-radius: 20px;
    // background-image: axios 요청으로 값 가져와서 넣어야 될 듯
`
function TeamspaceTeam () {
    return(
        <>
        <H1>Teamspace - Team</H1>
        <BackgroundImage></BackgroundImage>
        <H1>Members</H1>
        <TeamspaceMember/>
        </>
    )
}

export default TeamspaceTeam