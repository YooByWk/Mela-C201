import axios from 'axios';

let ACCESS_TOKEN = localStorage.getItem('accessToken')

export const PortfolioAPI = axios.create({
    baseURL: 'http://localhost:8080/api/v1/users',
    headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
},
})


// 포트폴리오 파일 등록
export const musicUpload = async (formData) => {
    console.log(formData)
    for (let key of formData.keys()) {
        console.log(key, ":", formData.get(key));
    }
    const response = await PortfolioAPI.post(`/musics`, formData)
    console.log(response.data)
    return response.data
}