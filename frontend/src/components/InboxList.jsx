import React from "react";
import DefaultInbox from './DefaultInbox';
import styled from "styled-components";
import { RiMessage2Line } from "react-icons/ri";

const Container = styled.div`
    display: flex;
    padding: 1rem;
    flex-direction: column;
`

const InboxHeader = styled.div`
    
`

function InboxList() {
    return (
        <Container>
            <InboxHeader>
                <RiMessage2Line />
                <span>Inbox</span>
            </InboxHeader>
            
            <DefaultInbox />
        </Container>
        
    )
}

export default InboxList