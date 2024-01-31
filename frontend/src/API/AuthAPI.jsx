import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");

/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthApi = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
    },
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

    return response.data;
}
