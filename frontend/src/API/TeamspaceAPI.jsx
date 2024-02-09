import axios from 'axios';

let ACCESS_TOKEN = localStorage.getItem('accessToken')

export const TeamspaceAPI = axios.create({
  baseURL: 'http://localhost:8080/api/v1/teamspaces',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
},
})

// 나의 팀스페이스 조회
export const TeamspaceList = async() => {
  const response = await TeamspaceAPI.get(`/`)
//   console.log(response)
  return response.data
}

// 팀스페이스 생성
export const TeamspaceGenerate = async(formdata) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/teamspaces', formdata, {
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

// 특정 팀스페이스 조회
export const TeamspaceInfo = async(teamspaceId) => {
    const response = await TeamspaceAPI.get(`/${teamspaceId}`)
    // console.log(response.data)
    return response.data
}

// 팀스페이스 정보 수정
export const TeamspaceUpdate = async({formData, teamspaceId}) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/v1/teamspaces/${teamspaceId}`, formData, {
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

//팀스페이스 삭제
export const TeamspaceDelete = async(teamspaceId) => {
    TeamspaceAPI.delete(`/${teamspaceId}`)
}

//팀스페이스 멤버 조회
export const TeamspaceMember = async(teamspaceId) => {
    const response = await TeamspaceAPI.get(`/${teamspaceId}/users`)
    // console.log(response.data)
    return response.data
}

//팀스페이스 멤버 탈퇴
export const TeamspaceMemberDelete = async(teamspaceId) => {
    TeamspaceAPI.delete(`/${teamspaceId}/users`)
}

//팀스페이스 멤버 추가
export const TeamspaceMemberInvite = async({
    teamspaceId,
    userId
}) => {
    const data = {
        teamspaceId,
        userId
    }

    const response = TeamspaceAPI.post(`/${teamspaceId}/users/${userId}`, data)

    // console.log(response.data)

    return response.data
}


// 팀스페이스 파일 업로드
export const uploadTeamspaceFile = async({
  formData, 
  teamspaceid
}) => {
  
    for (let key of formData.keys()) {
        console.log(key, ":", formData.get(key));
    }

  try {
    const response = await axios.post(`http://localhost:8080/api/v1/teamspaces/${teamspaceid}/file`, formData, {
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


//팀스페이스 파일 조회
export const TeamspaceFileList = async(teamspaceId) => {
  const response = await TeamspaceAPI.get(`/${teamspaceId}/file`)
  // console.log(response.data.statusCode)
  return response.data
}