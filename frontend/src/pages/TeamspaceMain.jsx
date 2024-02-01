import DefaultFileShape from "../components/DefaultFolderShape";
import TeamspaceCreateModal from "../components/Modals/TeamspaceCreate";

function TeamspaceMain () {
  console.log('팀스페이스 공사중')
  return ( 
    <>
    <h1>팀 스페이스 공간입니다.</h1>
    <TeamspaceCreateModal />
    <DefaultFileShape 
    />
    </>
   );
}

export default TeamspaceMain ;