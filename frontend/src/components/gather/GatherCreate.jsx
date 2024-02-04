import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../status/store";
import styled from "styled-components";
import {GatherPost} from "../../API/GatherAPI";
import GatherCal from './GatherCal';

function GatherCreate() {
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
  const Navigate = useNavigate();
  const isLogined = useStore((state) => state.islogined);
  const [showLoginModal, setshowLoginModal] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [userInput, setUserInput] = useState({
    title: "",
    content: "",
    endDate: '',
  });


  const InputHandler = (event) => {
    setUserInput({
      ...userInput,
      [event.target.id]: event.target.value,
    });
    console.log(userInput)
  }



  const handleGenreChange = (event) => {
    const { checked, value } = event.target;
    if (checked && selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, value]);
    } else if (!checked) {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    } else if (checked && selectedGenres.length >= 3) {
      window.alert("장르는 최대 3개까지만 선택 가능합니다.");
      event.preventDefault();
      console.log(selectedGenres);
    }
    console.log(selectedGenres);
  };

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

  const submitHandler = async (event) => {
    event.preventDefault();
    if (selectedGenres.length < 1) { 
      window.alert("장르를 선택해주세요.");
      return}
    if (event.key === "Enter") {event.preventDefault();}
    console.log("제출");console.log(userInput);console.log(selectedGenres);console.log(selectedPositions);console.log()
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
    }
    console.log(data)
    try {
      const response = await GatherPost(data)
      console.log(response, "res");
  } catch (error) {
    console.error(error);
  }
}

// 보내줘 내가 쓴 글 번호 . .


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
        <input type="date" />
        <GatherCal onDateChange={(date) => setUserInput({ ...userInput, endDate: date })} />
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

export default GatherCreate;

const CreateDiv = styled.div`
  padding-top: 5%;
`;

const GenreContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  height: 60%;
  border: 1px solid black;
  margin: 5px;
`;

const Textbox = styled.textarea`
  font-family: InterMedium;
`