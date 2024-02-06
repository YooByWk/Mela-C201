import styled from "styled-components";
import Navbar from "../components/Navbar";
import mainImage from '../assets/images/mainImage.png'
import SignupModal from '../components/Modals/SignupModal';
import SigninModal from "../components/Modals/SigninModal";
import { styled as styled2 } from '@mui/system' ;
// background-color: ${props => props.theme.colours.primary};


const LandingPageContainer = styled.div`  
  min-height: 300vh;
  background-color: ${props => props.theme.colours.primary};
  color: white;
  text-align: center;

`

const LandingImageDiv = styled.div`
  background-image: url(${mainImage});
  background-size: 100% auto;
  background-repeat: no-repeat;
  min-height: calc(100vh + 5rem);
  margin-top: -15vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  h1 {
    color: white;
    font-size: 4.4rem;
    margin-bottom: 1.5vh;
    padding: 1%;
    font-family: InterBold;
  }
  > div:nth-child(1) {
  }
  > div:nth-child(3) {
    flex-grow: 0.3;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding-bottom: 5%; */
    gap: 3rem;
  }
`;

const SignUp = styled2(SignupModal)`
  margin: 2rem;
  font-size: 1.5rem;
  padding: 12px 24px;
`;

const SignIn = styled(SigninModal)`
  font-size: 1.5rem;
  padding: 12px 24px;
`;

// console.log(props)
function Landing() {
  return (  
    <>
      <Navbar/>
      <LandingPageContainer>
        <LandingImageDiv>
        <div></div>
        <div>
          <h1>M A T C H</h1>
          <h1>C O L L A B O R A T E</h1>
          <h1>P O R T F O L I O</h1>
        </div>
        <div>
          <SignUp  />
          <SignIn />
        </div>
        </LandingImageDiv>

      <div>
        <div>
          <h1> Matching</h1>
        </div>
        <div>
          <h1> Gathering List</h1>
        </div>
        <div>
          <h1> Popular Musicians</h1>
        </div>
        <div>
          <h1> Community</h1>
        </div>
        {/* 테스트 코드이므로 실수로 커밋되었다면 삭제해주세요 */}
        <img src="https://s3.ap-northeast-2.amazonaws.com/my.first.mela.sss.bucket/mela/upload/2024/02/06/png/c65a3900-7de6-40dd-b0ae-6f9571aabf55_albumart.png" alt="BigCo Inc. logo"/>
      </div>

      
      </LandingPageContainer>
    </>
  );
}

export default Landing;