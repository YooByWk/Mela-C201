import { useState, useEffect } from "react";
import styled from "styled-components"
import { useParams } from "react-router-dom";
import { TeamspaceUpdate } from "../../API/TeamspaceAPI";
import { TeamspaceInfo } from "../../API/TeamspaceAPI";
import { IoReload } from "react-icons/io5";
import moment from 'moment';


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
      <div className="date-image">
        <div className="date">
          <h2>마감일 변경</h2>
          <div className="update">
            <p>기존 마감일 : {moment(values.endDate).format('YY-MM-DD(ddd)')}</p>
            <button className='button' type='submit'>
              <IoReload className="icon"/>
              <span>Update</span>
            </button>
          </div>
        </div>
        <div className="iamge">
          <h2>프로젝트 이미지 변경</h2>
          <div className="image-body">
            <div className="thumnail">
              
            </div>
            <div className="thum">
              <label htmlFor="">썸네일 변경</label>
              <input type="file" onChange={handleImgFile}/>
              <button className='button' type='submit'>
                <IoReload className="icon"/>
                <span>Update</span>
              </button>
            </div>
            <div className="background">
              <label htmlFor="">배경 이미지 변경</label>
              <input type="file" onChange={handleBackFile}/>
              <button className='button' type='submit'>
                <IoReload className="icon"/>
                <span>Update</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="description">
        <h3>개요 변경</h3>
          <textarea type="text" value={values.teamDescription} id="teamDescription" onChange={handleChange}/>
          <button className='button' type='submit'>
            <IoReload className="icon"/>
            <span>Update</span>
          </button>
      </div>
    </Container>
    )
}

export default TeamspaceManage


const Container = styled.form`
    color: white;
    display: flex;
    flex-direction: column;
    flex: 1;

  .date-image {
    display: flex;
  }

  .date {
    flex: 1;
  }

  .update {
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }

  .button {
    background-color: #254ef8;
    border-radius: 20px;
    margin-left: 1rem;
  }

  .icon {
    margin-right: 5px;
  }

  .image-body {
    margin-top: 1rem;
  }

  .image {
    flex: 1;
  }

  .description {
    display: flex;
    flex-direction: column;
    background-color: #151C2C;
  }
`
