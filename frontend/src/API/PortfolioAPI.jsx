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
export const musicUpload = async ({
    pinFixed,
    fileDescription,
    title,
    file
}) => {
    const formData = new FormData()
    formData.append('pinFixed', pinFixed)
    formData.append('fileDescription', fileDescription)
    formData.append('tilte', title)
    formData.append('file', file)
    const response = await PortfolioAPI.post(`/musics`, formData)
    console.log(response.data)
    return response.data
}