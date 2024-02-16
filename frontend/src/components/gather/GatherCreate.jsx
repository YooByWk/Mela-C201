import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../status/store";
import styled from "styled-components";
import { GatherPost } from "../../API/GatherAPI";
import GatherCal from "./GatherCal";
import { IoMdArrowRoundBack } from "react-icons/io";

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
    endDate: "",
  });

  const InputHandler = (event) => {
    setUserInput({
      ...userInput,
      [event.target.id]: event.target.value,
    });
  };

  const handleGenreChange = (event) => {
    const { checked, value } = event.target;
    if (checked && selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, value]);
    } else if (!checked) {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    } else if (checked && selectedGenres.length >= 3) {
      window.alert("장르는 최대 3개까지만 선택 가능합니다.");
      event.preventDefault();
      // console.log(selectedGenres);
    }
    // console.log(selectedGenres);
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

  const goBack = async () => {
    Navigate(-1);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log(userInput.endDate, "마감일");
    // console.log(userInput.title.length, "제목길이");
    if (selectedGenres.length < 1) {
      window.alert("장르를 선택해주세요.");
      return;
    }
    if (userInput.title.length < 1) {
      window.alert("제목을 입력해주세요.");
      return;
    }
    if (userInput.content.length < 1) {
      window.alert("내용을 입력해주세요.");
      return;
    }
    if (!userInput.endDate) {
      window.alert("마감일을 입력해주세요.");
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
    }
    // console.log("제출");
    // console.log(userInput);
    // console.log(selectedGenres);
    // console.log(selectedPositions);
    // console.log();
    const genreName1 = selectedGenres[0];
    const genreName2 = selectedGenres[1];
    const genreName3 = selectedGenres[2];
    const positions = selectedPositions;
    const data = {
      ...userInput,
      genreName1,
      genreName2,
      genreName3,
      positions,
    };
    // console.log(data);
    try {
      const response = await GatherPost(data);
      // console.log(response, "res");
      Navigate(`../detail/${response.data.message}`);
    } catch (error) {
      // console.error(error);
    }
  };

  if (isLogined) {
    return (
      <CreateDiv>
        <IoMdArrowRoundBack size="30" className="back-btn" onClick={goBack} />
        <form action="" onSubmit={submitHandler}>
          <div className="header">
            <div className="wrapper">
              <label className="label">장르</label>
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
            </div>
            <div className="wrapper">
              <label className="label">포지션</label>
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
            </div>
          </div>
          <div className="body">
            <div className="wrapper">
              <label className="label">Title</label>
              <input
                type="text"
                onChange={InputHandler}
                id="title"
                className="input"
              />
            </div>
            <div className="wrapper">
              <label className="label">Content</label>
              <Textbox
                name=""
                id="content"
                cols="90"
                rows="10"
                onChange={InputHandler}
              ></Textbox>
            </div>
          </div>
          <div className="btnWrapper">
            <input type="submit" value="등록" className="button" />
          </div>
          <div className="exdate">
            <label style={{ color: '#254ef8', marginRight: '1rem'}}>마감일</label>
            <GatherCal
              onDateChange={(date) =>
                setUserInput({ ...userInput, endDate: date })
              }
            />
          </div>
        </form>
      </CreateDiv>
    );
  } else {
    return (
      <div>
        <p>권한이 없습니다.</p>
        <button onClick={() => Navigate("../")}>돌아가기 </button>
      </div>
    );
  }
}

export default GatherCreate;

const CreateDiv = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  position: relative;

  .back-btn {
    background-color: #6c7383;
    border-radius: 10px;
    width: 3rem;
    position: absolute;
    right: 4rem;
    top: 1.5rem;
  }

  .header {
    display: flex;
  }

  .label {
    color: #254ef8;
    font-size: x-large;
    margin-bottom: 10px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
  }

  .body {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }

  .input {
    background-color: #202c44;
    border: none;
    height: 2.5rem;
    color: white;
    flex-grow: 1;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .btnWrapper {
    position: absolute;
    right: 4rem;
  }

  .button {
    background-color: #254ef8;
    border: none;
    width: 3.5rem;
    height: 2rem;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }

  .exdate {
    display: flex;
    align-items: center;
  }
`;

const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: auto;
  border: 1px solid #254ef8;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  gap: 10px;

  .label {
    color: #254ef8;
    font-size: x-large;
    margin-bottom: 10px;
  }
`;

const Textbox = styled.textarea`
  font-family: InterMedium;
  background-color: #202c44;
  border: none;
  color: white;
  border-radius: 10px;
  margin-bottom: 20px;
  resize: none;
`;
