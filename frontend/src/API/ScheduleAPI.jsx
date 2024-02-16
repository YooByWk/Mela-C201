import axios from 'axios';

let ACCESS_TOKEN = localStorage.getItem('accessToken')

export const ScheduleAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/teamspaces',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
},
})

// 일정 목록
export const ScheduleList = async(teamspaceId) => {
  const response = await ScheduleAPI.get(`/${teamspaceId}/schedules`)
//   console.log(response)
  return response.data
}

// 일정 생성
export const ScheduleGenerate = async(teamspaceId, {
    content,
    endTime,
    place,
    startTime
}) => {
    const data = {
        content,
        endTime,
        place,
        startTime
    }
    const response = await ScheduleAPI.post(`/${teamspaceId}/schedules`, data)
    return response.data
}

// 일정 수정
export const ScheduleUpdate = async(teamspaceId, scheduleId, {
    content,
    endTime,
    place,
    startTime
}) => {
    const data = {
        content,
        endTime,
        place,
        startTime
    }
    const response = await ScheduleAPI.put(`/${teamspaceId}/schedules/${scheduleId}`, data)
    return response.data
}

// 일정 삭제
export const ScheduleDelete = async({teamspaceId, scheduleId}) => {
    const response = await ScheduleAPI.delete(`/${teamspaceId}/schedules/${scheduleId}`)

    return response.data
}