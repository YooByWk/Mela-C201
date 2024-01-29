import React, { Fragment, useState } from 'react';
import logo from "../assets/images/logo.png"
import styled from 'styled-components';
import openSignupModal from '../components/Modals/Signupmodal'

// const H1 = styled.h1`
//   font-family: InterBold;
//   color: white;
//   background-color: black;
// `;

const Container = styled.div`
  background-color: #121212;
  div img {
    width: 20%;
  };
  &.Header-container {
    font-family: InterMedium;
    color: #ffffff;
  };
`;
// 반응형 ? 
// css 요소에는 ;를 달아서 표시중입니다.

function Homepage(props) {
  return (
   <Container>
    <header>  
      <Container className='Header-container'>
      <a href="/404">
        <img src={logo} alt="경로이탈"  />
      </a>
        <p>
          글자 테스트
        </p>
        <button>
          signup
        </button>
        <p>혹은 잘못 오셨나요?</p>
      </Container>
    </header>
    <footer></footer>
   </Container> 
  )
}


function Modal() {
  
  const [modalOpen, setModalOpen] = useState(false)
  
  // 모달창 오픈
  const openSignupModal = () => {
    setModalOpen(true)
  }

  // const openSigninModal = () => {
  //   setModalOpen(true)
  // }

  const closeSignupModal = () => {
    setModalOpen(false)
  }
  return (
    <React>
      <Fragment>
        <button onClick={openSignupModal}>
          signup
        </button>
        <openSignupModal open={ modalOpen } close={ closeSignupModal } header='Modal heading'>
          아오 힘드네 벌써
        </openSignupModal>
      </Fragment>
    </React>
  )
}

export { Homepage, Modal}