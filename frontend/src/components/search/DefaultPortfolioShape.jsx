// import { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import defaultimage from '../assets/images/default-image.png'
// import { getImg } from "../API/FileAPI";

// function DefaultPortfolioShape() {
//     const [profileImageURL, setProfileImageURL] = useState()
//     const [albumImageURL, setAlbumImageURL] = useState()

//     useEffect(() => {
//       const profileImageInfo = async() => {     
//         try {
//           if (props.image) {
//             const response = await getImg(props.image.fileIdx)
//             setProfileImageURL(response.message)
//           }
//            else {
//             setProfileImageURL(defaultimage)
//           }
//           } catch (err) {
//             console.error(err)  
//           }
//         }
        
//         profileImageInfo()
        
//         const albumImageInfo = async() => {     
//           try {
//             if (props.image) {
//               const response = await getImg(props.image.fileIdx)
//               setAlbumImageURL(response.message)
//             }
//              else {
//               setAlbumImageURL(defaultimage)
//             }
//             } catch (err) {
//               console.error(err)  
//             }
//           }
          
//           albumImageInfo()

//       },[])
//     return(
//         <Container
//         >
//             <Album
//               src={albumImageURL} 
//               alt="앨범 이미지"
//               />
//             <div className='userInfo'>
//             <Profile 
//               src={profileImageURL} 
//               alt="프로필 이미지"
//               />
//             <Content>
//                 {props.nickname}
//             </Content>
//             </div>

//         </Container>
//     )
// }

// export default DefaultPortfolioShape

// const Container = styled.div`
//     width: 50px;
//     height: 50px;
// `
// const Album = styled.image`
//     width: 90%;
//     height: 60%;
//     border-radius: 10%;
// `

// const Profile = styled.div`
//     width: 5px;
//     height: 5px;
//     border-radius: 50%;
// `

// const Content = styled.p`
//   color: white;
// `