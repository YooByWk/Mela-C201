import axios from "axios";

const URL = 'http://localhost:8080/api/v1/recruit'


export const GatherAPI = axios.create({ 
  baseURL: 'http://localhost:8080/api/v1/recruit'
}) 

export const GatherAPIAuth = axios.create({
  baseURL: 'http://localhost:8080/api/v1/recruit',
  headers: { 'Authorization': `Bearer ${localStorage.accessToken}` }
 })

export const GatherList = async({page, size, sortKey, word}) => {
  const response = await GatherAPI.get(GatherAPI.baseURL, {
    params: {
      page,
      size,
      sortKey,
      word
    }
  })
  return response
}

export const RecruitDetail = async({GatherIdx}) => {
  const response = await GatherAPI.get(`detail/${GatherIdx}`)
  return response
}


export const GatherPost = async (data) => {
  console.log(data,'dataaaaaaaaaaaaaaaaaaaaaaaa')
  try {
    const response = await GatherAPI.post(URL, data, {
      headers: {
        'Authorization' : `Bearer ${localStorage.accessToken}`
      }
    })
    return response;
  }
  catch (error) {
    console.error(error);
  }
}


export const GetComment = async ({GatherIdx}) => {
  const url = `/${GatherIdx}/comments`;
  const Comments = await GatherAPI.get(url);
  return Comments;
} 


export const CreateComment = async ({GatherIdx, content}) => {
  const response = await GatherAPI.post(`${URL}/${GatherIdx}/comments`,{
    content
  }, {
    headers : { 'Authorization' : `Bearer ${localStorage.accessToken}` }
  })
  return response;
}


export const GatherDelete = async ({GatherIdx}) => {
  const response = await GatherAPI.delete(`${URL}/${GatherIdx}`, {
    headers : { 'Authorization' : `Bearer ${localStorage.accessToken}` }
  })
  return response;
}
