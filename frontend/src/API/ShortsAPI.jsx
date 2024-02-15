import axios from 'axios'

let ACCESS_TOKEN = localStorage.getItem('accessToken')

export const ShortsAPI = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/shorts',
    headers:  {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    },
})

export const ShortsAPI2 = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/shorts',
    headers:  {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    },
})

// 쇼츠 등록
export const shortsUpload = async (formData) => {
    // console.log(formData)
    // for (let key of formData.keys()) {
    //     console.log(key, ":", formData.get(key));
    // }
    const response = await ShortsAPI2.post(`/`, formData)
    // console.log(response.data)
    return response.data
}

// 쇼츠 리스트
export const shortsList = async() => {
    const response = await ShortsAPI.get(`/`)
    return response.data
}

// 쇼츠 좋아요
export const likeShorts = async(shortsId) => {
    const response = await ShortsAPI.post(`/${shortsId}/like`)
    return response.data
} 

// 쇼츠 싫어요
export const hateShorts = async(shortsId) => {
    const response = await ShortsAPI.post(`/${shortsId}/dislike`)
    return response.data
} 

// 단일 매칭 쇼츠 가져오기
export const getShorts = async() => {
    const response = await ShortsAPI.get(`/getshort`)
    return response.data
} 

// 쇼츠 삭제
export const deleteShorts = async(shortsId) => {
    const response = await ShortsAPI.delete(`/${shortsId}`)
    return response.data
} 

// 단일 쇼츠 조회
export const oneShort = async(shortsId) => {
    const response = await ShortsAPI.get(`/${shortsId}`)
    return response.data
} 

