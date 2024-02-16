import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { styled, css } from '@mui/system'
import { Modal as BaseModal } from '@mui/base/Modal'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { signup, checkDupNickname } from '../../API/AuthAPI'
//Gender Dropdown
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { emailCheck } from '../../API/UserAPI'
import moment from 'moment'

function SignupModal({className, fontSize, padding}) {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [passwordConfirm, setPasswordConfirm] = React.useState('')
  const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false)
  const [birthDate, setBirthDate] = React.useState(new Date())
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

  // 이메일 아이디 중복 확인
  const checkEmailId = (e) => {
    e.preventDefault()
    // console.log(values.emailId)
    emailCheck({emailId: values.emailId})

    .then((res) => {
      if (res.statusCode === 200) {
        alert('사용 가능한 아이디입니다.')
      }
    })
    .catch((err) => {
        console.error(err)
        if (err.response.status === 409) {
          alert('이미 있는 아이디입니다.')
        }
    })
  }

  // 닉네임 중복 확인
  const checkNickname = () => {
    checkDupNickname({nickname: values.nickname})
    .then((res) => {
      // console.log(values.nickname)
      // console.log(res)
      if (res.statusCode === 200) {
        alert('사용 가능한 닉네임입니다.')
      }
    })
    .catch((err) => {
      console.error(err)
      if (err.response.status === 409) {
        alert('이미 있는 닉네임입니다.')
      }
  })
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
  
  const handleChange = async (e) => {
    setValues({...values,
      [e.target.id]: e.target.value,})
      // console.log(e.target.value)
    }

  const handleDateChange = (date) => {
    const formmatedDate = moment(date).format('YYYY-MM-DD')
    setBirthDate(formmatedDate)
    setValues({...values, birth: formmatedDate})
  }

    
  const handleGenderChange = async (e) => {
    setValues({...values,
      [e.target.name]: e.target.value,})
      // console.log(e.target)
    }

  const handleSearchAllowChange = async (e) => {
    setValues({...values,
      [e.target.id]: e.target.checked,})
      // console.log(e.target.checked)
    }

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(values)
    .then((res) => {
      alert('이메일 인증을 진행해주세요.')
      navigate(`/signup/${values.emailId}`)
    })
    .catch ((err) => {
      // console.log(err)
    })
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
        <ModalContent sx={{ width: 500, height: 500 }}>
          <h2 id="unstyled-modal-title" className="modal-title">
            SIGN UP
          </h2>
          <form  onSubmit={handleSubmit}>
            <div id="unstyled-modal-description" className="modal-description">
              <div className='inputWrapper'>
                <label className='label'>Email</label>
                <input type='text' placeholder='ssafy' id='emailId' onChange={handleChange} className='input' required/>
                <span>@</span>
                <input type='text' palceholder='gmail.com' id='emailDomain' onChange={handleChange} className='input' required/>
                <input type='button' onClick={checkEmailId} value='중복 확인' className='checkButton'/>
              </div>
              <div className='inputWrapper'>
                <label className='label'>Password</label>
                <input type='password' placeholder='8-25자 영어, 숫자, 특수문자 조합'
                  id='password' onChange={handleChange} className='input' required
                  pattern='^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,25}$'
                />
              </div>
              <div className='inputWrapper'>
                <label className='label'>Password again</label>
                <input type='password' id='password2' onChange={handlePasswordCheck} value={passwordConfirm} className='input' required/>
                {passwordConfirm && (isPasswordConfirm
                  ? <p style={{ color: 'blue'}}>비밀번호가 일치합니다.</p>
                  : <p style={{ color: 'red'}}>비밀번호가 다릅니다.</p>
                )}
              </div>
              <div className='inputWrapper'>
                <label className='label'>Name</label>
                <input type='text' placeholder='홍길동' id='name' onChange={handleChange} className='input' required/>
              </div>
              <div className='inputWrapper'>
                <label className='label'>Nickname</label>
                <input type='text' placeholder='최대 25자' id='nickname' onChange={handleChange} className='input'/>
                <input type='button' onClick={checkNickname} value='중복 확인' className='checkButton' />
              </div>
              <div className='gender-birth'>
                <Box sx={{ width: 200 }}>
                  <FormControl fullWidth>
                    <div className='inputWrapper'>
                    <label className='label'>Gender</label>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.gender}
                      label="Gender"
                      onChange={handleGenderChange}
                      name='gender'
                      className='gender'
                      required
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
                    </div>
                  </FormControl>
                </Box>
                <div className='blank' />
                <div className='inputWrapper'>
                  <label className='label' for='birth'>Birth</label>
                  <MyDatePicker
                    id='birth'
                    dateFormat='yyyy-MM-dd'
                    shouldCloseOnSelect
                    selected={birthDate}
                    onChange={handleDateChange}
                    popperPlacement='left'
                    required
                  />
                </div>
              </div>

              <input type='checkbox' id='searchAllow' onChange={handleSearchAllowChange}/>
                다른 회원의 검색 조건에 노출을 허용합니다.
              <br />
              <button type='submit' className='button'>
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
  background-color: rgb(0 0 0 / 0.8);
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
    padding: 4rem;
    color: white;
    background: linear-gradient(180deg, #0C0A15 0%, #171930 100%);

    & .modal-title {
      text-align: center;
      line-height: 1.5rem;
      margin-bottom: 2rem;
      text-decoration: underline;
      text-decoration-color: #254EF8;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      margin-bottom: 4px;
    }

    & .passwordCheck {
      margin-bottom: 5px;
    }

    & .gender-birth {
      display: flex;
    }

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

    & .checkButton {
      background-color: #254EF8;
      border: none;
      color: white;
      border-radius: 10px;
      width: 4.5rem;
      height: 2rem;
      margin-right: 5px;
    }

    & .gender {
      width: 7rem;
      color: white;
    }

    & .input[type=date] {
      position: relative;
    }

    & .input[type=date]::webkit-calendar-picker-indicator {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      cursor: pointer;
    }

    & .birth {
      background-color: #151c2c;
      color: white;
      border: none;
      text-align: center;
      width: 8rem;
    }


    & .blank {
      width: 5rem;
    }
  `,
)

const MyDatePicker = styled(Datepicker)`
  background-color: transparent;
  color: white;
  border: none;
  width: 90%;
  text-align: center;
  font-size: 0.8rem;
`

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
