import axios from 'axios';




export const BoardAPI = axios.create({
  baseURL: 'http://localhost:8080/api/v1/board'
})

export const BoardList = async() => {
  const response = await BoardAPI.get(BoardAPI.baseURL)
  console.log(BoardAPI.baseURL)
  console.log(response)
}
