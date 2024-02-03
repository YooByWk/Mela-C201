import React, { useEffect } from "react";
import styled from "styled-components";
import { useSearchParams, useParams } from "react-router-dom";
import { email } from "../API/AuthAPI";
import DefaultButton from "../components/DefaultButton";

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
        </>
    )
}

export default EmailVerify