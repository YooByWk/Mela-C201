import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

/* member-04 */

position: absolute;
width: 150px;
height: 200px;
left: 0px;
top: 0px;



/* Rectangle 4343 */

position: absolute;
left: 20%;
right: -33.33%;
top: 80%;
bottom: -75%;

/* card color

카드컴포넌트 색
*/
background: #151C2C;
border-radius: 5px;
`

const Position = styled.div`
position: absolute;
left: 7.33%;
right: 40.67%;
top: 74%;
bottom: 17.5%;

font-family: 'Inter';
font-style: normal;
font-weight: 200;
font-size: 14px;
line-height: 17px;
/* identical to box height */
text-align: center;

color: #FFFFFF;
`


const Name = styled.div`
/* Albert Flores */
position: absolute;
left: 7.33%;
right: 36%;
top: 64%;
bottom: 27.5%;

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 17px;
/* identical to box height */
text-align: center;

color: #FFFFFF;
`


const Image = styled.div`
    
/* profile */

position: absolute;
left: 18.67%;
right: 18.67%;
top: 0%;
bottom: 38%;

background-image: ${(props) => props.backgroundimage};
`

const LastLoginContainer = styled.div`
/* last-login-text */
position: absolute;
width: 137px;
height: 12px;
left: 6px;
top: 184px;
`


const LastLogin = styled.div`
/* Last login : */
position: absolute;
left: 4%;
right: 61.33%;
top: 92%;
bottom: 2%;

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 10px;
line-height: 12px;
text-align: center;

color: #FFFFFF;

opacity: 0.5;
`

const LastLoginText = styled.div`
/* 2024.01.22 15:33 */
position: absolute;
left: 40.67%;
right: 4.67%;
top: 92%;
bottom: 2%;

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 10px;
line-height: 12px;
text-align: center;

color: #FFFFFF;

opacity: 0.5;
`

const TeamspaceMember = (props) => {
    return (
        <>
        <Container
            onClick={props.onClick}
        >
            <Image
            background-image={props.backgroundimage}
            />
            <Name>
                {props.name}
            </Name>
            <Position>
                {props.position}
            </Position>
            <LastLoginContainer>
                <LastLogin>
                </LastLogin>
                <LastLoginText>
                    {props.lastlogin}
                </LastLoginText>
            </LastLoginContainer>
        </Container>
        </>
    )
}

TeamspaceMember.defaultProps={
    backgroundimage: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1223671392%2Fko%2F%25EB%25B2%25A1%25ED%2584%25B0%2F%25EA%25B8%25B0%25EB%25B3%25B8-%25ED%2594%2584%25EB%25A1%259C%25ED%2595%2584-%25EC%2582%25AC%25EC%25A7%2584-%25EC%2595%2584%25EB%25B0%2594%25ED%2583%2580-%25EC%2582%25AC%25EC%25A7%2584-%25EC%259E%2590%25EB%25A6%25AC-%25ED%2591%259C%25EC%258B%259C%25EC%259E%2590-%25EB%25B2%25A1%25ED%2584%25B0-%25EC%259D%25BC%25EB%259F%25AC%25EC%258A%25A4%25ED%258A%25B8%25EB%25A0%2588%25EC%259D%25B4%25EC%2585%2598.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3DZ1Yi41x1bDPNjBG5KAn51ZRFfslI4Pz01BOqaRjuzRk%3D&tbnid=a4n896Xv4jfRpM&vet=12ahUKEwj3z-bHjYmEAxWf3DQHHYzxBgsQMyg5egUIARDzAQ..i&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fkr%2F%25EB%25B2%25A1%25ED%2584%25B0%2F%25EA%25B8%25B0%25EB%25B3%25B8-%25ED%2594%2584%25EB%25A1%259C%25ED%2595%2584-%25EC%2582%25AC%25EC%25A7%2584-%25EC%2595%2584%25EB%25B0%2594%25ED%2583%2580-%25EC%2582%25AC%25EC%25A7%2584-%25EC%259E%2590%25EB%25A6%25AC-%25ED%2591%259C%25EC%258B%259C%25EC%259E%2590-%25EB%25B2%25A1%25ED%2584%25B0-%25EC%259D%25BC%25EB%259F%25AC%25EC%258A%25A4%25ED%258A%25B8%25EB%25A0%2588%25EC%259D%25B4%25EC%2585%2598-gm1223671392-359532514&docid=tKx81fxstWmAfM&w=612&h=612&q=%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84&ved=2ahUKEwj3z-bHjYmEAxWf3DQHHYzxBgsQMyg5egUIARDzAQ',
    name: '이름',
    position: '포지션',
    lastlogin: '????.??.??',
    onClick: () => {}
}

export default TeamspaceMember
