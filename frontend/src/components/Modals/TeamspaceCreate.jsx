import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { styled, css, margin } from '@mui/system'
import { Modal as BaseModal } from '@mui/base/Modal'
import { TeamspaceGenerate } from '../../API/TeamspaceAPI'
import { useNavigate } from 'react-router-dom'

const CustomBody = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    border-radius: 8px;
    padding: 4rem;
    color: white;
    background: linear-gradient(180deg, #0C0A15 0%, #171930 100%);
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    margin-bottom: 4px;

    & .modal-title {
      text-align: center;
      line-height: 1.5rem;
      margin-bottom: 2rem;
      text-decoration: underline;
      text-decoration-color: #254EF8;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      margin-bottom: 4px;
    }
      
      & .button {
      background-color: #254EF8;
      border: none;
      border-radius: 5px;
      color: white;
      width: 100%;
      height: 2.5rem;
      font-size: medium;
      margin-top: 10px;
    }

    & .input {
      background-color: #151c2c;
      border: none;
      height: 2.5rem;
      color: white;
      flex-grow: 1;
      border-radius: 5px;
    }

    & .label {
      color: #254EF8;
      font-weight: bold;
      padding: 10px;
    }

    & .inputWrapper {
      background-color: #151c2c;
      margin-bottom: 1rem;
      border-radius: 5px;
      display: flex;
      align-items: center;
    }

    & .inputFile {
      opacity: 0;
      width: 1px;
      height: 1px;
      position: absolute;
    }

    & .holder {
      display: inline-block;
      padding: 10px 20px;
      cursor: pointer;
      color: gray;
    }
  `
)

function TeamspaceCreateModal({className, fontSize, padding}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const Navi = useNavigate()
  // 시작 날짜는 오늘 날짜
  const today = new Date()
  // oooo-oo-oo 형식 맞추기
  let todayMonth = (today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1)
  let todayDay = (today.getDate()) > 9 ? (today.getDate()) : '0' + (today.getDate())
  const formattedDate = `${today.getFullYear()}-${todayMonth}-${todayDay}`
  
  // console.log(formattedDate)

  const [values, setValues] = useState({
    teamName: "",
    startDate: formattedDate,
    endDate: "",
    teamDescription: ""
  })

  const [imgFile, setImgFile] = useState('')
  const [backImgFile, setBackImgFile] = useState('')
  
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
    const registerInfo = JSON.stringify({
      teamName: values.teamName,
      startDate: values.startDate,
      endDate: values.endDate,
      teamDescription: values.teamDescription
    })
    formData.append('registerInfo', registerInfo)
    formData.append('teamspaceBackgroundPicture', backImgFile)
    formData.append('teamspacePicture', imgFile)

    try {
      const res = await TeamspaceGenerate(formData)
      alert('팀스페이스 생성이 완료되었습니다.')
      Navi(`../teamspace/${res.message}`)
      setOpen(!open)
  } catch (err) {
      console.error(err)
  }
  }

  return (
    <div>
        <TriggerButton type="button" onClick={handleOpen} >
          <span>+</span>
        </TriggerButton>
        <span style={{fontSize: 'x-large'}}>Create</span>
      
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <CustomBody sx={{ width: 700 }}>
          <h2 id="modal-title" className="modal-title">
            Create
          </h2>
          <form onSubmit={handleSubmit}> 
          <div id="modal-description" className="modal-description">
            <div className='inputWrapper'>
              <label className='label'>배경 이미지</label>
              <input type='file' id='backInput' className='inputFile' onChange={handleBackFile} />
              <label htmlFor="backInput" className='holder'>배경 이미지 추가하기</label>
            </div>
            <div className='inputWrapper'>
              <label className='label'>프로필 이미지</label>
              <input type='file' id='profileInput' className='inputFile' onChange={handleImgFile} />
              <label htmlFor="profileInput" className='holder'>프로필 이미지 추가하기</label>
            </div>            
            <div className='inputWrapper'>
              <label className='label'>종료일</label>
              <input type='date' id='endDate' className='input' onChange={handleChange} />
            </div>
            <div className='inputWrapper'>
              <input type='text' id='teamName' className='input' onChange={handleChange} placeholder='팀 스페이스 이름을 입력해주세요. (최대 30자)'/>
            </div>            
            <div className='inputWrapper'>
              <input type='text' id='teamDescription' className='input' onChange={handleChange} placeholder='팀 스페이스 설명을 입력해주세요.'/>
            </div>
            <button className='button' type='submit'>
              Create
            </button>
            <br />
          </div>
          </form>
        </CustomBody>
      </Modal>
    </div>
  )
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
    className={clsx({ 'base-Backdrop-open': open }, className)}
    ref={ref}
    {...other}
    />
    )
  })

  Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
  }


  const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`

const TriggerButton = styled('button')(
  ({ theme }) => css`

  width: 30px;
  height: 30px;
  left: 30px;
  top: 30px;

  text-align: center;
  margin-left: 2rem;
  margin-top: 2rem;
  margin-right: 1rem;
  font-size: x-large;
  color: #254EF8;

  border: 2px solid #254EF8;
  border-radius: 4px;

    &:hover {
      color: white;
      background: #254EF8;
      cursor: pointer;
    }

    .p {
      text-align: center;
    }
    `,
)

export default TeamspaceCreateModal