import { useNavigate, useParams } from "react-router-dom";
import { BoardDetail, BoardUpdate } from "../../API/BoardAPI";
import { useEffect, useState } from "react";
import useStore from "../../status/store";
function CommunityEdit() {
  const { boardIdx } = useParams();
  const currentUserIdx = useStore(s => s.user ? s.user.userIdx : null)
  const [alertShown, setAlertShown] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false)
  
  const [userinput, setUserInput] = useState({
    title: '',
    content: '',
  });
  const navi = useNavigate()
  
  useEffect(() => {
    const fetchBoardDetail = async () => {
      const response = await BoardDetail({ boardIdx });
      setUserInput({
        title: response.data.title,
        content: response.data.content
      });
      console.log(response.data)
      setIsAuthor(response.data.userIdx === currentUserIdx)

    };
    fetchBoardDetail();
  }, [boardIdx,currentUserIdx]);

  useEffect(() => {
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
    await BoardUpdate({ boardIdx, ...userinput });
    window.alert('게시글이 수정되었습니다')
    navi(`/community/${boardIdx}`)
  };
  
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
