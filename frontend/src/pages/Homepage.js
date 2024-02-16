import React, { Fragment, useState } from 'react';
import logo from "../assets/images/logo.png"
import styled from 'styled-components';

const H1 = styled.h1`
  font-family: InterBold;
`;

const Container = styled.div`
  div img {
    width: 20%;
  };
  &.Header-container {
    font-family: InterMedium;
  };
`;

// 반응형 ? 
// css 요소에는 ;를 달아서 표시중입니다.

export function Homepage(props) {
  return (
   <Container>
    <header>  
      {/* <Container className='Header-container'>
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
      </Container> */}
    </header>
    <footer>
      <H1>
        Homepage ?
      </H1>
    </footer>
   </Container> 
  )
}

export default Homepage
