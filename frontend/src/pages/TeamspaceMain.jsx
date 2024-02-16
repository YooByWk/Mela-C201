import DefaultFileShape from "../components/DefaultFolderShape";
import TeamspaceCreateModal from "../components/Modals/TeamspaceCreate";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TeamspaceList } from "../API/TeamspaceAPI";
import Alarmbar from "../components/alarm/Alarmbar";

function TeamspaceMain () {
  // const [isWriting, setIsWriting] = useState(false);
  const Navi = useNavigate()
  const [newTeamspace, setNewTeamspace] = useState(null);
  const [values, setValues] = useState({
    endDate: "",
    host: {}, 
    startDate: "", 
    teamDescription: "",
    teamName: "", 
    teamspaceBackgroundPictureFileIdx: {}, 
    teamspaceIdx: "",
    teamspacePictureFileIdx: {},
  })

useEffect(() => {
  const myTeamspaceList = async() => {     
    try {
        const teamspace = await TeamspaceList()
        setValues(teamspace)
      } catch (err) {
        console.error(err)
      }
    }; 
    
    myTeamspaceList()

  },[newTeamspace])


  return ( 
    <TeamspaceContainer>
      <SideDiv>
        <Sidebar paddingtop="6vh"/>
      </SideDiv>
      
      <MainDiv>
        <Navbar backcolour="10" />
          <Outlet />
          <TeamspaceCreateModal />
          <FileContainer>
            {Object.entries(values).map(([key, value]) => (
              <DefaultFileShape 
                  key={value.teamspaceIdx}
                  title={value.teamName}
                  content={value.teamDescription}
                  day={value.endDate}
                  image={value.teamspacePictureFileIdx}
                  onClick={(event) => Navi(`/teamspace/${value.teamspaceIdx}`)}
              />
            ))}
          </FileContainer>
      </MainDiv>
      <RSideDiv>
          <Alarmbar />
      </RSideDiv>
    </TeamspaceContainer>
   );
}


export default TeamspaceMain ;

const FileContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 2px 10%;
  padding-top: 3%;
  padding-left: 7%;
  `
  // overflow: scroll;
  // -ms-overflow-style: none; /* IE and Edge */
  // scrollbar-width: none; /* Firefox */
  // &::-webkit-scrollbar {
  //   display: none;
  // }
const TeamspaceContainer = styled.div`
  background-color: ${(props) => props.theme.colours.primary};
  display: flex;
  /* height: 60rem; */
  color: white;
  padding-top: 3%;
  height: 100%;
  justify-content: space-evenly;

`;

const SideDiv = styled.div`
  width: 12.5vw;
  padding-left: 1%;
  height: 50vh;
`;


const MainDiv = styled.div`
  width: 64%;
  height: 100%;
  min-height: 90vh;
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

const RSideDiv = styled.div`
  width: 15%;
`;