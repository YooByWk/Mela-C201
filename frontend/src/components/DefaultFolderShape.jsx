import React from 'react';
import styled from 'styled-components';



const Container = styled.div`
/* Rectangle 4017 */

  position: absolute;
  left: 27.75%;
  right: 5.5%;
  top: 20.94%;
  bottom: 27.75%;
  // 폴더 모양으로 자르기
  // 참고 => https://bennettfeely.com/clippy/
  clip-path: polygon(47% 0, 61% 15%, 100% 15%, 100% 75%, 0 75%, 0 0);
  
  width: 350px;
  height: 320px;
  
  /* bar color

  검색창 등 컴포넌트 색
  */
  background: #202C44;
  box-shadow: 0px 11px 5px #1B263B;
  border-radius: 20px;


    &:hover{
  /* Rectangle 4017 */

  position: absolute;
  left: 27.75%;
  right: 5.5%;
  top: 20.94%;
  bottom: 27.75%;

  background: linear-gradient(180deg, #873FFA 29.5%, #254EF8 100%);
  box-shadow: 0px 11px 5px #342C93;
  border-radius: 20px;

  }
`

// 프로젝트 이름
const Title = styled.span`
    
`

// 프로젝트 설명
const Content = styled.span`
    
`

// 프로젝트 디데이
const Day = styled.span`
  
`

const DefaultFileShape = (props) => {
    return (
        <>
        <Container
            width={props.width}
            onClick={props.onClick}
        >
            <Title>
                {props.text}
            </Title>
            <Content>
                {props.text}
            </Content>
            <Day>
                {props.text}
            </Day>
        </Container>
        </>
    )
}

DefaultFileShape.defaultProps={
    title: 'Project name',
    content: '프로젝트 설명',
    day: 'D-??',
    width: '1rem',
    onClick: () => {}
}

export default DefaultFileShape
