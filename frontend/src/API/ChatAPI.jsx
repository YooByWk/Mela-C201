import axios from 'axios'

let ACCESS_TOKEN = localStorage.getItem('accessToken')

export const ChatAPI = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
})

// 모든 채팅방 조회
export const ChatList = async () => {
    const response = await ChatAPI.get(`/chatrooms`)
    return response.data
}

// 채팅방 생성
export const CreateChat = async({ otheruserid }) => {
    const response = await ChatAPI.post(`/chatrooms/${otheruserid}`)
    return response.data
}

// 채팅 내역 조회(단일) - 입장
export const EnterChat = async ({ roomid }) => {
    const response = await ChatAPI.get(`/chatrooms/${roomid}`)
    return response.data
}

// 채팅 유저 목록(최신순)
export const RecentUser = async () => {
    const response = await ChatAPI.get(`/chatrooms/recentusers`)
    return response.data
}

// 팀스페이스 채팅방
export const teamspaceChat = async ({ teamspaceid }) => {
    const response = await ChatAPI.get(`/chatrooms/teamspaces/${teamspaceid}`)
    return response.data
}