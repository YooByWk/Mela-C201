import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { styled, css } from '@mui/system'
import { Modal as BaseModal } from '@mui/base/Modal'
import { signup, checkDupNickname, email } from '../../API/AuthAPI'
//Gender Dropdown
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { emailCheck } from '../../API/UserAPI'

function SignupModal({className, fontSize, padding}) {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [passwordConfirm, setPasswordConfirm] = React.useState('')
  const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false)
  const [values, setValues] = React.useState({
    emailId: "",
    emailDomain: "", 
    password: "", 
    name: "",
    nickname: "", 
    gender: "", 
    birth: "",
    searchAllow: "",
  })
  
  // 닉네임 중복 확인
  const checkNickname = () => {
    checkDupNickname(values.nickname)
    .then((res) => {
      console.log(values.nickname)
      console.log(res)
      if (res.statusCode === 200) {
        alert('사용 가능한 닉네임입니다.')
      }
    })
    .catch((err) => {
        if (err.statusCode === 409) {
          alert('이미 있는 닉네임입니다.')
        }
        else {
          console.error(err)
        }
    })
  }

  // 이메일 아이디 중복 확인
  const checkEmailId = (e) => {
    e.preventDefault()
    emailCheck(values.emailId)

    .then((res) => {
      console.log(res)
      console.log(values.emailId)
      if (res.statusCode === 200) {
        alert('사용 가능한 아이디입니다.')
      }
    })
    .catch((err) => {
      if (err.statusCode === 409) {
        alert('이미 있는 아이디입니다.')
      }
      else {
        console.error(err)
      }
    })
  }

  const handleChange = async (e) => {
    setValues({...values,
      [e.target.id]: e.target.value,})
      console.log(e.target.value)
    }

  // 비밀번호 확인
  const handlePasswordCheck = async (e) => {
    const currentPasswordCheck = e.target.value
    setPasswordConfirm(currentPasswordCheck)
    if (values.password !== currentPasswordCheck) {
      setIsPasswordConfirm(false)
    } else {
      setIsPasswordConfirm(true)
    }
  }
    
  const handleGenderChange = async (e) => {
    setValues({...values,
      [e.target.name]: e.target.value,})
      console.log(e.target)
    }

  const handleSearchAllowChange = async (e) => {
    setValues({...values,
      [e.target.id]: e.target.checked,})
      console.log(e.target.checked)
    }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await email(values.emailId)
      console.log(values.emailId)
      alert('이메일 인증을 진행해주세요.')
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <TriggerButton type="button" onClick={handleOpen} className={className} fontSize={fontSize} padding={padding}>
        Sign Up
      </TriggerButton>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }}>
          <h2 id="unstyled-modal-title" className="modal-title">
            SIGN UP
          </h2>
          <form  onSubmit={handleSubmit}>
          <div id="unstyled-modal-description" className="modal-description">
            Email
            <input type='text' placeholder='ssafy' id='emailId' onChange={handleChange} />
            @
            <input type='text' palceholder='gmail.com' id='emailDomain' onChange={handleChange} />
            <input type='button' onClick={checkEmailId} value='중복 확인' />
            <br/>
            Password
            <input type='password' placeholder='8-20자 영어, 숫자, 특수문자 조합' id='password' onChange={handleChange}/>
            <br/>
            Password again
            <input type='password' id='password2' onChange={handlePasswordCheck} value={passwordConfirm}/>
            {passwordConfirm && (isPasswordConfirm
              ? <p style={{ color: 'green'}}>비밀번호가 일치합니다.</p>
              : <p style={{ color: 'red'}}>비밀번호가 다릅니다.</p>
            )}
            <br/>
            Name
            <input type='text' placeholder='홍길동' id='name' onChange={handleChange}/>
            <br/>
            Nickname
            <input type='text' placeholder='최대 32자' id='nickname' onChange={handleChange}/>
            <input type='button' onClick={checkNickname} value='중복 확인' />
            <br/>
            <div className='gender-birth'>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Gender
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.gender}
                    label="Gender"
                    onChange={handleGenderChange}
                    name='gender'
                    className='select'
                  >
                    <MenuItem value='Etc'>
                      Etc
                    </MenuItem>
                    <MenuItem value='Male'>
                      Male
                    </MenuItem>
                    <MenuItem value='Female'>
                      Female
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <br/>
              Birth
              <input type='date' id='birth' onChange={handleChange} className='select'/>
            </div>
            <br/>
            <input type='checkbox' id='searchAllow' onChange={handleSearchAllowChange}/>
              다른 회원의 검색 조건에 노출을 허용합니다.
            <br />
            <button type='submit'>
              Create an account
            </button>
          </div>
          </form>
        </ModalContent>
      </Modal>
    </div>
  )
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  )
})

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
}

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    border-radius: 8px;
    border: solid 1px #254EF8;
    padding: 24px;
    color: white;

    & .modal-title {
      text-align: center;
      line-height: 1.5rem;
      margin-bottom: 8px;
      text-decoration: underline;
      text-decoration-color: #254EF8;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      margin-bottom: 4px;
    }

    & .gender-birth {
      display: flex;
    }

    & .select {
      background-color: #151c2c;
      color: white;
    }
  `,
)
const dynamicStyle = ({ fontSize = '0.875rem', padding = '8px 16px' }) => css`
  font-size: ${fontSize};
  padding: ${padding};
`;
// signup버튼
const TriggerButton = styled('button')(
  // ({ theme, fontSize, padding }) => css`
  `${dynamicStyle}
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: ${props => props.fontSize ||'0.875rem'};
    padding: ${props => props.padding || '8px 16px'};
    line-height: 1.5;
    border-radius: 28px;
    transition: all 150ms ease;
    cursor: pointer;
    background: #10141d;
    border: 4px solid #254EF8;
    color: white;
    // 버튼을 올렸을 때 색상
    &:hover {
      background:linear-gradient(90deg, #254EF8,#3960fc, #873FFA,#a977fa);
      border:4px solid #254EF8;
    }

    // 버튼을 누를 때 색상
    &:active {
      background:linear-gradient(90deg, #254EF8, #873FFA);
      border:4px solid #10141d;
    }
  `,
)

export default SignupModal
