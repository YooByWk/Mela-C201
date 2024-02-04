import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../status/store";
import styled from "styled-components";
import { GatherPost, GatherList, GatherUpdate } from "../../API/GatherAPI";

// 1. GatherEdit 컴포넌트 정의
function GatherEdit() {
  const genres = [
    "Pop",
    "Rock",
    "Hiphop",
    "Classic",
    "Jazz",
    "R&B",
    "Disco",
    "Electrionic",
    "Balad",
    "Country",
    "Reggae",
    "Folk",
    "Etc",
  ];

  const positions = ["보컬", "작곡", "작사", "세션", "믹싱", "기타"];
  
  // 2. 필요한 state 변수들 정의
  const Navigate = useNavigate();
  const isLogined = useStore((state) => state.islogined);
  const [showLoginModal, setshowLoginModal] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [userInput, setUserInput] = useState({
    title: "",
    content: "",
  });

  const { id } = useParams();

  // 3. 수정할 글 데이터 불러오기
  useEffect(() => {
    const fetchGather = async () => {
      const res = await GatherList(id);
      setUserInput({
        title: res.data.title,
        content: res.data.content,
      });
      setSelectedGenres([res.data.genreName1, res.data.genreName2, res.data.genreName3].filter(Boolean));
      setSelectedPositions(res.data.positions);
    }
    fetchGather();
  }, [id]);

  // 4. 입력 핸들러 함수 정의
  const InputHandler = (event) => {
    setUserInput({
      ...userInput,
      [event.target.id]: event.target.value,
    });
  }

  // 5. 장르 핸들러 함수 정의
  const handleGenreChange = (event) => {
    const { checked, value } = event.target;
    if (checked && selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, value]);
    } else if (!checked) {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    } else if (checked && selectedGenres.length >= 3) {
      window.alert("장르는 최대 3개까지만 선택 가능합니다.");
      event.preventDefault();
    }
  };

  // 6. 포지션 핸들러 함수 정의
  const handlePositionChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedPositions([...selectedPositions, value]);
    } else if (!checked) {
      setSelectedPositions(
        selectedPositions.filter((position) => position !== value)
      );
    }
  };

  // 7. 제출 핸들러 함수 정의
  const submitHandler = async (event) => {
    event.preventDefault();
    if (selectedGenres.length < 1) { 
      window.alert("장르를 선택해주세요.");
      return}
    if (event.key === "Enter") {event.preventDefault();}
    const genreName1 = selectedGenres[0]
    const genreName2 = selectedGenres[1] 
    const genreName3 = selectedGenres[2]
    const positions = selectedPositions
    const data = {
      ...userInput,
      genreName1,
      genreName2,
      genreName3,
      positions,
      endDate : '2000-01-01'
    }
    try {
      const response = await GatherUpdate(id, data);
      Navigate(`/gather/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // 8. 렌더링
  if (isLogined)
  { return (
    <CreateDiv>
      <form action="" onSubmit={submitHandler} >
      <h2>제목</h2>
      <input type="text" onChange={InputHandler} id='title'/>
      <h3>내용</h3>
      <Textbox name="" id="content" cols="90" rows="10" onChange={InputHandler}></Textbox>
        <h3>장르</h3>
        <GenreContainer>
          {genres.map((genre) => (
            <div key={genre}>
              <input
                type="checkbox"
                id={genre}
                value={genre}
                onChange={handleGenreChange}
              />
              <label htmlFor={genre}>{genre}</label>
            </div>
          ))}
        </GenreContainer>
        <h3>포지션</h3>
        <GenreContainer>
          {positions.map((position) => (
            <div key={position}>
              <input
                type="checkbox"
                id={position}
                value={position}
                onChange={handlePositionChange}
              />
              <label htmlFor={position}>{position}</label>
            </div>
          ))}
        </GenreContainer>
        <input type="submit" value="등록" />
      </form>
    </CreateDiv>
  )} else {
    return (
    <div>
      <p>권한이 없습니다.</p>
      <button onClick={() => Navigate('../')}>돌아가기 </button>
    </div>)
  }
}

export default GatherEdit;

const CreateDiv = styled.div`
  padding-top: 5%;
`;

const GenreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60%;
  border: 1px solid black;
  margin: 5px;
`;

const Textbox = styled.textarea`
  font-family: InterMedium;
`
