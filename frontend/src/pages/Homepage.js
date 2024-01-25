import React, { Fragment } from 'react';
import logo from "../assets/images/logo.png"

function Homepage() {
  return (
   <Fragment>
    <header>
      <img src={logo} alt="경로이탈" />
    </header>
    <body>
      <h1>홈페이지</h1>
    </body>
    <footer></footer>
   </Fragment> 
  )
}
export default Homepage