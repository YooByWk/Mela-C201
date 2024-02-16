import axios from 'axios'
import { addYears } from 'date-fns'

let ACCESS_TOKEN = localStorage.getItem('accessToken')

export const UserApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL+'/users',
    headers:  {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    },
})

const UserApi2 = axios.create({
    baseURL: process.env.REACT_APP_API_URL+'/users',
    headers: {
        'Authorization': `Bearer ${localStorage.accessToken}`,
    },
})


// 토큰 유효성 검사
// UserApi.interceptors.response.use((response) => {
//     return response
// }, async (error) => {
//     const originalRequest = error.config
//     if (error.response.status === 403 && !originalRequest._retry) {
//         return UserApi(originalRequest)
//     }
//     return Promise.reject(error)
// })

// 로그인 한 유저 조회
export const fetchUser = async () => {
    if (!localStorage.accessToken) {
        console.log('토큰이 없습니다')
        return
    }
    const response = await axios.get(process.env.REACT_APP_API_URL+`/users/myinfo`, {
        headers: {
            'Authorization': `Bearer ${localStorage.accessToken}`,
        }
    })
    return response.data
}

// 회원수정
export const updateUser = async (formdata) => {
    try {
        const response = await axios.put(process.env.REACT_APP_API_URL+'/users/myinfo', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization' : `Bearer ${localStorage.accessToken}`
          }
        })
        return response.data
      }
      catch (error) {
        console.error(error);
      }
}

// 회원탈퇴
export const deleteUser = async () => {
    await UserApi.delete(`/delete`)
    localStorage.clear()
}

// 나를 팔로우 한 사람 조회
export const follower = async (userId) => {
    
    const response = await axios.get(process.env.REACT_APP_API_URL+`/users/${userId}/followees`,{
        headers: {
            'Authorization': `Bearer ${localStorage.accessToken}`,
        }
    })

    return response.data
}

// 내가 팔로우 한 사람 조회
export const followee = async (userId) => {
    const response = await axios.get(process.env.REACT_APP_API_URL+`/users/${userId}/followers`, {
        headers: {
            'Authorization': `Bearer ${localStorage.accessToken}`,
        }
    })
    // console.log(response)
    // console.log(response.data)
    return response.data
}

// 팔로우 요청 
export const followUser = async (userId) => {
    const response = await UserApi.put(`/follow/${userId}`)
    // console.log(response.data)
    return response.data
}

// 팔로우 관계인지 확인
export const isFollow = async (userId) => {
    // console.log(userId)
    const response = await UserApi.get(`/${userId}/isfollow`)
    // console.log(response)
    return response.data
}

// 이메일 중복 확인
export const emailCheck = async ({emailId}) => {
    // console.log(emailId,'유저API 이메일')
    const response = await axios.get(process.env.REACT_APP_API_URL+`/users/emailid/${emailId}`)
    // console.log(response)
    
    return response.data
}

// 새로운 비밀번호 설정(잃어버렸을 때)
export const newPassword = async (data) => {
    const response = await UserApi.put('/newpassword', data)
    // console.log(response)
    return response.data
}

// 알람 조회
export const notification = async () => {
    if (!localStorage.accessToken) {
        // console.log('토큰이 없습니다')
        return
    }
    const response = await axios.get(process.env.REACT_APP_API_URL+`/users/notifications`, {
        headers: {
            'Authorization': `Bearer ${localStorage.accessToken}`,
        }
    })
    // console.log(response)
    return response.data
}

// 알람 확인
export const checkNotification = async ({notificationid}) => {
    const response = await UserApi.get(`/notifications/${notificationid}`)
    // console.log(response)
    return response.data
}

// 알람 삭제
export const delNotification = async ({notificationid}) => {
    const response = await UserApi.delete(`/notifications/${notificationid}`)
    // console.log(response)
    return response.data
}

// 타인의 포트폴리오 조회
export const othersInfo = async (emailId) => {
    const response = await UserApi.get(`/${emailId}/portfolio`, emailId)
    // console.log(response)
    return response.data
}

// 유저 검색
export const userSearch = async (word) => {
    // console.log(word)
    const response = await UserApi.get(`/totalsearchuser/${word}`)
    return response.data
}

// 내가 작성한 공고
export const myGatherList = async({page, size}) => {
    const response = await UserApi2.get(`/recruit`, {
    params: {
        page,
        size
      }
    })
    return response.data
}

// 팔로워 리스트
export const followerList = async (emailId) => {
    const response = await UserApi.get(`/${emailId}/followees`)
    return response.data
}

// 팔로잉 리스트
export const followingList = async (emailId) => {
    const response = await UserApi.get(`/${emailId}/followers`)
    return response.data
}