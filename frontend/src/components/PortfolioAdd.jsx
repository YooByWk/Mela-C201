import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DefaultButton from "./DefaultButton";
import { IoMdClose } from "react-icons/io";
import { FaFileUpload } from "react-icons/fa";
import { Dialog, DialogHeader, DialogBody } from '@material-tailwind/react'
import { musicUpload } from '../API/PortfolioAPI'
import defaultimage from '../assets/images/default-image'

const CloseButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    float: right;
`

const CustomDialog = styled(Dialog)`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    width: 40rem;
    height: 15rem;
    top: 30%;
    right: 30%;
    background-color: #68B9D0;
    padding: 20px;
`

const CustomHeader = styled(DialogHeader)`
    display: flex;
    justify-content: space-between;
`

const CustomBody = styled(DialogBody)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


function PortfolioAdd() {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState({})
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
        else {
            setFile(defaultimage)
        }
    }
   
    // 음원 (mp3, flac)
    const handleMusicFile = (e) => {
        e.preventDefault()

        if (e.target.files[1]) {
            setFile(e.target.files[1])
        }
    }

    // 가사 (pdf, xml)
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
        formData.append('file', file)
        // for (let i = 0; i < file.length; i++) {
        //     formData.append('file', file[i]);
        // }

        for (let key of formData.keys()) {
            console.log(key, ":", formData.get(key));
        }

        try {
            musicUpload(formData)
            alert('업로드 성공~!')
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
                    음원 제목
                    <input type="text" onChange={handleTitle}/>
                    음원 설명
                    <input type="text" onChange={handleDescription}/>
                    앨범 커버 (jpg, jpeg, png)
                    <input type="file"
                        // multiple="multiple"
                        onChange={handleImgFile}
                    />
                    음원 (mp3, flac)
                    <input type="file"
                        // multiple="multiple"
                        onChange={handleMusicFile}
                    />
                    가사 (pdf, xml)
                    <input type="file"
                        // multiple="multiple"
                        onChange={handleLyricFile}
                    />
                    pin고정
                    <input 
                    type="checkbox"
                    onChange={handlePin}
                    />
                    {/* <FaFileUpload size={80}/> */}
                </CustomBody>
                <button onClick={handleUpload}>
                    업로드
                </button>                 
            </CustomDialog>
        </>
    )
}

export default PortfolioAdd