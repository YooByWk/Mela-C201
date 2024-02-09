import { useState, useEffect } from "react";
import styled from "styled-components"
import { useParams } from "react-router-dom";
import { TeamspaceUpdate } from "../../API/TeamspaceAPI";
import { TeamspaceInfo } from "../../API/TeamspaceAPI";
import CalendarBox from "./calendar/CalendarBox";

const Container = styled.form`
    color: white;
`


function TeamspaceManage () {
    const { teamspaceIdx } = useParams()

    const [values, setValues] = useState({
        teamName: '',
        startDate: '',
        endDate: '',
        teamDescription: ''
      })
    
      const [imgFile, setImgFile] = useState('')
      const [backImgFile, setBackImgFile] = useState('')
      

    useEffect(()=> {
        const getTeamspaceInfo = async() => {
            try {
                const res = await TeamspaceInfo(teamspaceIdx)
                setValues(res)
            } catch (err) {
                console.error(err)
            }
        } 
        getTeamspaceInfo()
       
    }, [])

      const handleChange = async (e) => {
        setValues({...values,
        [e.target.id]: e.target.value,
        })
      }
    
      const handleImgFile = (e) => {
        e.preventDefault()
    
        if (e.target.files[0]) {
            setImgFile(e.target.files[0])
        }
      }
    
      const handleBackFile = (e) => {
        e.preventDefault()
    
        if (e.target.files[0]) {
            setBackImgFile(e.target.files[0])
        }
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        const updateInfo = JSON.stringify({
          teamName: values.teamName,
          startDate: values.startDate,
          endDate: values.endDate,
          teamDescription: values.teamDescription
        })
        formData.append('updateInfo', updateInfo)
        formData.append('teamspaceBackgroundPicture', backImgFile)
        formData.append('teamspacePicture', imgFile)
    
        try {
          const res = await TeamspaceUpdate({formData: formData, teamspaceId: teamspaceIdx})
          console.log(teamspaceIdx)
          console.log(res)
      } catch (err) {
          console.error(err)
      }
      }

    return(
    <Container onSubmit={handleSubmit}>
    <div>
        마감일 변경
        <CalendarBox />
        기존 마감일 : {values.endDate}
        선택된 마감일 : {}
        <button className='button' type='submit'>
              UPDATE
        </button>
    </div>
    <div>
        프로젝트 이미지 변경
        <div>
            썸네일 변경
            <input type="file" onChange={handleImgFile}/>
            <button className='button' type='submit'>
              UPDATE
        </button>
            배경 이미지 변경
            <input type="file" onChange={handleBackFile}/>
            <button className='button' type='submit'>
              UPDATE
        </button>
        </div>
    </div>
    <div>
        개요 변경
        <input type="text" value={values.teamDescription} id="teamDescription" onChange={handleChange}/>
        <button className='button' type='submit'>
              UPDATE
        </button>
    </div>
    <div>
        일정 관리
        
    </div>
    </Container>
    )
}

export default TeamspaceManage