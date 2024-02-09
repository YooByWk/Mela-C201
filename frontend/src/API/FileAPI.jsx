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
    if (fileIdx) {
        const response = await FileAPI.get(`/images/${fileIdx}`)
        return response.data
    }
    return
}

// 파일 업로드
export const uploadFile = async (formData) => {
    const response = await FileAPI.post(`/upload`, formData)
    return response.data
}
