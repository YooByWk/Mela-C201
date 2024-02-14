import { useEffect, useState } from "react";
import { shortsList } from "../API/ShortsAPI";
import { getVideo } from "../API/FileAPI";

function Matching() {
    const [list, setList] = useState()

    useEffect(() => {
        const getList = async() => {
            try {
                const response = await shortsList()
                setList(response)
            } catch (err) {
                console.log(err)
            }
        }

        getList()
    }, []);

    return ( 
      <>
      <h1>Matching 페이지.</h1>
      </>
     );
  }
  
  export default Matching