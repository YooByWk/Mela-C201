import axios from "axios";

export const scheduleAPI = axios.create({
  baseURL: 'http://localhost:8080/api/v1/teamspaces',
  headers: { 'Authorization': `Bearer ${localStorage.accessToken}` }
 })

export const ScheduleList = async(teamspaceId) => {
  // console.log(teamspaceId)
  const response = await scheduleAPI.get(`/${teamspaceId.teamspaceId}/schedules`, teamspaceId.teamspaceId)
  return response.data
}
