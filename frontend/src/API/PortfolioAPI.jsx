import axios from 'axios';

let ACCESS_TOKEN = localStorage.getItem('accessToken')

export const PortfolioAPI = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/portfolios',
    headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
},
})


// 포트폴리오 파일 등록
export const musicUpload = async (formData) => {
    // console.log(formData)
    // for (let key of formData.keys()) {
    //     console.log(key, ":", formData.get(key));
    // }
    const response = await PortfolioAPI.post(`/musics`, formData)

    return response.data
}

// 포트폴리오 검색
export const musicSearch = async (word) => {
    const response = await PortfolioAPI.get(`/totalsearchmusic/${word}`)
    return response.data
}