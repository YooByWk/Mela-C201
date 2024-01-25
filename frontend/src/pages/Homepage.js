import React, { Fragment } from 'react';
import logo from "../assets/images/logo.png"
import styled from 'styled-components';

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

function Homepage() {
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
      </Container>

    </header>
      <h1>Mela</h1>
      <br />
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptatum ab, magnam necessitatibus possimus eum reprehenderit odio quidem blanditiis distinctio nihil quis ut, nisi harum aut saepe repudiandae facilis quas?</h1>
    <footer></footer>
   </Container> 
  )
}
export default Homepage