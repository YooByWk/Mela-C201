import axios from "axios";
import { useEffect } from "react";
import { create } from "zustand";

const useStore = create(set => ({
  islogined: localStorage.accessToken ? true : false,
  setIsLogined : (logined) => set({ islogined: logined}),
  user : null,
  setUser : (user) => set({user: user}),

  fetchUser: async () => {
    console.log('유저정보최신화')
    if (!localStorage.accessToken) {
      console.log('로그인되지 않음')
      return
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/users/myinfo`,{
        headers : {
          'Authorization' :`Bearer ${localStorage.accessToken}`
        }
      });
      set({user: response.data[0]})
      localStorage.setItem('userIdx', response.data[0].userIdx)
      // console.log(response.data[0], '유저정보')
    }
     catch(error) {
      console.error(error)
    }
  },
  
  logout : async () => {
    try {
      await axios.get('http://localhost:8080/api/v1/auth/logout', {
        headers : {
          'Authorization' :`Bearer ${localStorage.accessToken}`
        }
      });
      set({user: null});
      localStorage.clear();
      set({islogined: false});
      alert('로그아웃');
      window.location.href = `/`
    } catch (error) {
      console.error('Logout failed', error);
    }
  },

}))



export default useStore
