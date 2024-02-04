import axios from "axios";
import useStore from "../../status/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoardCreate } from "../../API/BoardAPI";


function CommunityCreate() {
  const Navigate = useNavigate()
  const islogined = useStore((state) => state.islogined);
  const [showLoginModal, setshowLoginModal] = useState(false)
  const [open, setOpen] = useState(false)

  // 로그인 여부에 따라서.


  const [userinput, setUserInput]  = useState({
    title: '',
    content: '',
  })
  


  const SubmitHandler = async (event)=> {
    event.preventDefault();
    if (event.key === 'Enter') {
      event.preventDefault();
    }
    console.log('제출');
    console.log(userinput);
    
    try {
      const response = await BoardCreate({content: userinput.content, title: userinput.title});
      console.log(response,'res');
      Navigate(`../${response.data.message}`)
    } catch (error) {
      console.error(error);
    }
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
          <textarea type="text" id='content' onChange={handleChange}/>
          <input type="submit" />
        </form>
      </>
    );
  }
}



export default CommunityCreate;
