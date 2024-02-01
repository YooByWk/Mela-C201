import { useState } from "react"
import styled from "styled-components"
import DefaultButton from "../DefaultButton"
import { FaSearch } from "react-icons/fa";

const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`

const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  justify-content: center;
  text-align: center;
  padding: 30px 50px;
  background-color: #151C2C;
  border-radius: 30px;
  color: white;
`;

const SearchBar = styled.form`
  // 최상위
  position: relative;
  width: 30%;
  text-align: center;
  // search 문구 중앙 정렬
  display: flex;
  justify-content: center;
  align-items: center;
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
    top: 10%;
    left: 12%;
    height: 85%;
  };
`

const submitHandler = (event) => {
  event.preventDefault();
  window.alert('제출버튼확인')
  // state 
}

function TeamspaceInviteModal () {
  const [open, setOpen] = useState(false)

  const openModalHandler = () => {
    setOpen(!open)
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
      <ModalBackdrop onClick={openModalHandler}>
          <SearchBar onSubmit={submitHandler}>
          <FaSearch className='Icon'/>
          <input type="search" spellCheck='false' placeholder='Search'  />
          </SearchBar>
        <ModalView>
          <div>
            초대하기
          </div>
        </ModalView>
      </ModalBackdrop>
      : null}
    </>
  )
}

export default TeamspaceInviteModal