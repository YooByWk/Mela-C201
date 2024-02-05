import axios from "axios";
import { GetComment } from './BoardAPI';

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

export const GatherUpdate = async (data) => {
  const response = await GatherAPI.put(`${URL}/${data.gatherIdx}`, data, {
    headers : { 'Authorization' : `Bearer ${localStorage.accessToken}` }
  })
  return response;
}
