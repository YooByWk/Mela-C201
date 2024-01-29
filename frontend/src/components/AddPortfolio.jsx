import React, { ReactNode } from 'react';
import styled from 'styled-components';
import CommonBtn from '.CommonBtn';

const AddWrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 20px;
    position: relative;
    box-sizing: border-box;
`

const AddArea = styled.div`
    flex: 1;
    border: none;
`

const AddBtnWrapper = styled.div`
    width: 100px;
`

const AddBtn = styled(CommonBtn)`
    position: absolute;
    right: 20px;
    top: 20px;
    pad: 12px 16px;
    background-color: #254ef8;
    border: none;
`

type AddProps = {
    className: String;
    placeholder: String;
    onClick: () => void;
    children?: ReactNode;
}

const AddPortfolio = ({ className, placeholder, onClick, children }: AddProps) => {
    return (
        <AddWrapper className={ className}>
            { children }
            <AddArea placeholder={ placeholder }/>
            <AddBtnWrapper>
                <AddBtn className={ className } onClick={ onClick}>Add</AddBtn>
            </AddBtnWrapper>        
        </AddWrapper>
    )
}

export default AddPortfolio