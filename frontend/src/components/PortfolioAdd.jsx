import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DefaultButton from "./DefaultButton";
import { IoMdClose } from "react-icons/io";
import { FaFileUpload } from "react-icons/fa";
import { Dialog, DialogHeader, DialogBody } from '@material-tailwind/react'
import { musicUpload } from "../API/PortfolioAPI";

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
    const [tilte, setTitle] = useState('')

    const handleChangeFile = (e) => {
        e.preventDefault()
        
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }
   
    const handleModal = () => {
        setOpen(!open)
    }

    const handleUpload = async () => {
        if (!file) {
            alert('파일을 선택해주세요')
            return
        }

        try {
            const response = await musicUpload({
                pinFixed,
                fileDescription,
                tilte,
                file
            })
            console.log(response)
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
                    <input type="file"
                        id="file"
                        multiple="multiple"
                        onChange={handleChangeFile}
                    />
                    <FaFileUpload size={80}/>
                </CustomBody>
                <button onClick={handleUpload}>
                    업로드
                </button>                 
            </CustomDialog>
        </>
    )
}

export default PortfolioAdd