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
export const checkDupNickname = async ({ 
    nickname }) => {
    const data = { 
        nickname
    }

    const response = await AuthApi.get(`/users/nickname/${encodeURIComponent(data)}`, data)
    console.log(encodeURIComponent(data))
    console.log(data)
    return response.data
}

// 로그아웃
// export const logout = async () => {
//     AuthApi.get(`/auth/logout`)
// }