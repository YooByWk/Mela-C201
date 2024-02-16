import { useState, useEffect } from "react";
import styled from "styled-components"
import { useParams } from "react-router-dom";
import { TeamspaceUpdate } from "../../API/TeamspaceAPI";
import { TeamspaceInfo } from "../../API/TeamspaceAPI";
import { IoReload } from "react-icons/io5";
import moment from 'moment';
import Datepicker from 'react-datepicker'


function TeamspaceManage () {
    const { teamspaceIdx } = useParams()

    const [values, setValues] = useState({
        teamName: '',
        startDate: '',
        endDate: '',
        teamDescription: ''
      })
    
      const [imgFile, setImgFile] = useState('')
      const [imgPreview, setImgPreview] = useState('')
      const [backImgFile, setBackImgFile] = useState('')
      const [backImgPreview, setBackImgPreview] = useState('')
      const [changeDate, setChangeDate] = useState(new Date())

    useEffect(()=> {
        const getTeamspaceInfo = async() => {
            try {
                const res = await TeamspaceInfo(teamspaceIdx)
                setValues(res)
                setImgFile(res.teamspacePictureFile)
                setImgPreview(res.teamspacePictureFileURL)
                setBackImgFile(res.teamspaceBackgroundPictureFile)
                setBackImgPreview(res.teamspaceBackgroundPictureFileURL)
                setChangeDate(res.endDate)
              } catch (err) {
            }
        } 
        getTeamspaceInfo()
    }, [teamspaceIdx])

      const handleChange = async (e) => {
        setValues({...values,
        [e.target.id]: e.target.value,
        })
      }

      const handleDateChange = (date) => {
        const formmatedDate = moment(date).format('YYYY-MM-DD')
        setChangeDate(formmatedDate)
      }
    
      const handleImgFile = (e) => {
        e.preventDefault()
    
        if (e.target.files[0]) {
            setImgFile(e.target.files[0])
            setImgPreview(URL.createObjectURL(e.target.files[0]))
        }
      }
    
      const handleBackFile = (e) => {
        e.preventDefault()
    
        if (e.target.files[0]) {
            setBackImgFile(e.target.files[0])
            setBackImgPreview(URL.createObjectURL(e.target.files[0]))
        }
      }
      // console.log(values)
      // console.log(backImgFile)
      // console.log(imgFile)
      const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        const updateInfo = JSON.stringify({
          teamName: values.teamName,
          startDate: values.startDate,
          endDate: changeDate,
          teamDescription: values.teamDescription
        })
        formData.append('updateInfo', updateInfo)
        formData.append('teamspaceBackgroundPicture', backImgFile)
        formData.append('teamspacePicture', imgFile)
    
        try {
          const res = await TeamspaceUpdate({formData: formData, teamspaceId: teamspaceIdx})
          // console.log(teamspaceIdx)
          // console.log(res)
          alert('정보가 업데이트 되었습니다.')
      } catch (err) {
          // console.error(err)  
      }
      }

    return(
    <Container onSubmit={handleSubmit}>
      <div className="date-image">
        <div className="date">
          <h2>마감일 변경</h2>
          <div className="update">
            <p>기존 마감일 : {moment(values.endDate).format('YY-MM-DD(ddd)')}</p>
            <div className="inputWrapper">
              <label for="endDate">변경 마감일 : </label>
              <MyDatePicker
                id='endDate'
                dateFormat='yyyy-MM-dd'
                shouldCloseOnSelect
                selected={changeDate}
                onChange={handleDateChange}
                popperPlacement="right"
              />
            </div>
          </div>
          <div className="description">
            <h2>개요 변경</h2>
              <textarea 
                type="text" 
                value={values.teamDescription}
                id="teamDescription"
                onChange={handleChange}
                rows='7'
              />
          </div>
        </div>
        <div className="iamge">
          <h2>프로젝트 이미지 변경</h2>
          <div className="image-body">
            <div className="thum-change">
              <div className="thum">
                <label className="label">썸네일 변경</label>
                <div className="input">
                    <label className='label-file' for="input-file-thum">파일 선택</label>
                    <input 
                    type='file' 
                    className='input' 
                    onChange={handleImgFile} 
                    accept=".jpg,.jpeg,.png" 
                    style={{display: "none"}} 
                    id="input-file-thum"/>
                </div>
              </div>
              <div className="thumnail">
                {imgPreview && <img src={imgPreview} alt="미리보기" />}
              </div>
            </div>
            <hr />
            <div className="background">
              <div className="thum">
                <label className="label">배경 이미지 변경</label>
                <div className="input">
                    <label className='label-file' for="input-file-back">파일 선택</label>
                    <input 
                    type='file' 
                    className='input' 
                    onChange={handleBackFile} 
                    accept=".jpg,.jpeg,.png" 
                    style={{display: "none"}} 
                    id="input-file-back"/>
                </div>
              </div>
              <div className="back-thumnail">
                {backImgPreview && <img src={backImgPreview} alt="미리보기" />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <button className='button' type='submit'>
          <span>Save</span>
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
    flex-direction: column;
    margin-top: 1rem;
  }

  .bottom {
    display: flex;
    flex-direction: column;
  }

  .inputWrapper {
    display: flex;
    margin-top: 1rem;
    margin-bottom: 1rem;

  }

  hr {
    width: 100%;
  }

  .label {
    font-size: large;
  }

  .input {
    margin-top: 1rem;
    background-color: #151c2c;
      margin-bottom: 1rem;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
  }

  .label-file {
    padding: 6px 25px;
        background-color:#254EF8;
        border-radius: 4px;
        color: white;
        cursor: pointer;
  }

  .button {
    background-color: #254ef8;
    border-radius: 20px;
    border: none;
    color: white;
    height: 2rem;
    width: 4rem;
    align-self: flex-end;
    margin-top: 1rem;
  }

  .image-body {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
  }

  .thum-change {
    display: flex;
    align-items: center;
    margin-bottom: 1.2rem;
  }

  .image {
    flex: 1;
  }

  .thumnail {
    img {
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      border: 3px white solid;
    }
  }

  .back-thumnail {
    img {
      width: 100%;
      height: 6rem;
      margin-top: 10px;
      border: 3px white solid;
    }
  }

  .background {
    margin-top: 1rem;
  }

  .description {
    display: flex;
    flex-direction: column;
    background-color: #151C2C;
    margin-top: 3rem;
    padding: 20px;
    margin-right: 3rem;

    textarea {
      background-color: transparent;
      border: none;
      resize: none;
      color: white;
      margin-top: 1rem;
      font-size: large;
    }
  }
`
const MyDatePicker = styled(Datepicker)`
  background-color: #202C44;
  color: white;
  border: none;
  text-align: center;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`