import React, { useEffect } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { verify } from "../API/AuthAPI";

function EmailVerify() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('accessToken')

    useEffect(() => {
        if (token) {
            verify(token)
            .then(response => {
                console.log(response)
                console.log('인증성공')
            })
            .catch(error => {
                console.log(error)
            })
        }
    }, [token])

    return (
        <div>
            <P>이메일 인증이 완료되었습니다</P>
        </div>
    )
}

export default EmailVerify

const P = styled.p`
    color: white;
`