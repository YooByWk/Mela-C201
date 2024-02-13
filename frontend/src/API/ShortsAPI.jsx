import axios from 'axios'

let ACCESS_TOKEN = localStorage.getItem('accessToken')

export const ShortsAPI = axios.create({
    baseURL: 'http://localhost:8080/api/v1/shorts',
    headers:  {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    },
})

export const ShortsAPI2 = axios.create({
    baseURL: 'http://localhost:8080/api/v1/shorts',
    headers:  {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    },
})

// 쇼츠 등록
export const musicUpload = async (formData) => {
    console.log(formData)
    for (let key of formData.keys()) {
        console.log(key, ":", formData.get(key));
    }
    const response = await ShortsAPI2.post(`/`, formData)
    console.log(response.data)
    return response.data
}