import React from "react";
import styled from "styled-components";

const Input = styled.input`
    background-color: #151C2C;
    border: none;
    width: 100%;
    border-radius: 5px;
    height: 2.5rem;
    color: white;
`

function InputMessage() {

    return(
        <Input 
            type="text"
            placeholder="Enter your message"
        />
    )
}

export default InputMessage