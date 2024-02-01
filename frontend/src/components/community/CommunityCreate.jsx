import axios from "axios";
import useStore from "../../status/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SigninModal from "../Modals/SigninModal";

function CommunityCreate() {
  const Navigate = useNavigate()

  const islogined = useStore((state) => state.islogined);
  const [showLoginModal, setshowLoginModal] = useState(false)

  useEffect(()=> {
    if (!islogined) {
      setshowLoginModal(true)    
    }
  }, [islogined, Navigate])

  const [userinput, setUserInput]  = useState({
    title: '',
    content: '',
  })

  const SubmitHandler = (event)=> {
    event.preventDefault()
    if (event.key === 'Enter') {
      event.preventDefault()
    }
    console.log('제출')
    console.log(userinput)
    //axios 호출 추가하기
  }

  const handleChange = async (event) => {
    setUserInput({
      ...userinput,
      [event.target.id] : event.target.value
    })
  }


  if (islogined) {
    return (
      <>
        <form action="" onSubmit={SubmitHandler}>
          <h2>Title</h2>
          <input type="text" id='title' onChange={handleChange}/>
          <h2>Content</h2>
          <input type="text" id='content' onChange={handleChange}/>
          <input type="submit" />
        </form>
      </>
    );
  } else if (showLoginModal) {
    return <SigninModal />
  }
}



export default CommunityCreate;
