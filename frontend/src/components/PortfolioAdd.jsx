import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import DefaultButton from "./DefaultButton";
import { IoMdClose } from "react-icons/io";
import { Dialog, DialogHeader, DialogBody } from '@material-tailwind/react'
import { musicUpload } from '../API/PortfolioAPI'
import defaultimage from '../assets/images/default-profile.png'
import { Link } from "react-router-dom";

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

    & .label-file-album {
        padding: 6px 25px;
        background-color:#254EF8;
        border-radius: 4px;
        color: white;
        cursor: pointer;
    }

    & .label-file {
        padding: 6px 25px;
        background-color:#254EF8;
        border-radius: 4px;
        color: white;
        cursor: pointer;
    }
`

const Img = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
`
const Button = styled.button`
    background-color: #254EF8;
    color: white;
    border-radius: 20px;
`
function PortfolioAdd() {
    const [open, setOpen] = useState(false)
    const [pinFixed, setPinFixed] = useState(false)
    // const [fileDescription, setFileDescription] = useState('')
    const [title, setTitle] = useState('')
    const imgRef = useRef()
    const [imgFile, setImgFile] = useState('')
    const [imgPreview, setImgPreview] = useState('')
    const [musicFile, setMusicFile] = useState()
    const [lyricFile, setLyricFile] = useState()

    // 음원 제목
    const handleTitle = (e) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    // 음원 설명
    // const handleDescription = (e) => {
    //     e.preventDefault()
    //     setFileDescription(e.target.value)
    // }


    // 앨범 커버 (jpg, jpeg, png)
    const handleImgFile = (e) => {
        e.preventDefault()
        const file = imgRef.current.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImgPreview(reader.result)
        }
        console.log(e.target.files[0])
        setImgFile(e.target.files[0])
    }
   
    // 음원 (mp3, flac)
    const handleMusicFile = (e) => {
        e.preventDefault()

        if (e.target.files[0]) {
            setMusicFile(e.target.files[0])
        } 
    }

    // 가사 (txt, xml)
    const handleLyricFile = (e) => {
        e.preventDefault()

        if (e.target.files[0]) {
            setLyricFile(e.target.files[0])
        }
    }

    // const handlePin = (e) => {
    //     e.preventDefault()
    //     setPinFixed(e.target.checked)
    // }

    const handleModal = () => {
        setOpen(!open)
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        
        if ( musicFile === '' ) {
            alert('음원파일을 선택해주세요')
            return
        }

        const formData = new FormData()
        const body = JSON.stringify({
            // pinFixed: pinFixed,
            // fileDescription: fileDescription,
            title: title
        })

        formData.append('portfolioMusicPostReq', body)
        formData.append('file', imgFile)
        formData.append('file', musicFile)
        formData.append('file', lyricFile)

        for (let key of formData.keys()) {
            // console.log(key, ":", formData.get(key));
        }

        try {
            await musicUpload(formData)
            alert('업로드가 완료되었습니다.')
            setTitle('')
            setPinFixed(false)
            setImgFile('')
            setMusicFile('')
            setLyricFile('')
            setOpen(!open)
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
                {/* <div className='inputWrapper'>
                    <label className='label'>Content</label>
                    <input type='text' className='input' placeholder='설명' onChange={handleDescription} />
                </div> */}
                <Img 
                src={imgPreview ? imgPreview : defaultimage} 
                alt="프로필 이미지"
                />
                <div className='inputWrapper'>
                    <label className='label-file-album' for="input-file-album">앨범 커버 (jpg, jpeg, png)</label>
                    <input 
                    type='file' 
                    className='input' 
                    onChange={handleImgFile} 
                    accept=".jpg,.jpeg,.png" 
                    style={{display: "none"}} 
                    ref={imgRef}
                    id="input-file-album"/>
                </div>
                <div className='inputWrapper'>
                    <label className='label-file' for="input-file-music">음원 (mp3, flac)</label>
                    <input 
                    type='file' 
                    className='input' 
                    onChange={handleMusicFile} 
                    accept=".mp3,.flac" 
                    style={{display: "none"}}
                    id="input-file-music"
                    />
                </div>
                <div className='inputWrapper'>
                    <label className='label-file' for="input-file-lyric">가사 (txt, xml)</label>
                    <input 
                    type='file' 
                    className='input' 
                    onChange={handleLyricFile} 
                    accept=".txt,.xml" 
                    style={{display: "none"}}
                    id="input-file-lyric"/>
                </div>
                {/* <div className='inputWrapper'>
                    <label className='label'>pin고정</label>
                    <input type='checkbox' className='input' onChange={handlePin} />
                </div> */}
                    {/* <FaFileUpload size={80}/> */}
                </CustomBody>
                <br/>
                <Link to='/musics'>
                <Button onClick={handleUpload}>
                    업로드
                </Button>
            </Link>
            </CustomDialog>
        </>
    )
}

export default PortfolioAdd