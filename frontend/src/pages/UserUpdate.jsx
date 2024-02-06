import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import DefaultButton from "../components/DefaultButton";
import { MdLockOutline } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { fetchUser, updateUser, deleteUser } from "../API/UserAPI";


function UserUpdateForm(props) {
    const [values, setValues] = useState({
        name: '',
        nickname: '',
        gender: '',
        birth: '',
        searchAllow: ''
    })

    useEffect(()=> {
        const getUserInfo = async() => {
            try {
                const res = await fetchUser()
                setValues(res)
            } catch (err) {
                console.error(err)
            }
        }; getUserInfo()
       
    }, [])

    const handleChange = async (e) => {
        setValues({...values,
            [e.target.id]: e.target.value
        })
    }

    const handleGenderChange = async (e) => {
        setValues({...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSearchAllowChange = async (e) => {
        setValues({...values,
            [e.target.id]: e.target.checked
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const updatedUser = await updateUser(values)
            console.log(updatedUser)
            navigate('/portfolio')
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async() => {
        deleteUser()
        
        .then((res) => {
            alert('그동안 이용해주셔서 감사합니다.')
            window.location.href = '/'
        }).catch((err) => {
            console.log(err)
        })
    }

    const navigate = useNavigate()
    
    const handleCancel = () => {
        navigate(-1)
    }

    return(
        <Container>
            <Title>
                Profile Settings
            </Title>
            <Form onSubmit={handleSubmit}>
                <InputWrapper>
                    <ProfileImageWrapper />
                    <Label>
                        Name
                    </Label>
                    <Input
                        type="text"
                        id='name'
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        Nickname
                    </Label>
                    <Input 
                        type="text"
                        id='nickname'
                        value={values.nickname}
                        onChange={handleChange}
                        placeholder="Nickname"
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        Self-introdution
                    </Label>
                    <Input placeholder={'자기소개 문구를 입력하세요'}/>
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        Gender
                    </Label>
                    <Input 
                        type="text"
                        name='gender'
                        value={values.gender}
                        onChange={handleGenderChange}
                        placeholder="Gender"
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        Birth
                    </Label>
                    <input 
                        type="date"
                        id='birth'
                        value={values.birth}
                        onChange={handleChange}
                        placeholder="생년월일"
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        Like genre
                    </Label>
                    <Input 
                        placeholder="선호 장르"
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        Position
                    </Label>
                    <Input 
                        placeholder="포지션"
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        SNS
                    </Label>
                    <Input />
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        다른 회원 검색 노출 허용
                    </Label>
                    <input 
                        type="checkbox"
                        id='searchAllow'
                        checked={values.searchAllow}
                        onChange={handleSearchAllowChange}
                    />
                </InputWrapper>
            </Form>
            <ButtonWrapper>
                <DefaultButton 
                    text={'Cancel'}
                    backgroundcolor={'#6C7383'}
                    fontcolor={'white'}
                    width={'8rem'}
                    onClick={handleCancel}
                />
                <DefaultButton 
                    text={'Save'}
                    backgroundcolor={'#254ef8'}
                    fontcolor={'white'}
                    width={'8rem'}
                    onClick={handleSubmit}
                />
            </ButtonWrapper>
            <Span>
                <MdLockOutline />
                Change password
            </Span>
            <Span onClick={handleDelete}>
                <CgDanger />
                회원 탈퇴
            </Span>
        </Container> 
    )
}

export default UserUpdateForm


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
`

const Title = styled.h1`
    margin-bottom: 20px;
    color: white;
`

const Label = styled.span`
    color: #254ef8;
    font-weight: bolder;
    margin-bottom: 10px;
`

const Form = styled.div`
`

const ProfileImageWrapper = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 100%;
`

const InputWrapper = styled.div`
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Input = styled.input`
    background-color: #151c2c;
    color: white;
    border: none;
`

const ButtonWrapper = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 5px 10px;
    font-size: 0.8rem;
`

const Span = styled.span`
    color: white;
    padding: 5px;
`