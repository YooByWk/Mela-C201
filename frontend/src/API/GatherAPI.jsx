import axios from "axios";
import { GetComment } from './BoardAPI';

const URL = process.env.REACT_APP_API_URL+'/recruit'


export const GatherAPI = axios.create({ 
  baseURL: process.env.REACT_APP_API_URL+'/recruit'
}) 


export const GatherAPIAuth = axios.create({
  baseURL: process.env.REACT_APP_API_URL+'/recruit',
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


export const GatherPost = async (data) => {
  console.log(data,'dataaaaaaaaaaaaaaaaaaaaaaaa')
  try {
    const response = await GatherAPI.post(URL, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.accessToken}`
      }
    })
    (response)
    return response;
  }
  catch (error) {
    console.error(error);
  }
}

///////////////////////////

export const RecruitDetail = async({gatherIdx}) => {
  const response = await GatherAPI.get(`/${gatherIdx}`)
  return response
}



export const GatherDelete = async ({gatherIdx}) => {
  const response = await GatherAPI.delete(`${URL}/${gatherIdx}`, {
    headers : { 'Authorization' : `Bearer ${localStorage.accessToken}` }
  })
  return response;
}

export const GatherUpdate = async ({gatherIdx, data}) => {
  const response = await GatherAPI.put(`${URL}/${gatherIdx}`, data, {
    headers : { 'Authorization' : `Bearer ${localStorage.accessToken}` }
  })
  return response;
}

// 추천 공고
export const recommendList = async ({page, size, sortKey, word}) => {
  const response = await GatherAPIAuth.get(`${URL}/recommend`, {
    params: {
      page,
      size,
      sortKey,
      word
    }
  })
  return response.data
}