import React, { Fragment } from 'react';
import logo from "../assets/images/logo.png"
import styled from 'styled-components';

const H1 = styled.h1`
  font-family: InterBold;
  color: white;
  background-color: black;
`


function Homepage() {
  return (
   <Fragment>
    <header>
      <img src={logo} alt="경로이탈" />
    </header>
      <H1>Mela</H1>
      <br />
      <H1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptatum ab, magnam necessitatibus possimus eum reprehenderit odio quidem blanditiis distinctio nihil quis ut, nisi harum aut saepe repudiandae facilis quas?</H1>
    <footer></footer>
   </Fragment> 
  )
}
export default Homepage