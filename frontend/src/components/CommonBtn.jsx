import React, { ReactNode } from 'react';
import styled from 'styled-components';

const BtnWrapper = styled.button`
    display: flex;
    outline: none;
    align-items: center;
    border-radius: 10px;
`

type BtnProps = {
    className: String;
    onClick?: () => void;
    children?: ReactNode;
}

const CommonBtn = ({ className, onClick, children }: BtnProps) => {
    return (
        <BtnWrapper className={ className } onClick={ onClick }>
            { children }
        </BtnWrapper>
    )
}

export default CommonBtn