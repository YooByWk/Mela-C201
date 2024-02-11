import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import DefaultButton from "../components/DefaultButton";
import { MdLockOutline } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { fetchUser, updateUser, deleteUser } from "../API/UserAPI";


function UserUpdateForm(props) {
    const [imgFile, setImgFile] = useState('')
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedPositions, setSelectedPositions] = useState([]);

    // 장르 // 
    const genres = [
        "Pop",
        "Rock",
        "Hiphop",
        "Classic",
        "Jazz",
        "R&B",
        "Disco",
        "Electrionic",
        "Balad",
        "Country",
        "Reggae",
        "Folk",
        "Etc",
      ];

    // 포지션 //
    const positions = ["보컬", "작곡", "작사", "세션", "믹싱", "기타"];


    const handleGenreChange = (event) => {
        const { checked, value } = event.target;
        if (checked && selectedGenres.length < 3) {
          setSelectedGenres([...selectedGenres, value]);
        } else if (!checked) {
          setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
        } 
        console.log(selectedGenres);
      };
    
      const handlePositionChange = (event) => {
        const { checked, value } = event.target;
        if (checked) {
          setSelectedPositions([...selectedPositions, value]);
        } else if (!checked) {
          setSelectedPositions(
            selectedPositions.filter((position) => position !== value)
          );
        }
      };
    // 나머지 해야함  //

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
            프로필 사진
            <input type='file'onChange={handleImgFile} />
                <InputWrapper>
                    <ProfileImageWrapper />
                    <Label>
                        Name
                    </Label>
                    <Input
                        type="text"
                        id='name'
                        value={userValues.name}
                        onChange={handleUserChange}
                        placeholder={userValues.name}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        Nickname
                    </Label>
                    <Input 
                        type="text"
                        id='nickname'
                        value={userValues.nickname}
                        onChange={handleUserChange}
                        placeholder={userValues.nickname}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        Self-introdution
                    </Label>
                    <Input
                        type="text"
                        id='selfIntro'
                        value={portfolioValues.selfIntro}
                        onChange={handlePortfolioChange}
                        placeholder={portfolioValues.selfIntro}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        Gender
                    </Label>
                    <Input 
                        type="text"
                        name='gender'
                        value={userValues.gender}
                        onChange={handleGenderChange}
                        placeholder={userValues.gender}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        Birth
                    </Label>
                    <input 
                        type="date"
                        id='birth'
                        value={userValues.birth}
                        onChange={handleUserChange}
                        placeholder={userValues.birth}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        Like genre
                    </Label>
                    <GenreContainer>
          {genres.map((genre) => (
            <div key={genre}>
              <input
                type="checkbox"
                id={genre}
                value={genre}
                onChange={handleGenreChange}
              />
              <label htmlFor={genre}>{genre}</label>
            </div>
          ))}
        </GenreContainer>
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        Position
                    </Label>
                    <GenreContainer>
          {positions.map((position) => (
            <div key={position}>
              <input
                type="checkbox"
                id={position}
                value={position}
                onChange={handlePositionChange}
              />
              <label htmlFor={position}>{position}</label>
            </div>
          ))}
        </GenreContainer>
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        Instagram
                    </Label>
                    <Input
                        type="text"
                        id='instagram'
                        value={portfolioValues.instagram}
                        onChange={handlePortfolioChange}
                        placeholder={portfolioValues.instagram}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        YouTube
                    </Label>
                    <Input
                        type="text"
                        id='youtube'
                        value={portfolioValues.youtube}
                        onChange={handlePortfolioChange}
                        placeholder={portfolioValues.youtube}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label>
                        다른 회원 검색 노출 허용
                    </Label>
                    <input 
                        type="checkbox"
                        id='searchAllow'
                        checked={userValues.searchAllow}
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

const GenreContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  height: 60%;
  border: 1px solid black;
  margin: 5px;
  color: #ffffff;
  flex-wrap: wrap;
`;