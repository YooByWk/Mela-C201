import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import DefaultButton from "../components/DefaultButton";
import { MdLockOutline } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { fetchUser, updateUser, deleteUser } from "../API/UserAPI";
import { getImg } from "../API/FileAPI";
import defaultprofile from '../assets/images/default-profile.png'

function UserUpdateForm() {
    const [imgFile, setImgFile] = useState('')
    const [userValues, setUserValues] = useState({
        name: '',
        nickname: '',
        gender: '',
        birth: '',
        searchAllow: ''
    })

    const [portfolioValues, setPortfolioValues] = useState({
        instagram: '',
        selfIntro:'',
        youtube:''
    })

    const [imageURL, setImageURL] = useState()

    useEffect(()=> {
        const getUserInfo = async() => {
            try {
                const res = await fetchUser()
                setUserValues(res[0])
                setPortfolioValues(res[1])
            } catch (err) {
                console.error(err)
            }
        }; getUserInfo()
       
        const imageInfo = async() => {     
            try {
              if (portfolioValues.portfolio_picture_file_idx) {
                const response = await getImg(portfolioValues.portfolio_picture_file_idx.fileIdx)
                setImageURL(response.message)
              } else{
                  setImageURL(defaultprofile)
                }
            } catch (err) {
                console.error(err)
            }
        }
        imageInfo()
    }, [])


    const handleImgFile = (e) => {
        e.preventDefault()
        if (e.target.files[0]) {
            setImgFile(e.target.files[0])
        }
    }

    const handleUserChange = async (e) => {
        setUserValues({...userValues,
            [e.target.id]: e.target.value
        })
    }

    const handlePortfolioChange = async (e) => {
        setPortfolioValues({...portfolioValues,
            [e.target.id]: e.target.value
        })
    }

    const handleGenderChange = async (e) => {
        setUserValues({...userValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSearchAllowChange = async (e) => {
        setUserValues({...userValues,
            [e.target.id]: e.target.checked
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        const formData = new FormData()
        const user = JSON.stringify({
            name: userValues.name,
            nickname: userValues.nickname,
            gender: userValues.gender,
            birth: userValues.birth,
            searchAllow: userValues.searchAllow
        })

        const portfolio = JSON.stringify({
            instagram: portfolioValues.instagram,
            selfIntro: portfolioValues.selfIntro,
            youtube: portfolioValues.youtube
        })

        formData.append('userUpdateInfo', user)
        formData.append('portfolioAbstractPostReq', portfolio)
        formData.append('portfolioPicture', imgFile)

        for (let key of formData.keys()) {
            console.log(key, ":", formData.get(key));
        }

        try {
            await updateUser(formData)
            alert('회원정보 수정이 완료되었습니다.')
            navigate(-1)
            // window.location.href = `/portfolio/${userValues.emailId}`
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
                <ProfileImageWrapper>
                    <div className="image">
                        <img src={imageURL} alt="프로필 이미지" />
                    </div>
                    <input
                        type='file'

                        onChange={handleImgFile}
                    />
                </ProfileImageWrapper>
                <InputWrapper>
                    <div className="label">
                        <Label>
                            Name
                        </Label>
                    </div>
                    <Input
                        type="text"
                        id='name'
                        value={userValues.name}
                        onChange={handleUserChange}
                        placeholder={userValues.name}
                    />
                </InputWrapper>
                <InputWrapper>
                    <div className="label">
                        <Label>
                            Nickname
                        </Label>
                    </div>
                    <Input 
                        type="text"
                        id='nickname'
                        value={userValues.nickname}
                        onChange={handleUserChange}
                        placeholder={userValues.nickname}
                    />
                </InputWrapper>
                <InputWrapper>
                    <div className="label">
                        <Label>
                            Self-introdution
                        </Label>
                    </div>
                    <Input
                        type="text"
                        id='selfIntro'
                        value={portfolioValues.selfIntro}
                        onChange={handlePortfolioChange}
                        placeholder={portfolioValues.selfIntro}
                    />
                </InputWrapper>
                <InputWrapper>
                    <div className="label">
                        <Label>
                            Gender
                        </Label>
                    </div>
                    <Input 
                        type="text"
                        name='gender'
                        value={userValues.gender}
                        onChange={handleGenderChange}
                        placeholder={userValues.gender}
                    />
                </InputWrapper>
                <InputWrapper>
                    <div className="label">
                        <Label>
                            Birth
                        </Label>
                    </div>
                    <input 
                        type="date"
                        id='birth'
                        value={userValues.birth}
                        onChange={handleUserChange}
                        placeholder={userValues.birth}
                    />
                </InputWrapper>
                <InputWrapper>
                    <div className="label">
                        <Label>
                            Like genre
                        </Label>
                    </div>
                    <Input
                        type="text"
                        id='genre'
                        value={portfolioValues.genre}
                        onChange={handlePortfolioChange}
                        placeholder={portfolioValues.genre}
                    />
                </InputWrapper>
                <InputWrapper>
                    <div className="label">
                        <Label>
                            Position
                        </Label>
                    </div>
                    <Input
                        type="text"
                        id='position'
                        value={portfolioValues.position}
                        onChange={handlePortfolioChange}
                        placeholder={portfolioValues.position}
                    />
                </InputWrapper>
                <InputWrapper>
                    <div className="label">
                        <Label>
                            Instagram
                        </Label>
                    </div>
                    <Input
                        type="text"
                        id='instagram'
                        value={portfolioValues.instagram}
                        onChange={handlePortfolioChange}
                        placeholder={portfolioValues.instagram}
                    />
                </InputWrapper>
                <InputWrapper>
                    <div className="label">
                        <Label>
                            YouTube
                        </Label>
                    </div>
                    <Input
                        type="text"
                        id='youtube'
                        value={portfolioValues.youtube}
                        onChange={handlePortfolioChange}
                        placeholder={portfolioValues.youtube}
                    />
                </InputWrapper>
                <div className="findCheck">
                    <Label>
                        다른 회원 검색 노출 허용
                    </Label>
                    <div className="checkbox">
                        <input 
                            type="checkbox"
                            id='searchAllow'
                            checked={userValues.searchAllow}
                            onChange={handleSearchAllowChange}
                        />
                    </div>
                </div>
            </Form>
            <ButtonWrapper>
                <DefaultButton 
                    text={'Cancel'}
                    backgroundcolor={'#6C7383'}
                    fontcolor={'white'}
                    width={'7rem'}
                    onClick={handleCancel}
                />
                <div className="save-btn">
                    <DefaultButton 
                        text={'Save'}
                        backgroundcolor={'#254ef8'}
                        fontcolor={'white'}
                        width={'7rem'}
                        onClick={handleSubmit}
                    />
                </div>
            </ButtonWrapper>
            <Span>
                <MdLockOutline />
                <span>Change password</span>
            </Span>
            <Span onClick={handleDelete}>
                <CgDanger />
                <span>회원 탈퇴</span>
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
    color: white;
`

const Title = styled.h2`
    margin-bottom: 20px;
    color: white;
`

const Label = styled.span`
    color: #254ef8;
    font-weight: bolder;
    margin-bottom: 10px;
`

const Form = styled.div`
    .findCheck {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .checkbox {
        margin-left: 10px;
    }
`

const ProfileImageWrapper = styled.div`
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
        width: 6rem;
        height: 6rem;
        border: 2px solid white;
        border-radius: 50%;
    }
`

const InputWrapper = styled.div`
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;

    input {
        width: 100%;
        height: 1.5rem;
        background-color: #151c2c;
        border: none;
        color: white;
        border-radius: 10px;
        padding: 10px;
    }

    .label {
        display: flex;
        align-self: self-start;
    }
`

const Input = styled.input`
    background-color: #151c2c;
    color: white;
    border: none;
    width: 100%;
    height: 1.5rem;
    border-radius: 10px;
    padding: 10px;
`

const ButtonWrapper = styled.div`
    padding: 5px 10px;
    display: flex;

    .save-btn {
        margin-left: 10px;
    }
`

const Span = styled.span`
    color: white;
    padding: 5px;

    span {
        margin-left: 10px;
    }
`