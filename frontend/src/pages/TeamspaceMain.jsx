import DefaultFileShape from "../components/DefaultFolderShape";
import TeamspaceCreateModal from "../components/Modals/TeamspaceCreate";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";


function TeamspaceMain () {
  console.log('팀스페이스 공사중')
  return ( 
    <TeamspaceContainer>
      <SideDiv>
        <Sidebar paddingtop="6vh"/>
      </SideDiv>
      
      <MainDiv>
        <h1>팀 스페이스 공간입니다.</h1>
        <TeamspaceCreateModal />
        <DefaultFileShape 
        />
      </MainDiv>
    </TeamspaceContainer>
   );
}

export default TeamspaceMain ;

const TeamspaceContainer = styled.div`
  background-color: ${(props) => props.theme.colours.primary};
  display: flex;
  /* flex-direction: column; */
  height: 60rem;
  color: white;
  padding-top: 3%;
  justify-content: space-evenly;
  padding-left: 3%;
`;

const SideDiv = styled.div`
  width: 10%;
  padding-left: 2.5%;
`;

const MainDiv = styled.div`
  width: 70%;
  background-color: ${(props) => props.theme.colours.point};
  border-radius: 50px;
  overflow: hidden;
  padding-top: 1%;
  padding-left: 2%;
  display: flex;
  flex-direction: column;

  .Container {
    margin-top: 5%;
    h1 {
      margin-bottom: 3vh;
    }
  }
`;