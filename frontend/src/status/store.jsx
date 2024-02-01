// 스토어를 만들어야 합니다. 괴도 ㅇㅂㅇ

import axios from "axios";
import { redirect } from "react-router-dom";
import { create } from "zustand";

const useStore = create(set => ({
  islogined: false,
  setIsLogined : (logined) => set({ islogined: logined}),
  user : null,
  fetchUser: async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/users/myinfo`,{
        headers : {
          'Authorization' :`Bearer ${localStorage.accessToken}`
        }
      });
      set({user: response.data})
    }
     catch(error) {
      console.error(error)
    }
  },
  logout : () => {
    set({user: null})
    localStorage.clear()
    set({islogined: false})
    window.alert('로그아웃')
    window.location.href = `/`
  },
}))

export default useStore