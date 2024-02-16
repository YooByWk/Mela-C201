import axios from "axios";

/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

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
    return response.data
}

// 로그아웃
export const logout = async () => {
    AuthApi.get(`/auth/logout`)
}

// 이메일 인증 전송
export const email = async ({emailId}) => {
    const data = {emailId}
    const response = await AuthApi.post(`/auth/email`, data)
    return response.data
}

// 사용자 이메일 인증
export const verify = async (accessToken) => {
    const response = await AuthApi.get(`/auth/verify?token=${accessToken}`)
    return response.data
}

// 비밀번호 변경 링크 이메일 전송
export const changePassword = async ({emailId}) => {
    const data = {emailId}
    const response = await AuthApi.post(`/users/email`, data)
    return response.data
}