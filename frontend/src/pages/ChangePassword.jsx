import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultButton from "../components/DefaultButton";
import { newPassword } from "../API/UserAPI";

function ChangePassword() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token')
    const [value, setValue] = React.useState('')
    const [passwordCheck, setPasswordCheck] = React.useState('')
    
    const handleChange = async (e) => {
        setValue(e.target.value)
    }

    const handlePasswordCheck = async (e) => {
        setPasswordCheck(e.target.value)
    }

    let regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!regPass.test(value.password)) {
            alert('비밀번호는 8~25자 영어, 숫자, 특수문자 조합이어야 합니다.')
            return
        }

        newPassword({value, token})
        .then((res) => {
            console.log(res)
            alert('비밀번호가 변경되었습니다. 다시 로그인해주세요')
            navigate('/')
        })
        .catch((err) => {
            console.error(err)
        })
    }

    return (
        <div>
            <input type="password"
                id="password"
                placeholder="새로운 비밀번호를 입력해주세요"
                value={value.password}
                onChange={handleChange}
            />
            <input type="password"
                id="passwordCheck"
                placeholder="한 번 더 입력해주세요"
                value={passwordCheck}
            />
            <DefaultButton 
                text='변경하기'
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default ChangePassword