import axios from 'axios';

export const PortfolioApi = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${
            localStorage.getItem('accessToken')
        }`,
    },
})

export const registerFile = async (data) => {
    return await PortfolioApi.post('/users/musics', data)
}