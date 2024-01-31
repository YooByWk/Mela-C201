import axios from 'axios';




export const BoardAPI = axios.create({
  baseURL: 'http://localhost:8080/api/v1/board'
})

export const BoardList = async({page, size}) => {
  const response = await BoardAPI.get(BoardAPI.baseURL, {
    params: {
      page,
      size,
    }
  })
  console.log(BoardAPI.baseURL,'url')
  console.log(response, 'boardAPI response')
  return response
}
