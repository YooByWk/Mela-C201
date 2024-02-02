import { useNavigate, useParams } from "react-router-dom";
import { BoardDetail, BoardUpdate } from "../../API/BoardAPI";
import { useEffect, useState } from "react";
import useStore from "../../status/store";

function CommunityEdit() {
  const { boardIdx } = useParams();
  const currentUserIdx = useStore(s => s.user ? s.user.userIdx : null)
  const [alertShown, setAlertShown] = useState(false);
  const [isAuthor, setIsAuthor] = useState(null)
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  
  const [userinput, setUserInput] = useState({
    title: '',
    content: '',
  });
  
  const navi = useNavigate()
  
  useEffect(() => {
    const fetchBoardDetail = async () => {
      setIsLoading(true); // API 호출을 시작하기 전에 로딩 상태를 true로 설정

      const response = await BoardDetail({ boardIdx });
      setUserInput({
        title: response.data.title,
        content: response.data.content
      });
      setIsAuthor(response.data.userIdx === currentUserIdx)
      setIsLoading(false); // API 호출이 완료되면 로딩 상태 false
    };
    fetchBoardDetail();
  }, [boardIdx, currentUserIdx]);

  useEffect(() => {
    if (isAuthor === null) return; 
  
    if (!isAuthor && !alertShown) {
      navi(`/community/${boardIdx}`);
      window.alert('당신은 이 게시글의 작성자가 아닙니다');
      setAlertShown(true);
    }
  }, [isAuthor, alertShown, navi, boardIdx]);
  
  const handleChange = (event) => {
    setUserInput({
      ...userinput,
      [event.target.id]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isAuthor) {
      await BoardUpdate({ boardIdx, ...userinput });
      window.alert('게시글이 수정되었습니다');
      navi(`/community/${boardIdx}`);
    } else {
      window.alert('당신은 이 게시글의 작성자가 아닙니다');
    }
  };
  
  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 중일 때는 로딩 메세지
  }
  return (
    isAuthor ? ( 
      <form onSubmit={handleSubmit}>
        <h2>Title</h2>
        <input type="text" id="title" value={userinput.title} onChange={handleChange} />
        <h2>Content</h2>
        <textarea id="content" value={userinput.content} onChange={handleChange} />
        <input type="submit" />
      </form>
    ) : ( 
      <div>당신은 이 게시글의 작성자가 아닙니다.</div> )
  )
}
    
export default CommunityEdit;
