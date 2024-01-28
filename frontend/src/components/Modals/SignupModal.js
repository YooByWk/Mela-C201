import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Dropdown from '../Dropdown/SignupGender';
import CalendarDropdown from '../Dropdown/Calendar';
import { signup } from '../API/AuthAPI';

function SignupModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [view, setView] = React.useState(false)
  const [values, setValues] = React.useState({
    email: "", 
    password: "", 
    password2: "",
    name: "",
    nickname: "", 
    gender: "", 
    birth: "",
  })

  const handleChange = async (e) => {
    setValues({...values,
    [e.target.id]: e.target.value,})
  }

  const handleSubmit = async (e) => {
    signup(values)
    .then((res) => {
      window.location.href = `/signin`
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <TriggerButton type="button" onClick={handleOpen}>
        Sign Up
      </TriggerButton>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }} onSubmit={handleSubmit}>
          <h2 id="unstyled-modal-title" className="modal-title">
            SIGN UP
          </h2>
          <p id="unstyled-modal-description" className="modal-description">
            Email
            <input type='email' placeholder='ssafy@gmail.com' id='email' onChange={handleChange}/>
            <br/>
            Password
            <input type='password' placeholder='8-20자 영어, 숫자, 특수문자 조합' id='password' onChange={handleChange}/>
            <br/>
            Password again
            <input type='password' id='password2' onChange={handleChange}/>
            <br/>
            Name
            <input type='text' placeholder='홍길동' id='name' onChange={handleChange}/>
            <br/>
            Nickname
            <input type='text' placeholder='최대 32자' id='nickname' onChange={handleChange}/>
            <br/>
              <ul onClick={() => {setView(!view)}} id='gender' onChange={handleChange}>
                Gender{" "}
                {view ? '⌃' : '⌄'}
                {view && <Dropdown />}
              </ul>
            <br/>
            <ul onClick={() => {setView(!view)}} id='birth' onChange={handleChange}>
              Birth{" "}
              {view ? '⌃' : '⌄'}
              {view && <CalendarDropdown />}
            </ul>
            <br/>
            <input type='checkbox' />
              다른 회원의 검색 조건에 노출을 허용합니다.
            <br />
            <button type='submit'>
              Create an account
            </button>
          </p>
        </ModalContent>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};



const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

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
  `,
);

// signup버튼
const TriggerButton = styled('button')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: #0C0A15;
    border: 1px solid #254EF8;

    // 버튼을 올렸을 때 색상
    &:hover {
      background: #254EF8;
      border-color: white;
    }

    // 버튼을 누를 때 색상
    &:active {
      background: #254EF8;
    }
  `,
);

export default SignupModal