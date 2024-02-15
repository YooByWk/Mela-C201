import axios from "axios";
import useStore from "../../status/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoardCreate } from "../../API/BoardAPI";
import { IoMdArrowRoundBack } from "react-icons/io";
import styled from "styled-components";


function CommunityCreate() {
  const Navigate = useNavigate()
  const islogined = useStore((state) => state.islogined);
  const [showLoginModal, setshowLoginModal] = useState(false)
  const [open, setOpen] = useState(false)

  // 로그인 여부에 따라서.


  const [userinput, setUserInput]  = useState({
    title: '',
    content: '',
  })
  


  const SubmitHandler = async (event)=> {
    event.preventDefault();
    // console.log(userinput.title.length, '제목길이')
    if (userinput.title.length < 1 ) { 
      window.alert('제목을 입력해주세요')
      return;
     }
    if (event.key === 'Enter') {
      event.preventDefault();
    }
    // console.log('제출');
    // console.log(userinput);
    
    try {
      const response = await BoardCreate({content: userinput.content, title: userinput.title});
      Navigate(`../${response.data.message}`)
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleChange = async (event) => {
    setUserInput({
      ...userinput,
      [event.target.id] : event.target.value
    })
  }

  const goBack = async () => {
    Navigate(-1)
  }

  if (islogined) {
    return (
      <>
      <Container>
      <IoMdArrowRoundBack size='30' className="back-btn" onClick={goBack}/>
        <form action="" onSubmit={SubmitHandler}>
          <div className="wrapper">
            <label className="label">Title</label>
            <input type="text" id='title' onChange={handleChange} className="input"/>
          </div>
          <div className="wrapper">
            <label className="label">Content</label>
            <textarea type="text" id='content' onChange={handleChange} className="input-textarea"/>
          </div>
          <div className="btnWrapper">
            <input type="submit" className="button" value='작 성'/>
          </div>
        </form>
      </Container>
      </>
    );
  }
}



export default CommunityCreate;


const Container = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  position: relative;

  .back-btn {
    background-color: #6C7383;
    border-radius: 10px;
    width: 3rem;
    position: absolute;
    right: 4rem;
    top: 1.5rem;
  }

  .label {
    color: #254EF8;
    font-size: x-large;
    margin-bottom: 10px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
  }

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
    resize: none;
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