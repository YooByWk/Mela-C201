import axios from "axios";

let ACCESS_TOKEN = localStorage.getItem("accessToken");

/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthApi = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
})

/** SIGNIN API */
export const signin = async ({ 
    id, 
    password }) => {
    const data = { 
        id, 
        password 
    }

    const response = await AuthApi.post(`/auth/login`, data)

    return response.data
}

/** SIGNUP API */
export const signup = async ({ 
    emailId, 
    emailDomain, 
    password, 
    name, 
    nickname, 
    gender, 
    birth, 
    searchAllow }) => {
    const data = { 
        emailId, 
        emailDomain, 
        password, 
        name, 
        nickname, 
        gender, 
        birth, 
        searchAllow 
    }
    const response = await AuthApi.post(`/users`, data)
    return response.data
}

/**  닉네임 중복 확인 API */
export const checkDupNickname = async ({ nickname }) => {
    const response = await AuthApi.get(`/users/nickname/${encodeURIComponent(nickname)}`)
    console.log(response.data)
    return response.data
}

// 로그아웃
export const logout = async () => {
    AuthApi.get(`/auth/logout`)
}

// 이메일 인증 전송
export const email = async ({emailId}) => {
    const response = await AuthApi.post(`/auth/email`, {
        params: {
            emailId
        }
    })
    console.log(response.data)
    return response.data
}

// 사용자 이메일 인증
export const verify = async (accessToken) => {
    const response = await AuthApi.get(`/auth/verify?token=${accessToken}`)
    console.log(response.data)
    return response.data
}