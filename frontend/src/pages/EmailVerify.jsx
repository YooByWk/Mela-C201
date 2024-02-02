import React, { useEffect } from "react";
import styled from "styled-components";
import { useSearchParams, useParams } from "react-router-dom";
import { verify } from "../API/AuthAPI";
import { email } from "../API/AuthAPI";
import DefaultButton from "../components/DefaultButton";
import { Link } from "react-router-dom";
function EmailVerify() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('accessToken')

    const { emailId } = useParams()
    
    const sendEmail = () => {
        console.log(emailId)
        email({emailId: emailId})
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const mainHandle = () => {
        window.location.href="/"
    }

    // useEffect(() => {
    //     email(emailId)
    //     if (token) {
    //         verify(token)
    //         .then(response => {
    //             console.log(response)
    //             console.log('인증성공')
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    //     }
    // }, [token])

    return (
        <>
            <DefaultButton 
            text="전송하기"
            onClick={sendEmail}
            />
            <DefaultButton 
            text="메인으로"
            onClick={mainHandle}
            />
            {/* <P>이메일 인증이 완료되었습니다</P> */}
        </>
    )
}

export default EmailVerify

const P = styled.p`
    color: white;
`