import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultButton from "../components/DefaultButton";
import { newPassword } from "../API/UserAPI";
import styled from "styled-components";

function ChangePassword() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token')
    const [value, setValue] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('')
    
    // 유효성 검사
    const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false)
    
    const handleChange = async (e) => {
        setValue(e.target.value)
    }

    // 비밀번호 확인
    const handlePasswordCheck = (e) => {
        const currentPasswordConfirm = e.target.value
        setPasswordConfirm(currentPasswordConfirm)
        if (value === currentPasswordConfirm) {
            setIsPasswordConfirm(true)
            // console.log(isPasswordConfirm)
        } else {
            setIsPasswordConfirm(false)
            // console.log(isPasswordConfirm)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/
        if (!passwordPattern.test(value)) {
            alert('비밀번호 형식이 올바르지 않습니다.')
            return
        }

        if (isPasswordConfirm) {
            try {
                const response = await newPassword({ password: value, token })
                // console.log(response)
                alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.')
                navigate('/')
            } catch (err) {
                // console.log(err)
            }
        } else {
            alert('비밀번호가 일치하지 않습니다.')
        }
    }

    return (
        <Container>
            <div>
                <label id="password">새 비밀번호</label>
                <input type="password"
                    id="password"
                    placeholder="8-20자 영어, 숫자, 특수문자 조합"
                    onChange={handleChange}
                    className="input"
                    required
                    pattern='/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/'
                />
            </div>
            <div>
                <label id='passwordCheck'>비밀번호 확인</label>
                <input type="password"
                    id="passwordCheck"
                    placeholder="한 번 더 입력해주세요"
                    // value={passwordConfirm}
                    onChange={handlePasswordCheck}
                    className="input"
                    required
                    />
                    {passwordConfirm && (isPasswordConfirm
                        ? <p style={{ color : 'blue' }}>비밀번호가 일치합니다.</p>
                        : <p style={{ color : 'red' }}>비밀번호가 다릅니다.</p>    
                    )}
            </div>
            <div className="buttonWrapper">
                <DefaultButton 
                    text='변경하기'
                    onClick={handleSubmit}
                    width='5rem'
                />
            </div>
        </Container>
    )
}

export default ChangePassword


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #10141d;
    height: 30rem;
    color: white;

    .input {
        margin-bottom: 1rem;
        border: none;
        border-radius: 5px;
        height: 2rem;
        width: 20rem;
        padding: 3px;
    }

    .buttonWrapper {
        margin: 1rem;
    }

    label {
        color: white;
        margin-right: 1rem;
    }
`