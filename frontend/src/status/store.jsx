// 스토어를 만들어야 합니다. 괴도 ㅇㅂㅇ

import axios from "axios";
import { create } from "zustand";


const useStore = create(set => ({
  // 게시글
  posts:[],
  title:'',
  content :'',
  // 실험입니다.
  // 수정중
}))

export default useStore