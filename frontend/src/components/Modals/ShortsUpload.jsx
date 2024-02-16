import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { styled, css, margin } from '@mui/system'
import { Modal as BaseModal } from '@mui/base/Modal'
import { shortsUpload } from '../../API/ShortsAPI'
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

function ShortsUploadModal({className, fontSize, padding}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = useState({
    fileDescription: ""
  })

  const [file, setFile] = useState('')
  
  const handleChange = async (e) => {
    setValues({...values,
    [e.target.id]: e.target.value,
    })
  }

  const handleFile = (e) => {
    e.preventDefault()

    if (e.target.files[0]) {
        setFile(e.target.files[0])
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    const data = JSON.stringify({
        fileDescription: values.fileDescription
    })
    formData.append('shortsPostReq', data)
    formData.append('file', file)

    try {
      const res = await shortsUpload(formData)
      // console.log(res)
      alert('쇼츠가 업로드 되었습니다.')
      setOpen(!open)
  } catch (err) {
      // console.error(err)
  }
  }

  //디버깅용(나중에 삭제)
  const handleClick = async () => {
    // console.log('click')
  }

  return (
    <div>
        <TriggerButton type="button" onClick={handleOpen} style={{ border: 'none'}}>
          <span>Add</span>
        </TriggerButton>
      
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <CustomBody sx={{ width: 700 }}>
          {/* <h2 id="modal-title" className="modal-title">
            Upload
          </h2> */}
          <form onSubmit={handleSubmit}> 
          <div id="modal-description" className="modal-description">
            <div className='inputWrapper'>
              <label className='label'>업로드 할 영상</label>
              <input type='file' id='backInput' className='inputFile' onChange={handleFile} accept='.mp4, .mkv, .avi'/>
              <label htmlFor="backInput" className='holder'>쇼츠 추가하기</label>
            </div>         
            <div className='inputWrapper'>
              <input type='text' id='fileDescription' className='input' onChange={handleChange} placeholder='설명을 입력해주세요.'/>
            </div>
            <button className='button' type='submit' onClick={handleClick}>
              Upload
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

  width: 4rem;
  height: 2rem;

  margin-top: 1rem;
  font-size: medium;
  background-color: #254EF8;
  color: white;

  border-radius: 30px;

    `,
)

export default ShortsUploadModal