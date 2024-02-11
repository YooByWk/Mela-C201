import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
/* Rectangle 4017 */

  // 폴더 모양으로 자르기
  // 참고 => https://bennettfeely.com/clippy/
  clip-path: polygon(47% 0, 61% 15%, 100% 15%, 100% 75%, 0 75%, 0 0);
  
  width: ${props => props.width};
  height: 100%;
    
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
  /* bar color

  검색창 등 컴포넌트 색
  */
  background: #202C44;
  box-shadow: 0px 11px 5px #1B263B;
  border-radius: 20px;

  justify-content: space-evenly;
  padding-bottom: 5%;
  padding-left: 3vw;
  padding-right: 3vw;

.titleday{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

    &:hover{
  /* Rectangle 4017 */
  background: linear-gradient(180deg, #873FFA 29.5%, #254EF8 100%);
  box-shadow: 0px 11px 5px #342C93;
  border-radius: 20px;
  }
`

// 프로젝트 이름
const Title = styled.span`
    color: white;
    font-weight: bold;
    /* top: 70px;
    left: 30px; */
    font-size: x-large;
`

// 프로젝트 설명
const Content = styled.span`
    color: white;
    /* top: 180px;/ */
`

// 프로젝트 디데이
const Day = styled.span`
  color: white;
  /* top: 70px;
  right: 30px; */
`



const FolderNoImage = (props) => {



    return (
        <>
        <Container
            width={props.width}
            onClick={props.onClick}
        >

            <div className='titleday'>
            <Title>
                {props.title}
            </Title>
            <Day>
                {props.day}
            </Day>
            </div>

            <Content>
                {props.content}
            </Content>


        </Container>
        </>
    )
}

FolderNoImage.defaultProps={
    title: 'Project name',
    content: '프로젝트 설명',
    day: 'D-??',
    width: '1rem',
    height: '1rem',
    onClick: () => {}
}

export default FolderNoImage
