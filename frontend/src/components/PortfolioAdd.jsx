import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DefaultButton from "./DefaultButton";
import { IoMdClose } from "react-icons/io";
import { FaFileUpload } from "react-icons/fa";
import { Dialog, DialogHeader, DialogBody } from '@material-tailwind/react'
import { musicUpload } from '../API/PortfolioAPI'
import defaultimage from '../assets/images/default-image.png'

const CloseButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    position: absolute;
    top: 3px;
    right: 3px;
`

const CustomDialog = styled(Dialog)`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    width: 40rem;
    height: 25rem;
    top: 30%;
    right: 30%;
    background-color: #151C2C;
    padding: 20px;
    color: white;
    
`

const CustomHeader = styled(DialogHeader)`
    text-align: center;
    line-height: 1.5rem;
    margin-bottom: 2rem;
    text-decoration: underline;
    text-decoration-color: #254EF8;
`

const CustomBody = styled(DialogBody)`
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    margin-bottom: 4px;

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
      justify-content: space-between;
    }
`


function PortfolioAdd() {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState([defaultimage])
    const [pinFixed, setPinFixed] = useState(false)
    const [fileDescription, setFileDescription] = useState('')
    const [title, setTitle] = useState('')

    // 음원 제목
    const handleTitle = (e) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    // 음원 설명
    const handleDescription = (e) => {
        e.preventDefault()
        setFileDescription(e.target.value)
    }

    // 앨범 커버 (jpg, jpeg, png)
    const handleImgFile = (e) => {
        e.preventDefault()
        
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }
   
    // 음원 (mp3, flac)
    const handleMusicFile = (e) => {
        e.preventDefault()

        if (e.target.files[1]) {
            setFile.push(e.target.files[1])
        }
    }

    // 가사 (txt, xml)
    const handleLyricFile = (e) => {
        e.preventDefault()

        if (e.target.files[2]) {
            setFile(e.target.files[2])
        }
    }

    const handlePin = (e) => {
        e.preventDefault()
        setPinFixed(e.target.checked)
    }

    const handleModal = () => {
        setOpen(!open)
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        
        if (!file) {
            alert('파일을 선택해주세요')
            return
        }

        const formData = new FormData()
        const body = JSON.stringify({
            pinFixed: pinFixed,
            fileDescription: fileDescription,
            title: title
        })
        formData.append('portfolioMusicPostReq', body)
        // formData.append('file', file)
        for (let i = 0; i < file.length; i++) {
            formData.append('file', file[i]);
        }

        for (let key of formData.keys()) {
            console.log(key, ":", formData.get(key));
        }

        try {
            musicUpload(formData)
            alert('업로드가 완료되었습니다.')
        } catch (err) {
            console.error(err)
        }
    }
    
    return (
        <>
            <DefaultButton 
                text={'Add'}
                backgroundcolor={'#254ef8'}
                fontcolor={'white'}
                width={'100px'}
                onClick={handleModal}
            />
            <CustomDialog open={open} handler={handleModal}>
                <CustomHeader>
                    <h3>포트폴리오 업로드</h3>
                    <CloseButton onClick={handleModal}>
                        <IoMdClose size={30} />
                    </CloseButton>
                </CustomHeader>
                <CustomBody>
                <div className='inputWrapper'>
                    <label className='label'>Title</label>
                    <input type='text' className='input' placeholder='제목' onChange={handleTitle} />
                </div>
                <div className='inputWrapper'>
                    <label className='label'>Content</label>
                    <input type='text' className='input' placeholder='설명' onChange={handleDescription} />
                </div>
                <div className='inputWrapper'>
                    <label className='label'>앨범 커버 (jpg, jpeg, png)</label>
                    <input type='file' className='input' onChange={handleImgFile} />
                </div>
                <div className='inputWrapper'>
                    <label className='label'>음원 (mp3, flac)</label>
                    <input type='file' className='input' onChange={handleMusicFile} />
                </div>
                <div className='inputWrapper'>
                    <label className='label'>가사 (txt, xml)</label>
                    <input type='file' className='input' onChange={handleLyricFile} />
                </div>
                <div className='inputWrapper'>
                    <label className='label'>pin고정</label>
                    <input type='checkbox' className='input' onChange={handlePin} />
                </div>
                    {/* <FaFileUpload size={80}/> */}
                </CustomBody>
                <br/>
                <button onClick={handleUpload}>
                    업로드
                </button>
            </CustomDialog>
        </>
    )
}

export default PortfolioAdd