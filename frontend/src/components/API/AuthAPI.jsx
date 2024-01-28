import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");

/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
    },
});
/** SIGNIN API */
export const signin = async ({ email, password, password2, name, nickname, gender, birth }) => {
    const data = { email, password, password2, name, nickname, gender, birth };
    const response = await AuthApi.post(`/auth/login`, data);
    return response.data;
}
/** SIGNUP API */
export const signup = async ({ email, password, password2, name, nickname, gender, birth }) => {
    const data = { email, password, password2, name, nickname, gender, birth };
    const response = await AuthApi.post(`/users`, data);
    return response.data;
}