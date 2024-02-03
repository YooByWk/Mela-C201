import styled from "styled-components"
import { useParams } from "react-router-dom";

const H1 = styled.h1`
    color: white;
`

function TeamspaceFile () {
    const { teamspaceIdx } = useParams();
    return(
    <>
    <H1>Teamspace - File</H1>
    </>
    )
}

export default TeamspaceFile