import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { styled, css } from '@mui/system'
import { Modal as BaseModal } from '@mui/base/Modal'

function TeamspaceCreateModal({className, fontSize, padding}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [values, setValues] = React.useState({
    title: "", 
    content: "",
    members: [], 
  })
  
  const handleChange = async (e) => {
    setValues({...values,
    [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <TriggerButton type="button" onClick={handleOpen} >
        <p>+</p>
      </TriggerButton>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 700 }}>
          <h2 id="modal-title" className="modal-title">
            Create
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
    </div>
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


const TriggerButton = styled('button')(
  ({ theme }) => css`
  /* default */

  position: fixed;
  width: 30px;
  height: 30px;
  left: 33px;
  top: 38px;

  /* Rectangle 1 */

  position: fixed;
  left: 12.5%;
  right: 12.5%;
  top: 12.5%;
  bottom: 12.5%;
  font-size: xx-large;
  color: #254EF8;

  /* btn color

  버튼컴포넌트 색
  */
  border: 2px solid #254EF8;
  border-radius: 4px;


    & :hover {
      /* hover */

      position: fixed;
      width: 30px;
      height: 30px;
      left: 33px;
      top: 38px;

      /* Rectangle 1 */

      position: fixed;
      left: 12.5%;
      right: 12.5%;
      top: 12.5%;
      bottom: 12.5%;
      font-size: xx-large;
      color: white;

      /* btn color

      버튼컴포넌트 색
      */
      background: #254EF8;
      border-radius: 4px;

    }
    `,
)

export default TeamspaceCreateModal