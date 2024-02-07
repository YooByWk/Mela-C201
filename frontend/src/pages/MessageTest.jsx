import React, {useState, useEffecet} from "react";
import InboxList from '../components/InboxList'
import MessageFrom from '../components/MessageFrom'
import styled from "styled-components";


function Message() {



    return(
        <Container>
            <MessageFromWrapper>
                <MessageFrom />
            </MessageFromWrapper>
            <InboxWrapper>
                <InboxList />
            </InboxWrapper>
        </Container>      
    )
}

export default Message


const Container = styled.div`
    display: flex;
    width: 100%;
`

const MessageFromWrapper = styled.div`
    color: white;
    flex: 3;
`

const InboxWrapper = styled.div`
    background-color: #151C2C;
    color: white;
    flex: 1;
`
