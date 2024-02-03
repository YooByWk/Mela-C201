import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DefaultButton from "./DefaultButton";
import { IoMdClose } from "react-icons/io";
import { Dialog, DialogHeader, DialogBody, input } from '@material-tailwind/react'
import { registerFile } from "../API/PortfolioAPI";

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
    const [data, setData] = useState({
        pinFixed: '',
        fileDescription: '',
        title: '',
    })
    
    const handleModal = () => {
        setOpen(!open)
    }

    const handleChange = (e) => {
        console.log(e.target.files[0])

        if (e.target.name === "file") {
            setData({
                ...data,
                files: e.target.files,
            });
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value,
            });
        }
    }

    const handleRegister = () => {
        let formData = new FormData()

        if (data.files) {
            for (let i = 0; i < data.files.length; i++) {
                formData.append('multipartFile', data.files[i])
            }
        }
        formData.append(
            'portfolioMusicPostReq',
            new Blob(
                [
                    JSON.stringify({
                        pinFixed: data.pinFixed,
                        fileDescription: data.fileDescription,
                        title: data.title,
                    }),
                ],
                { type: 'application/json'}
            )
        )
        registerFile(formData)
        .then(() => {
            console.log('업로드 성공')
        })
        .catch((e) => {
            console.error(e)
            alert('업로드 실패')
        })
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
                    <input
                        onChange={handleChange}
                        value={data.title}
                        name='title'
                        placeholder="제목을 입력하세요."
                    />
                    <input
                        onChange={handleChange}
                        value={data.fileDescription}
                        name='fileDescription'
                        placeholder="파일 설명"
                    />
                    <input type="file" 
                        onChange={handleChange}
                        name="file"
                    />
                </CustomBody>
                <button onClick={handleRegister}>
                    업로드
                </button>
            </CustomDialog>
        </>
    )
}

export default PortfolioAdd