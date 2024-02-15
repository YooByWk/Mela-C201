import { useState, useEffect } from "react";
import styled from "styled-components"
import { useParams } from "react-router-dom";
import DefaultButton from "../DefaultButton";
import { IoMdClose } from "react-icons/io";
import { Dialog, DialogHeader, DialogBody } from '@material-tailwind/react'
import { Navigate } from "react-router-dom";
import { uploadTeamspaceFile, TeamspaceFileList } from "../../API/TeamspaceAPI"
import { downloadFile, deleteFile } from "../../API/FileAPI";
import { FaFileArrowDown, FaTrash } from "react-icons/fa6";
import defaultProfile from "../../assets/images/default-profile.png"

function TeamspaceFile () {
    const [open, setOpen] = useState(false)
    const { teamspaceIdx } = useParams()
    const [file, setFile] = useState('')
    const [fileDescription, setFileDescription] = useState('')
    const [values, setValues] = useState()
    
    useEffect(() => {
        const teamspaceFileList = async() => {     
          try {
              const teamspaceFile = await TeamspaceFileList(teamspaceIdx)
              if ("fileIdx" in Object.values(teamspaceFile)[0]) {
                // console.log(Object.values(teamspaceFile))
                setValues(teamspaceFile)
              } else {
                // console.log(Object.values(teamspaceFile))
              setValues('') }
            } catch (err) {
              console.error(err)
            }
          }; 
          
          teamspaceFileList()
          
        },[])
    
    // console.log(values)
    const handleModal = () => {
        setOpen(!open)
    }

    const handleDescription = async (e) => {
        setFileDescription(e.target.value)
    }

    const handleFile = (e) => {
        e.preventDefault()
        
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }


    const handleDownloadFile = async(fileIdx) => {
        // // console.log(fileIdx)
        // try {
        // // console.log(fileIdx)
        // const response = await downloadFile(fileIdx)
        // console.log(response)
        // } catch (err) {
        //     console.log(err)
        // }
    }

    const handleDeleteFile = async(fileIdx) => {
        try {
        const response = await deleteFile(fileIdx)
        // console.log(response)
        } catch (err) {
            // console.log(err)
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        
        if ( file === '' ) {
            alert('파일을 선택해주세요')
            return
        }

        const formData = new FormData()

        const body = JSON.stringify({
            fileDescription: fileDescription
        })

        formData.append('filePostReq', body)
        formData.append('file', file)

        // for (let key of formData.keys()) {
        //     console.log(key, ":", formData.get(key));
        // }

        try {
            await uploadTeamspaceFile({formData: formData, teamspaceid: teamspaceIdx})
            alert('업로드가 완료되었습니다.')
            setFile('')
            setFileDescription('')
            setOpen(!open)
        } catch (err) {
            console.error(err)
        }
    }
    return(
    <>
        <CustomBackdrop open={open} onClick={handleModal}/>
        {/* <Container> */}
        <DefaultButton 
                text={'Upload'}
                backgroundcolor={'#873FFA'}
                fontcolor={'white'}
                width={'80px'}
                onClick={handleModal}
                height={'30px'}
            />
            <br/>
            <div>
                {values ?  (
                        <>
                          <Table>
                            <thead>
                            <tr>
                            <Th>upload User</Th>
                            <Th>File Description</Th>
                            <Th>file</Th>
                            </tr>
                            </thead>
                            <tbody>

                        {Object.entries(values).map(([key, value]) => (
                        <tr key={value.fileIdx}>
                            <Td>
                                {value.uploaderProfileImageUrl ? (
                                    <Profile src={value.uploaderProfileImageUrl} alt="프로필 이미지" />
                                ) : (
                                    <Profile src={defaultProfile} alt="프로필 이미지" />
                                )}
                            {value.userIdx.nickname}
                            </Td>
                            <Td>
                            {value.originalFilename}
                            <br/>
                            {value.fileDescription}
                            </Td>
                            <Td>
                                <a href={process.env.REACT_APP_API_URL + '/file/download?fileIdx=' + value.fileIdx}
                                    download
                                    // target='_blank'
                                    rel='noreferrer'
                                    >
                                        <FaFileArrowDown />
                                </a>
                                <FaTrash onClick={() => handleDeleteFile(value.fileIdx)}/>
                            </Td>
                        </tr>
                            ))}
                            </tbody>
                            </Table>
                        </>
                    ) : (
                        <Div>
                        업로드 된 파일이 없습니다.
                        </Div>
                    )
                }
            </div>
        {/* </Container> */}

        
        {/* 업로드 모달 */}
        <CustomDialog open={open} handler={handleModal}>
                <CustomHeader>
                    <h3>File upload</h3>
                    <CloseButton onClick={handleModal}>
                        <IoMdClose size={30} />
                    </CloseButton>
                </CustomHeader>
                <CustomBody>
                    <div className='inputWrapper'>
                        <label className='label'>File Description</label>
                        <input type='text' className='input' placeholder='설명' onChange={handleDescription} />
                    </div>
                    <div className="body">
                        <div className='input-btn'>
                            <input 
                            type='file'
                            className='inputFile' 
                            onChange={handleFile}  
                            id="input-file"
                            />
                            <label htmlFor="input-file" className="holder">파일 추가</label>
                        </div>
                        {file ? (<p>{file.name}</p>)
                        : (<p>등록된 파일이 없습니다.</p>)
                        }
                    </div>
                </CustomBody>
                <br/>
                <button onClick={handleUpload} className="upload-btn">
                    업로드
                </button>
            </CustomDialog>
    </>
    )
}

export default TeamspaceFile


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const CloseButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    position: absolute;
    top: 3px;
    right: 3px;
`

const CustomDialog = styled(Dialog)`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    width: 40rem;
    height: 25rem;
    top: 20%;
    right: 25%;
    padding: 20px;
    color: white;
    border-radius: 10px;
    background: linear-gradient(180deg, #0C0A15 0%, #171930 100%);
    justify-content: center;
    border: 1px solid #254EF8;

    .upload-btn {
        background-color: #254EF8;
        border: none;
        width: 50%;
        height: 2rem;
        color: white;
        border-radius: 10px;
        font-size: medium;
    }
`

const CustomHeader = styled(DialogHeader)`
    text-align: center;
    line-height: 2rem;
    margin-bottom: 2rem;
    text-decoration: underline;
    text-decoration-color: #254EF8;
`

const CustomBody = styled(DialogBody)`
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    margin-bottom: 4px;

    & .button {
      background-color: #254EF8;
      border: none;
      border-radius: 5px;
      color: white;
      width: 100%;
      height: 2.5rem;
      font-size: medium;
      margin-top: 10px;
    }

    & .input {
      background-color: #151c2c;
      border: none;
      height: 2.5rem;
      color: white;
    }

    & .input-btn {
        border-radius: 20px;
        border: 2px solid #254EF8;
        width: 7rem;
    }

    & .label {
      color: #254EF8;
      font-weight: bold;
      padding: 10px;
    }

    & .inputWrapper {
      background-color: #151c2c;
      margin-bottom: 1rem;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    & .inputFile {
        opacity: 0;
        width: 1px;
        height: 1px;
        position: absolute;
    }

    & .body {
        display: flex;
        justify-content: space-between;
    }

    & .label-file-album {
        padding: 6px 25px;
        background-color:#FF6600;
        border-radius: 4px;
        color: white;
        cursor: pointer;
    }

    & .label-file {
        padding: 6px 25px;
        background-color:#FF6600;
        border-radius: 4px;
        color: white;
        cursor: pointer;
    }

    & .holder {
      display: inline-block;
      padding: 10px 20px;
      cursor: pointer;
      color: gray;
    }
`
const Div = styled.div`
    color: white;
`

const CustomBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1040;
    display: ${({ open }) => (open ? "block" : "none")};
`

const Profile = styled.img`
    width: 50px;
    height: 50px;
    border-radius:50%;
`

const Table = styled.table`
    color: white;
    width: 100%;
`

const Td = styled.td`
    border: solid 1px white;
    vertical-align: middle;
`

const Th = styled.th`
    border: solid 1px white;
    vertical-align: middle;
`