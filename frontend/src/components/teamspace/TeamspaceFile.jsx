import { useState, useEffect } from "react";
import styled from "styled-components"
import { useParams } from "react-router-dom";
import DefaultButton from "../DefaultButton";
import { IoMdClose } from "react-icons/io";
import { Dialog, DialogHeader, DialogBody } from '@material-tailwind/react'
import { Navigate } from "react-router-dom";
import { uploadTeamspaceFile, TeamspaceFileList } from "../../API/TeamspaceAPI"

const H1 = styled.h1`
    color: white;
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
    top: 30%;
    right: 30%;
    background-color: #151C2C;
    padding: 20px;
    color: white;
    
`

const CustomHeader = styled(DialogHeader)`
    text-align: center;
    line-height: 1.5rem;
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
      flex-grow: 1;
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
`
const Div = styled.div`
    color: white;
`
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
                console.log(Object.values(teamspaceFile))
                setValues(teamspaceFile)
              } else {
                console.log(Object.values(teamspaceFile))
              setValues('') }
            } catch (err) {
              console.error(err)
            }
          }; 
          
          teamspaceFileList()
          
        },[])
    
    console.log(values)
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
            Navigate (-1)
        } catch (err) {
            console.error(err)
        }
    }

    return(
    <>
    <H1>Teamspace - File</H1>
        <DefaultButton 
            text={'Upload'}
            backgroundcolor={'#873FFA'}
            fontcolor={'white'}
            width={'100px'}
            onClick={handleModal}
        />
        <Div>
            {values ?  (
                    <>
                    {Object.entries(values).map(([key, value]) => (
                    <Div key={value.fileIdx}>
                        File Description={value.fileDescription}
                        <br/>
                        title={value.originalFilename}
                    </Div>
                  ))}
                    </>
                ) : (
                    <>
                    업로드 된 파일이 없습니다.
                    </>
                )
            }
        </Div>

        
        {/* 업로드 모달 */}
        <CustomDialog open={open} handler={handleModal}>
                <CustomHeader>
                    <h3>팀스페이스 파일 업로드</h3>
                    <CloseButton onClick={handleModal}>
                        <IoMdClose size={30} />
                    </CloseButton>
                </CustomHeader>
                <CustomBody>
                {/* <div className='inputWrapper'>
                    <label className='label'>Title</label>
                    <input type='text' className='input' placeholder='제목' onChange={handleTitle} />
                </div> */}
                <div className='inputWrapper'>
                    <label className='label'>File Description</label>
                    <input type='text' className='input' placeholder='설명' onChange={handleDescription} />
                </div>
                <div className='inputWrapper'>
                    <label className='label-file' for="input-file">업로드 할 파일</label>
                    <input 
                    type='file' 
                    className='input' 
                    onChange={handleFile}  
                    // style={{display: "none"}}
                    id="input-file"
                    />
                </div>
                    {/* <FaFileUpload size={80}/> */}
                </CustomBody>
                <br/>
                <button onClick={handleUpload}>
                    업로드
                </button>
            </CustomDialog>
    </>
    )
}

export default TeamspaceFile