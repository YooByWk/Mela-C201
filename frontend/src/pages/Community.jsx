// 커뮤니티 게시판 메인
import React from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Sidebar from './../components/Sidebar';

// import { mainTheme } from './../styles/theme';


const CommunityContainer = styled.body`
  background-color: ${props => props.theme.colours.primary};
  /* color : white; */
  display: flex;
  flex-direction: row;
  height: 70rem;
  & > Sidebar {
    margin-right: 15%;
  }
  padding-top: 2.5% ;
`;
const Community = () => {
  return (
    <>

        <h1>
        Community : 이러면 안되는 개발의 표본
        </h1>

    </>
  );
};

export default Community;