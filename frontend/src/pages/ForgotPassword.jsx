import React, { useState } from "react";
import { changePassword } from "../API/AuthAPI";
import DefaultButton from "../components/DefaultButton";

function ForgotPassword() {
    const [ emailId, setEmailId ] = useState('')

    const sendEmail = () => {
        console.log(emailId)
        changePassword({emailId: emailId})
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <input
                placeholder="도메인을 제외한 아이디를 입력해주세요"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
            />
            <DefaultButton 
                text="인증 보내기"
                onClick={sendEmail}
            />
        </>
    )
}

export default ForgotPassword