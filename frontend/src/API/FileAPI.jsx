import axios from 'axios'

let ACCESS_TOKEN = localStorage.getItem('accessToken')

export const FileAPI = axios.create({
    baseURL: 'http://localhost:8080/api/v1/file',
    headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
})

// 단일 이미지 조회
export const getImg = async (fileIdx) => {
    const response = await FileAPI.get(`/images/${fileIdx}`, fileIdx)
    return response.data
}
