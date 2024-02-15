import { useState, useEffect } from "react"
import styled from "styled-components"
import DefaultButton from "../DefaultButton"
import { FaSearch } from "react-icons/fa";
import { TeamspaceMemberInvite } from "../../API/TeamspaceAPI";
import { fetchUser, followingList } from "../../API/UserAPI";
import { useParams } from "react-router-dom";
import { userSearch } from "../../API/UserAPI";


const ModalBackdrop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;  // Adjust the width as needed
  height: 70%;  // Adjust the height as needed
  display: flex;
  justify-content: center;
  align-items: center;
  background: #151C2C;
  z-index: 1000;
  border-radius: 30px;
`;

const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  justify-content: center;
  width: 70%;
  height: 70%;
  margin: 2% 2%;
  text-align: center;
  margin-block-end: 30px 50px;
  background-color: #2a3446;
  border-radius: 30px;
  color: white;
  padding-top: 3%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SearchBar = styled.form`
  // 최상위
  position: relative;
  width: 70%;
  text-align: center;
  margin-left:1%;
  margin-top: 20px;
  // search 문구 중앙 정렬
  display: flex;
  justify-content: center;
  align-items: flex-start;
  // 인풋
  & > input {
    background-color: #202C44;
    min-height: 20px;
    width: 80%;
    height: 4vh;
    border:0;
    border-radius: 15rem;
    padding-left: 8%;
    /* min-width: 80px; */
    text-align: center;
    color: white;
    outline: none;
  };
  // Icon 위치 조절
  .Icon {
    background-color: #202C44;
    color: grey;
    position: absolute;
    top: 50%;
    left: 12%;
    transform: translateY(-50%);
    height: 85%;
  };
`;

const InviteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`

function TeamspaceInviteModal () {
  const [open, setOpen] = useState(false)
  const [inviteList, setInviteList] = useState([])
  const [userValues, setUserValues] = useState({})
  const [members, setMembers] = useState([])
  const [searchInput, setSearchInput] = useState('')

  const teamspaceIdx = useParams()

  useEffect(()=> {
    const getUserInfo = async() => {
        try {
            const res = await fetchUser()
            setUserValues(res[0])
        } catch (err) {
            console.error(err)
        }
    }; getUserInfo()

}, [])

  const openModalHandler = () => {
    setOpen(!open)
    const getList = async() => {
      try {
        // console.log(userValues)
        const res = await followingList(userValues.emailId)
        // console.log(res)
        setInviteList(res)
        // console.log(res)
      } catch (err) {
        // console.log(err)
      }
    }
    getList()
    
  }

  const closeModalHandler = (event) => {
    if (event.currentTarget === event.target) { // 모달 백드롭에서의 클릭만 처리
      setOpen(false);
    }
  }

  // 모달 내부 클릭 이벤트 버블링 방지
  const modalContentClickHandler = (event) => {
    event.stopPropagation();
    
  }

  const handleChange = async(e) => {
    setSearchInput(e.target.value)
  }

  const handleMemberChange = (event) => {
    const { checked, value } = event.target;
      setMembers([...members, value])
    // console.log(members);
  };

  const submitHandler = async(event) => {
    event.preventDefault();
    if (searchInput) {
      const response = await userSearch(searchInput);
      if (response.length >= 1) {
        setInviteList(response);
        // console.log(response)
      } else {
        setInviteList('')
      }
    } else {
      const res = await followingList(userValues.emailId)
      // console.log(res)
      setInviteList(res)
    }
  }


  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      for (let index = 0; index < members.length; index++) {
        // console.log(members)
        // console.log(teamspaceIdx)
        await TeamspaceMemberInvite({teamspaceId: teamspaceIdx.teamspaceIdx, userId: members[index]})
      }
      alert('멤버 초대가 완료되었습니다.')
      setOpen(false)
  } catch (err) {
      console.error(err)
  }
  }

  
  return (
    <>
    <DefaultButton
    text={'+ Invite'}
    backgroundcolor={'#254ef8'}
    fontcolor={'white'}
    width={'5rem'}
    height={'2rem'}
    onClick={openModalHandler}
    />
    {open ?
      <ModalBackdrop onClick={closeModalHandler}>
      <InviteContainer>
      <SearchBar onSubmit={submitHandler}>
      <FaSearch className='Icon'/>
      <input id="search" type="text" spellCheck='false' placeholder='Search' onChange={handleChange} />
      </SearchBar>
      <ModalView>
      {inviteList.length >= 1 ? (
        <>
          {Object.entries(inviteList).map(([key, value]) => (
            <div key={value.userIdx ? value.userIdx.emailId : value.emailId}>
              <input
                type="checkbox"
                value={value.userIdx ? value.userIdx.emailId : value.emailId}
                onChange={handleMemberChange}
              />
              <label htmlFor={value.userIdx ? value.userIdx.emailId : value.emailId}>
                {value.userIdx ? value.userIdx.nickname : value.nickname}
              </label>
            </div>
          ))}
        </>
      ) : (
        <>
          검색 결과가 없습니다.
        </>
      )}
    </ModalView>
            <DefaultButton 
            text={'Save'}
            backgroundcolor={'#254ef8'}
            fontcolor={'white'}
            width={'7rem'}
            onClick={handleSubmit}
        />
        </InviteContainer>
      </ModalBackdrop>
      : null}
    </>
  )
}

export default TeamspaceInviteModal