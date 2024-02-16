import React, { useState } from "react";
import { changePassword } from "../API/AuthAPI";
import DefaultButton from "../components/DefaultButton";
import styled from "styled-components";

function ForgotPassword() {
    const [ emailId, setEmailId ] = useState('')

    const sendEmail = () => {
        // console.log(emailId)
        changePassword({emailId: emailId})
        .then(res => {
            // console.log(res.data)
            alert('이메일을 확인해주세요')
        })
        .catch(err => {
            // console.log(err)
        })
    }

    return (
        <>
        <Container>
            <h2>비밀번호 찾기</h2>
            <div className="wrapper">
                <input
                    placeholder="도메인을 제외한 아이디를 입력해주세요"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    className='input'
                />
                <div className="div">
                    <DefaultButton 
                        text="인증 보내기"
                        onClick={sendEmail}
                        width='8rem'
                    />
                </div>
            </div>
        </Container>
        </>
    )
}

export default ForgotPassword

const Container = styled.div`
    color: white;
    padding: 20px;
    
    .wrapper {
        display: flex;
        margin-top: 1.5rem;
    }

    .div {
        margin: 15px;
    }

    .input {
        padding: 1rem;
        width: 30%;
        margin: 10px;
        border-radius: 10px;
        border: none;
    }
`