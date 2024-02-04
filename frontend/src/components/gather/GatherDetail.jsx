import React from 'react';

import styled from 'styled-components';

import { useEffect, useState } from 'react';
import {RecruitDetail, GetComment, CreateComment, GatherDelete, CommentDelete,} from '../../API/GatherAPI';
import useStore from "../../status/store";
import { useNavigate, useParams } from 'react-router-dom';


const GatherDetail = () => {
  const [data, setData] = useState(null);
  const { gatherIdx } = useParams();
  const [comments, setComments] = useState(null);
  const [userInput, setUserInput] = useState("");
  const Navigate = useNavigate();
  const currentUserIdx = useStore(s => s.user ? s.user.userIdx : null)

  useEffect(()=>{
    const detailData = async () => {
      const response = await RecruitDetail({gatherIdx});
      setData(response.data);
      // const Comments = await GetComment({gatherIdx});
      // setComments(Comments.data);
    }
    detailData();
    console.log('data: ', data);
  })

  return (
    <div>
      <h1>GatherDetail</h1>
      <p>{gatherIdx}</p>
    </div>
  );
};

export default GatherDetail;