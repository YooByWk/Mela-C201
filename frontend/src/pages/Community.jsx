// 커뮤니티 게시판 메인
import React from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Sidebar from './../components/Sidebar';

// import { mainTheme } from './../styles/theme';


const CommunityContainer = styled.div`
  /* background-color: ${props => props.theme.colours.primary}; */
  display: flex;
  /* flex-direction: column; */
  height: 70rem;
  padding-top: 2.5% ;
`;

const ComCon = styled.div`
  color : white;
  & > hr {
    border: 3px dashed green;
    border-color: ${props => props.theme.colours.third};
  }
`
console.log()
const Community = () => {
  return (
    <ComCon>
        <h1>
        Community : 이러면 안되는 개발의 표본
        </h1>
<hr />
<hr />
<br />
<br />
<br />
<h1>테그별 태스트</h1>
<h2>테그별 태스트</h2>
<h3>테그별 태스트</h3>
    </ComCon>
  );
};

export default Community;