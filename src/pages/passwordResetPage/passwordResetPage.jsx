import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { resetPassword } from '../../api';
import raaheeLogo from '../../assets/RaaheeLogo.png';
import './passwordResetPage.scss';

const PasswordReset = (props) => {
  const [password, setpassword] = useState('');
  const [error, setErrorMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [showChangePassword, setshowChangePassword] = useState(false);
  const query = new URLSearchParams(props.location.search);
  const code = query.get('code');
  useEffect(() => {
    props.setShowHeaderAndFooter(false);
  }, []);

  const visiblePassword = (e) => {
    e.preventDefault();
    setshowPassword(!showPassword);
  };
  const visibleChangePassword = (e) => {
    e.preventDefault();
    setshowChangePassword(!showChangePassword);
  };
  const errormessage = (text) => {
    setErrorMessage(text);
    setShowError(true);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password.length < 6) {
        errormessage('Password length should be greater then 6');
      } else if (password !== confirmPassword) {
        errormessage("Sorry! Password didn't matched");
      } else {
        errormessage('Nice! Password Matched');
        resetPassword(password, confirmPassword, code)
          .then(() => {
            props.setShowHeaderAndFooter(true);
            props.history.push('/');
          });
        setConfirmPassword('');
        setpassword('');
      }
    } catch (e) {
      setErrorMessage('Sorry! Error occured, try again', e);
    }
  };
  return (
    <div className="password-reset">
      <div className="password-reset__brandName">
        <img className="heart-logo" src={raaheeLogo} alt="" />
        <p className="brand-name">Raahee</p>
      </div>
      <div className="password-reset__formbox">
        <div
          className={showError ? 'error-message' : ''}
        >
          {error}
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group reset-form-group">
            <label className="reset-form-group__label" htmlFor="password">Password</label>
            <button className="reset-form-group__togglepassword" onClick={visiblePassword}>
              <span><FaEye /></span>
            </button>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="reset-form-group__inputfield"
            />
          </div>
          <div className="form-group reset-form-group">
            <label className="reset-form-group__label" htmlFor="confirm-password">Confirm Password</label>
            <button className="reset-form-group__togglepassword" onClick={visibleChangePassword}>
              <span><FaEye /></span>
            </button>
            <input
              type={showChangePassword ? 'text' : 'password'}
              name="confirm-password"
              placeholder="Confirm-Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="reset-form-group__inputfield"
            />
          </div>
          <div className="password-reset__formbox__btnHolder">
            <button className="password-reset__formbox__btnHolder__btn">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
