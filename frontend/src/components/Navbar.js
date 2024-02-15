import styled from 'styled-components'
import logo from "../assets/images/logo.png"
import React, { useState, Fragment  } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';

const Container = styled.div`
  padding-top: 1%;
  display: flex;
  height: 3rem;
  color: #FFFFFF;
  font-family: InterMedium;
  font-size: larger;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.$backcolour==='10' ? props.theme.colours.point : props.theme.colours.primary};
  span {
    font-size: large;
    /* margin-left: 5% ; */
  }
  img {
    height: 3rem;
    margin-left: 2%;
    margin-right: 5%;

  }
  .MenuContainer {
    display: flex;
    justify-content: space-evenly;
    padding: 1%;
    width: 40%;
  }
  a {
    text-decoration: none;
  }
`
const activeStyle = {
  color: '#873FFA'
}
const deActiveStyle = {
  color: '#FFFFFF'
}

const SearchBar = styled.form`
  // 최상위
  position: relative;
  width: 30%;
  text-align: center;
  // search 문구 중앙 정렬
  display: flex;
  justify-content: center;
  align-items: center;
  // 인풋
  & > input {
    background-color: #202C44;
    min-height: 20px;
    width: 80%;
    height: 4vh;
    border:0;
    border-radius: 15rem;
    padding-left: 8%;
    /* min-width: 80px; */
    text-align: center;
    color: white;
    outline: none;
  };
  // Icon 위치 조절
  .Icon {
    background-color: #202C44;
    color: grey;
    position: absolute;
    top: 10%;
    left: 12%;
    height: 85%;
  };
`


function Navbar({backcolour, radius}) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('')
  function LogoClick(event) {
    // console.log(event, '홈으로 이동합니다.')
    navigate('/')
  }
  
  const handleChange = async(e) => {
    setSearchInput(e.target.value)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    navigate(`/search/${searchInput}`)
  }

  return (
    < >
      <Container $backcolour={backcolour}>
        <img  src={logo} alt="" onClick={LogoClick} />
          <SearchBar onSubmit={submitHandler}>
          <FaSearch className='Icon'/>
          <input id="search" type="text" spellCheck='false' placeholder='Search' onChange={handleChange} />
          </SearchBar>
      <div className='MenuContainer'>
        <span><NavLink
        style={({ isActive}) => (isActive? activeStyle : deActiveStyle)} to='/maingather'>Gather</NavLink></span>
        <span><NavLink
        style={({ isActive}) => (isActive? activeStyle : deActiveStyle)} to='/teamspace'>Team Space</NavLink></span>
        <span><NavLink
        style={({ isActive}) => (isActive? activeStyle : deActiveStyle)} to='/community'>Community</NavLink></span>
      </div>
      </Container>
      {/* <Sidebar /> */}
    </>
  )
}

export default Navbar