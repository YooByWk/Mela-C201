import axios from 'axios';




export const BoardAPI = axios.create({
  baseURL: 'http://localhost:8080/api/v1/board'
})

export const BoardList = async({page, size, sortKey, word}) => {
  const response = await BoardAPI.get(BoardAPI.baseURL, {
    params: {
      page,
      size,
      sortKey,
      word
    }
  })
  console.log(response)
  return response
}

export const BoardPost = () => {}