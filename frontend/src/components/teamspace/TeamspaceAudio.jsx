import styled from "styled-components"
import { useParams } from "react-router-dom"
import SequenceMain from './../../sequence/SequenceMain';


const H1 = styled.h1`
    color: white;
`

function TeamspaceAudio() {
    const { teamspaceIdx } = useParams();
    return(
    <>
    <H1>Teamspace - Audio</H1>
    {/* <Sequence teamspaceIdx={teamspaceIdx} /> */}
    <CustomIframe src="https://signal.vercel.app/edit" frameborder="0"></CustomIframe>
    </>
    )
}

export default TeamspaceAudio

const Sequence = styled(SequenceMain)`
    width: 100%;
    overflow-x:scroll;
`

const CustomIframe = styled.iframe`
    width: 100%;
    height: 100%;
`