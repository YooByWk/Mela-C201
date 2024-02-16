import axios from 'axios'

let ACCESS_TOKEN = localStorage.getItem('accessToken')

export const FileAPI = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/file',
    headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
})

// 단일 이미지 조회
export const getImg = async (fileIdx) => {
        const response = await FileAPI.get(`/images/${fileIdx}`)
        // console.log(response.data.message)
        return response.data
}

// 파일 업로드
export const uploadFile = async (formData) => {
    const response = await FileAPI.post(`/upload`, formData)
    return response.data
}

// 단일 동영상 조회
export const getVideo = async (fileIdx) => {
    const response = await FileAPI.get(`/videos/${fileIdx}`)
    return response.data
}

// 단일 음악 조회
export const getMusic = async (fileIdx) => {
    const response = await FileAPI.get(`/musics/${fileIdx}`)
    return response.data
}

// 파일 다운로드
// export const downloadFile = async (fileIdx) => {
//     const response = await FileAPI.get({
//         baseURL: process.env.REACT_APP_API_URL + `/file/download?fileIdx=${fileIdx}`,
//         headers: {
//             'Authorization': `Bearer ${ACCESS_TOKEN}`,
//         },
//         responseType: 'blob'
//     }
// )
//     console.log(response)
//     return response
// }

// 파일 삭제
export const deleteFile = async(fileIdx) => {
    const response = await FileAPI.delete(`/delete?fileIdx=${fileIdx}`)
    return response.data
}