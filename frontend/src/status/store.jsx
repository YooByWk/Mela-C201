import axios from "axios";
import { useEffect } from "react";
import { create } from "zustand";

const useStore = create(set => ({
  islogined: localStorage.accessToken ? true : false,
  setIsLogined : (logined) => set({ islogined: logined}),
  user : null,
  userPortfolio : null,
  setUser : (user) => set({user: user}),

  fetchUser: async () => {
    if (!localStorage.accessToken) {
      return
    }
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL+`/users/myinfo`,{
        headers : {
          'Authorization' :`Bearer ${localStorage.accessToken}`
        }
      });
      set({user: response.data[0]})
      set({userPortfolio : response.data[1]})
      localStorage.setItem('userIdx', response.data[0].userIdx)
      // console.log(response.data[0], '유저정보')
    }
     catch(error) {
      console.error(error)
    }
  },
  
  logout : async () => {
    try {
      await axios.get(process.env.REACT_APP_API_URL+'/auth/logout', {
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
