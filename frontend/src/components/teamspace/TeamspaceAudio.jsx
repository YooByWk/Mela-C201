import styled from "styled-components"
import { useParams } from "react-router-dom"

const H1 = styled.h1`
    color: white;
`

function TeamspaceAudio() {
    const { teamspaceIdx } = useParams();
    return(
    <>
    <H1>Teamspace - Audio</H1>
    </>
    )
}

export default TeamspaceAudio