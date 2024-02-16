import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import DefaultButton from "../components/DefaultButton";
import { MdLockOutline } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { fetchUser, updateUser, deleteUser } from "../API/UserAPI";
import { getImg } from "../API/FileAPI";
import defaultprofile from '../assets/images/default-profile.png'

function UserUpdateForm() {
    const imgRef = useRef()
    const [imgFile, setImgFile] = useState('')
    const [imgPreview, setImgPreview] = useState('')
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
          setSelectedGenres(
            selectedGenres.filter((genre) => genre !== value));
        } else if (checked && selectedGenres.length >= 3) {
            window.alert("장르는 최대 3개까지만 선택 가능합니다.");
            event.preventDefault();
      };
    }

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
                setSelectedPositions(res[2]);
                setSelectedGenres(res[3])
            } catch (err) {
                console.error(err)
            }
        }; getUserInfo()

    }, [])

    useEffect(() => {
        const imageInfo = async() => {     
            try {
              if (portfolioValues.portfolio_picture_file_idx) {
                const response = await getImg(portfolioValues.portfolio_picture_file_idx.fileIdx)
                setImgPreview(response.message)
              } else{
                  setImgPreview(defaultprofile)
                }
            } catch (err) {
                console.error(err)
            }
        }
        imageInfo()
    }, [userValues])
    
    const handleImgFile = (e) => {
        e.preventDefault()
    
        if (e.target.files[0]) {
            setImgFile(e.target.files[0])
            setImgPreview(URL.createObjectURL(e.target.files[0]))
        }
        console.log(imgFile)
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
            searchAllow: userValues.searchAllow,
            genre: selectedGenres,
            position: selectedPositions
        })
        // console.log(user)
        const portfolio = JSON.stringify({
            instagram: portfolioValues.instagram,
            selfIntro: portfolioValues.selfIntro,
            youtube: portfolioValues.youtube
        })

        formData.append('userUpdateInfo', user)
        formData.append('portfolioAbstractPostReq', portfolio)
        formData.append('portfolioPicture', imgFile)

        console.log(user);
        console.log(portfolio)
        console.log(imgFile)

        // for (let key of formData.keys()) {
        //     console.log(key, ":", formData.get(key));
        // }

        console.log("formdata : ", formData);

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
            // console.log(err)
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
                    <img
                        src={imgPreview} 
                        alt="프로필 이미지"
                    />
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
                    <TextArea
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
                    <GenreContainer>
          {genres.map((genre) => (
            <div key={genre}>
              <input
                type="checkbox"
                id={genre}
                value={genre}
                onChange={handleGenreChange}
                checked={selectedGenres.includes(genre)}  
              />
              <label htmlFor={genre}>{genre}</label>
            </div>
          ))}
        </GenreContainer>
                </InputWrapper>
                <InputWrapper>
                    <div className="label">
                        <Label>
                            Position
                        </Label>
                    </div>
                    <GenreContainer>
          {positions.map((position) => (
            <div key={position}>
              <input
                type="checkbox"
                id={position}
                value={position}
                onChange={handlePositionChange}
                checked={selectedPositions.includes(position)}  
              />
              <label htmlFor={position}>{position}</label>
            </div>
          ))}
        </GenreContainer>
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
            {/* <Span>
                <MdLockOutline />
                <span>Change password</span>
            </Span> */}
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
    width: 25rem;
    text-align: center;
    height: 2.5rem;
`
const TextArea = styled.input`
    background-color: #151c2c;
    color: white;
    border: none;
    width: 25rem;
    text-align: center;
    height: 11rem;
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