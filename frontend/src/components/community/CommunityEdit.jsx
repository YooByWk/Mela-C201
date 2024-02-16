import { useNavigate, useParams } from "react-router-dom";
import { BoardDetail, BoardUpdate } from "../../API/BoardAPI";
import { useEffect, useState } from "react";
import useStore from "../../status/store";
import styled from "styled-components";

function CommunityEdit() {
  const { boardIdx } = useParams();
  // const currentUserIdx = useStore(s => s.user ? s.user.userIdx : null)
  const currentUserIdx = Number(localStorage.getItem('userIdx'));
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
      <Container>
        <form onSubmit={handleSubmit}>
          <div className="wrapper">
            <label className="label">Title</label>
            <input type="text" id="title" value={userinput.title} onChange={handleChange} className="input"/>
          </div>
          <div className="wrapper">
            <label className="label">Content</label>
            <textarea id="content" value={userinput.content} onChange={handleChange} className="input-textarea"/>
          </div>
          <div className="btnWrapper">
            <input type="submit" className="button" value='수 정'/>
          </div>
        </form>
      </Container>
    ) : ( 
      <div>당신은 이 게시글의 작성자가 아닙니다.</div> )
  )
}
    
export default CommunityEdit;


const Container = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  position: relative;

  .input {
    background-color: #202C44;
    border: none;
    height: 2.5rem;
    color: white;
    flex-grow: 1;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .input-textarea {
    background-color: #202C44;
    border: none;
    height: 15rem;
    color: white;
    flex-grow: 1;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
  }

  .label {
    color: #254EF8;
    font-size: x-large;
    margin-bottom: 10px;
  }

  .btnWrapper {
    position: absolute;
    right: 4rem;
  }

  .button {
    background-color: #254EF8;
    border: none;
    width: 3.5rem;
    height: 2rem;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
`