import styled from "styled-components"
import { useParams } from "react-router-dom"
import SequenceMain from './../../sequence/SequenceMain';


const H1 = styled.h1`
    color: white;
`
// function sendMessageIframe(){
//     var iframe = document.getElementById('child_iframe').contentWindow; 
//     iframe.postMessage({ parentData : 'test parent data', 'http://123.com');
//   }

// window.addEventListener('message', function(e){
//     console.log('child message');
//     console.log(e.data);
//     console.log("e.origin : " + e.origin);
// })


function TeamspaceAudio() {
    const { teamspaceIdx } = useParams();
    return(
    <>
    <H1>Teamspace - Audio</H1>
    <Sequence teamspaceIdx={teamspaceIdx} />
    {/* <CustomIframe src="https://signal.vercel.app/edit" frameborder="0" allow="midi"></CustomIframe> */}
    
    {/* <CustomIframe src="https://i10c201.p.ssafy.io:3001" frameborder="0" allow="midi"></CustomIframe> */}

    

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
    height: 150%;
`