import axios from "axios";
import useStore from "../../status/store";
function CommunityCreate() {

  const test = async () => {
    console.log(localStorage.accessToken)
    const response = await axios.get(`http://localhost:8080/api/v1/users/myinfo`, {
      headers: {
        'Authorization': `Bearer ${localStorage.accessToken}` 
      }
    });
    console.log(response.data);
  }
 
  const test2 = useStore(state => state.logout)
  return ( 
    <>
    <p>CommunityCreate</p>
    <button onClick={test}>
      버튼버튼버튼
      버튼버튼버튼
      버튼버튼버튼
    </button>
    <p>CommunityCreate</p>
    <button onClick={test2}>
      버튼버튼버튼
      버튼버튼버튼
      버튼버튼버튼
    </button>
    </>
   );
}

export default CommunityCreate;