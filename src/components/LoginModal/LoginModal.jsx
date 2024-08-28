import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { withSnackbar } from 'notistack';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { forgotPassword } from '../../api';
import './LoginModal.scss';
import { signin, signup } from '../../actions/auth';
import googleSignin from '../../assets/google.png';

const LoginModal = ({ isShown, onHide, enqueueSnackbar }) => {
  const [open] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState({ display: 'none' });
  // eslint-disable-next-line no-unused-vars
  const [registerLoading, setRegisterLoading] = useState({ display: 'none' });
  const dispatch = useDispatch();
  const [loginUser, setLoginUser] = useState({
    identifier: '',
    password: '',
  });

  const [signUpUser, setSignUpUser] = useState({
    displayName: '',
    email: '',
    password: '',
    ConfirmPassword: '',
  });

  const [forgotPass, setForgotPass] = useState('Forgot your password?');

  const handleForgetPass = () => {
    if (loginUser.identifier === '') {
      setForgotPass('Enter the Email in field');
      setTimeout(() => {
        setForgotPass('Forgot your password?');
      }, 4000);
    } else {
      forgotPassword(loginUser.identifier)
        .then((response) => {
          console.log('Your user received an email', response);
          setForgotPass('Password Reset Email Sent.');
          enqueueSnackbar('Please check your email for password reset instructions', { variant: 'success' });
        })
        .catch((error) => console.log(error));
    }
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginUser((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUpUser((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleSignInPanel = () => {
    setActive(false);
  };

  const handleSignUpPanel = () => {
    setActive(true);
  };

  const submitSignUp = async (event) => {
    event.preventDefault();
    setRegisterLoading({ display: 'inline' });
    const {
      displayName, email, password, ConfirmPassword,
    } = signUpUser;

    if (password !== ConfirmPassword) {
      enqueueSnackbar('Passwords don\'t match. Please try again!', { variant: 'error' });
      return;
    }

    try {
      dispatch(signup({ username: email, displayName, email, password, confirmed: false }))
        .then((res) => {
          setRegisterLoading({ display: 'none' });
          if (res === 'Email is already taken.') {
            enqueueSnackbar('You have already registered. Please try signing in.', { variant: 'error' });
          } else {
            onHide();
          }
        })
        .catch((error) => alert(error.message));

      setSignUpUser({
        displayName: '',
        email: '',
        password: '',
        ConfirmPassword: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const submitSignIn = async (event) => {
    event.preventDefault();
    setLoading({ display: 'inline' });
    dispatch(signin(loginUser))
      .then((response) => {
        setLoading({ display: 'none' });
        if (response === 'Your account email is not confirmed') {
          setShowWarning(true);
          setTimeout(() => {
            setShowWarning(false);
          }, 5000);
        } else if (response === 'Identifier or password invalid.') {
          enqueueSnackbar('Wrong Email or Password. Please try again!', { variant: 'error' });
        } else {
          onHide();
        }
      });

    setLoginUser({ identifier: '', password: '' });
  };

  return (
    <Modal
      dialogClassName="modal-50w"
      className="ModalLogin"
      centered
      show={isShown && open}
      aria-labelledby="example-modal-sizes-title-lg"
      onHide={onHide}
    >
      <Modal.Body
        className={`container ${active ? 'right-panel-active' : ''}`}
        id="container row"
      >
        {showWarning && (
          <nav className="navbar fixed-top navbar-expand" style={{ color: 'white', backgroundColor: 'red', position: 'absolute', top: 0, left: 0, zIndex: 1000 }}>
            <div className="navbar-collapse collapse" id="navbar2">
              <b>
                To login and get access to all the featues of the website, please verify your email.
              </b>
            </div>
          </nav>
        )}
        <nav className="navbar navbar-expand login-info">
          <div className="navbar-collapse collapse" id="navbar2">
            <b>
              Having trouble signing in?
              Please reset your password.
            </b>
          </div>
        </nav>
        <div className="form-container form-group sign-up-container">
          <form onSubmit={(e) => submitSignUp(e)} className="pr-4">
            <h2 style={{ marginBottom: '15px' }}>Create Account</h2>
            <button style={{ backgroundColor: '#ffffff' }}>
              <a href="https://raahee-server.eastus.cloudapp.azure.com/connect/google" style={{ textDecoration: 'none', color: '#aa66cc' }}>
                <img height={18} width={18} src={googleSignin} alt="google sign in" style={{ marginRight: '5px' }} />
                Sign Up with Google
              </a>
            </button>
            <span style={{ marginTop: '15px' }}>or create account with email password</span>
            <input
              type="text"
              name="displayName"
              value={signUpUser.displayName}
              onChange={handleSignUpChange}
              placeholder="Name"
              className="form-control"
            />
            <input
              type="email"
              name="email"
              onChange={handleSignUpChange}
              value={signUpUser.email}
              placeholder="Email"
              className="form-control"
            />
            <input
              type="password"
              name="password"
              onChange={handleSignUpChange}
              value={signUpUser.password}
              placeholder="Password"
              className="form-control"
            />
            <input
              type="password"
              name="ConfirmPassword"
              onChange={handleSignUpChange}
              value={signUpUser.ConfirmPassword}
              placeholder="Confirm Password"
              className="form-control"
            />
            <button
              type="submit"
              className="btn"
            >
              Sign Up
              <Box sx={loading}>
                <CircularProgress color="#ffffff" />
              </Box>
            </button>
          </form>
        </div>
        <div className="form-container form-group sign-in-container">
          <form onSubmit={(e) => submitSignIn(e)} className="pr-4">
            <h1>Sign in</h1>
            <br />
            <button style={{ backgroundColor: '#ffffff' }}>
              <a href="https://raahee-server.eastus.cloudapp.azure.com/connect/google" style={{ textDecoration: 'none', color: '#aa66cc' }}>
                <img height={18} width={18} src={googleSignin} alt="google sign in" style={{ marginRight: '5px' }} />
                Sign In with Google
              </a>
            </button>
            <br />
            <span>or use your account</span>
            <input
              type="email"
              name="identifier"
              onChange={handleLoginChange}
              value={loginUser.identifier}
              placeholder="Email"
              className="form-control"
            />
            <input
              type="password"
              name="password"
              onChange={handleLoginChange}
              value={loginUser.password}
              placeholder="Password"
              className="form-control"
            />
            <i role="button" onClick={handleForgetPass} className="link">
              {forgotPass}
            </i>
            <button type="submit">
              Sign In
              <Box sx={loading}>
                <CircularProgress color="#ffffff" />
              </Box>
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="btn btn-white text-dark" id="signIn" onClick={handleSignInPanel} style={{ textTransform: 'none' }}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="btn btn-white text-dark" id="signUp" onClick={handleSignUpPanel} style={{ textTransform: 'none' }}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default withSnackbar(LoginModal);
