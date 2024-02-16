import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { signin } from "../../API/AuthAPI";
import useStore from "../../status/store";
import { useNavigate, Link } from "react-router-dom";

function SigninModal({ className, fontSize, padding }) {
  const setIsLogined = useStore((state) => state.setIsLogined);
  const IsLogined = useStore((state) => state.islogined);
  const fetchUser = useStore((state) => state.fetchUser);
  const userInfo = useStore((state) => state.user);
  const movePage = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [values, setValues] = React.useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signin(values);
      // console.log(res);

      if (res && res.accessToken) {
        localStorage.clear();
        localStorage.setItem("accessToken", res.accessToken);
        setIsLogined(true);
        await fetchUser();
        // movePage('/')
        window.location.reload();

        setOpen(false);
      }
    } catch (err) {
      // console.log(err);

      if (err.response && err.response.status === 401) {
        const emailId = values.id.split("@");
        // console.log(emailId[0])
        alert("이메일 인증을 먼저 완료해주세요.");
        movePage(`/signup/${emailId[0]}`);
      } else {
        alert("로그인 실패");
      }
    }
  };

  return (
    <div>
      <TriggerButton
        type="button"
        onClick={handleOpen}
        className={className}
        fontSize={fontSize}
        padding={padding}
      >
        Sign In
      </TriggerButton>
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
              <div className="inputWrapper">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="ssafy@gmail.com"
                  id="id"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="inputWrapper">
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  required
                  placeholder="8-20자 영어, 숫자, 특수문자 조합"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="button">
                Log in
              </button>
              <Link to="/forgotPassword">
                <div id="find-password" className="find-password">
                  Forgot password
                </div>
              </Link>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
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

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
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
    background: linear-gradient(180deg, #0c0a15 0%, #171930 100%);

    & .modal-title {
      text-align: center;
      line-height: 1.5rem;
      margin-bottom: 2rem;
      text-decoration: underline;
      text-decoration-color: #254ef8;
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

    & .button {
      background-color: #254ef8;
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
      color: #254ef8;
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
  `
);

const dynamicStyle = ({ fontSize = "0.875rem", padding = "8px 16px" }) => css`
  font-size: ${fontSize};
  padding: ${padding};
`;
// signin버튼
const TriggerButton = styled("button")(
  // ({ theme, fontSize, padding }) => css`
  `${dynamicStyle}
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: ${(props) => props.fontSize || "0.875rem"};
    padding: ${(props) => props.padding || "8px 16px"};
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
  `
);

export default SigninModal;
