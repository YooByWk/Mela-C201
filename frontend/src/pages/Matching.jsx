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

    useEffect(() => {
        const imgInfo = async() => {     
            try {
              if (currentUserPortfolio.portfolio_picture_file_idx) {
                const response = await getImg(currentUserPortfolio.portfolio_picture_file_idx.fileIdx)
                // console.log(response)
                setImgURL(response.message)
              } else{
                  setImgURL(defaultprofile)
                }
              } catch (err) {
                console.error(err)
              }
            }
            
            imgInfo()
        const followInfo = async() => {
            try {
                const response = await isFollow(currentUser.emailId)
                setIsFollowed(response)
            } catch (err) {
                // console.log(currentUser)
                // console.log(err)
            }
        }

        followInfo()
    },[currentUser, currentUserPortfolio])
    return ( 
      <>
      <h1>Gather 페이지.</h1>
      </>
     );
  }
  
  export default Matching