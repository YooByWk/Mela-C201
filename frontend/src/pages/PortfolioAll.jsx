import React, { useState } from "react";
import styled from "styled-components";
import DefaultButton from "../components/DefaultButton";
import { TiPin } from "react-icons/ti";
import { RiHeadphoneFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

import { Dialog, DialogHeader, DialogBody, DialogFooter,} from '@material-tailwind/react'

const Hedaer = styled.div`
    display: flex;
    justify-content: center;
    color: white;
`

const PinList = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    color: white;
`

const CloseButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    float: right;
`

const AllList = styled.div`
    display: flex;
    padding: 20px;
    color: white;
`

const CustomDialog = styled(Dialog)`
    position: fixed;
    width: 40rem;
    top: 50%;
    right: 50%;
    background-color: #68B9D0;
    padding: 20px;
`

function PortfolioAll() {
    const [open, setOpen] = React.useState(false)

    const handleModal = () => {
        setOpen(!open)
    }

    return (
        <>
            <Hedaer>
                <h1>user 님의 Portfolio</h1>
                <DefaultButton 
                    text={'Add'}
                    backgroundcolor={'#254ef8'}
                    fontcolor={'white'}
                    width={'100px'}
                    onClick={() => handleModal('sm')}
                />
            </Hedaer>
            <CustomDialog open={open} handler={handleModal}>
                <DialogHeader>
                    <h3>포트폴리오 업로드</h3>
                    <CloseButton onClick={handleModal}>
                        <IoMdClose size={24} />
                    </CloseButton>
                </DialogHeader>
                <DialogBody>
                    파일 업로드
                </DialogBody>
                <DialogFooter>
                    <DefaultButton 
                        text={'Upload'}
                        backgroundcolor={'#254ef8'}
                        fontcolor={'white'}
                        width={'100px'}
                        onClick={handleModal}
                    />
                </DialogFooter>
            </CustomDialog>
            <PinList>
                <div>
                    <TiPin />
                    <h3>Pin</h3>
                </div>
                <DefaultButton 
                    text={'Edit'}
                    backgroundcolor={'#6C7383'}
                    fontcolor={'white'}
                    width={'100px'}
                />
            </PinList>
            <hr />
            <AllList>
                <RiHeadphoneFill />
                <h3>All</h3>
            </AllList>
        </>
    )
}

export default PortfolioAll