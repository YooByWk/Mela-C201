import { useParams } from 'react-router-dom';
import  {BoardDetail}  from '../../API/BoardAPI'
import styled from 'styled-components'
import { useEffect, useState } from 'react';




function CommunityDetail() {
  const [data, setData] = useState(null)
  const {boardIdx} =  useParams()

  useEffect(()=> {
    console.log(boardIdx)
    const detailData = async () => {
    const response = await BoardDetail({boardIdx})
    setData(response.data)
    };
    
    detailData()
  }, [])

const check = () => {
  console.log(data)
}

let idx, content, nickname, registDate, title, updateDate, userIdx, viewNum

if (data) {
  ({idx, content, nickname, registDate, title, updateDate, userIdx, viewNum} = data);
}

return ( 
  <MainDiv>
    <hr />
    <p>해당 글의 인덱스</p>
    <button onClick={check}>글 정보 보기</button>
    {data && (
      <>
        <p>idx :  {idx}</p>
        <p>content :  {content}</p>
        <p>nickname :  {nickname}</p>
        <p>registDate :  {registDate}</p>
        <p>title :  {title}</p>
        <p>updateDate :  {updateDate}</p>
        <p>userIdx :  {userIdx}</p>
        <p>조회수 : {viewNum}</p>
      </>
    )}
    <hr />
  </MainDiv>
);
}

export default CommunityDetail;

const MainDiv = styled.div`
  margin-top: 5%;
`