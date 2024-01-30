import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';

function SignupModal({className, fontSize, padding}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
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
          <p id="unstyled-modal-description" className="modal-description">
            Email
            <input type='email' placeholder='ssafy@gmail.com' />
            <br/>
            Password
            <input type='password' placeholder='8-20자 영어, 숫자, 특수문자 조합' />
            <br/>
            Password again
            <input type='password' />
            <br/>
            Name
            <input type='text' placeholder='홍길동'/>
            <br/>
            Nickname
            <input type='text' placeholder='최대 32자'/>
            <br/>
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
    color : white;
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
);

export default SignupModal