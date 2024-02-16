import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { styled, css } from '@mui/system'
import { Modal as BaseModal } from '@mui/base/Modal'
import { signin } from '../../API/AuthAPI'
import useStore from '../../status/store'
import { useNavigate } from 'react-router-dom'

function CoSigninModal({className, fontSize, padding, open, setOpen}) {

  const setIsLogined = useStore(state => state.setIsLogined)
  const IsLogined = useStore(state => state.islogined)
  const fetchUser = useStore(state => state.fetchUser)
  const userInfo = useStore(state => state.user)
  const movePage = useNavigate()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [values, setValues] = React.useState({
    id: "", 
    password: "", 
  })
  
  const handleChange = async (e) => {
    setValues({...values,
    [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    signin(values)
    .then((res) => {
      localStorage.clear()
      localStorage.setItem('accessToken', res.accessToken)
      setIsLogined(true)
      fetchUser().then(() => {
      })
      movePage('/community/create')
    })
    .then(() => {

    })
    .catch((err) => {
    })
  }

  return (
    <>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }}>
          <h2 id="modal-title" className="modal-title">
            SIGN IN
          </h2>
          <form onSubmit={handleSubmit}> 
          <div id="modal-description" className="modal-description">
            Email
            <input type='email' placeholder='ssafy@gmail.com' id='id' onChange={handleChange} />
            <br/>
            Password
            <input type='password' placeholder='8-20자 영어, 숫자, 특수문자 조합' id='password' onChange={handleChange} />
            <br />
            <input type='checkbox' />
              Remember me
            <br />
            <button type='submit'>
              Log in
            </button>
            <br />
            <div id='find-password' className='find-password'>
              Forgot password
            </div>
          </div>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
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
  background-color: transparent;
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
    ${'' /* border: solid 1px #254EF8; */}
    padding: 24px;
    background-color: #151C2C ;
    color : white ;

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

    & .find-password {
      margin: 0;
      font-weight: 200;
      margin-bottom: 4px;
      color: gray;
    }
  `,
)

const dynamicStyle = ({ fontSize = '0.875rem', padding = '8px 16px' }) => css`
  font-size: ${fontSize};
  padding: ${padding};
`;
// signin버튼
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

export default CoSigninModal