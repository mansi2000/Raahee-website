import React, { useEffect, useRef } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { withSnackbar } from 'notistack';
import { Avatar } from '@material-ui/core';
import { sendEmailVerification } from '../../api';
import { getEvents } from '../../actions/events';
import { SHOW_MODAL } from '../../store/reducers/showLoginModal';
import { LOGOUT } from '../../constants/actionTypes';
import './Header.scss';
import { getMhps } from '../../actions/mhps';
import { getBlogs } from '../../actions/blogs';
import { getTherapyTerms } from '../../actions/therapyTerms';
import { getSchedule } from '../../actions/therapySchedule';

const Header = ({
  location,
  history,
  enqueueSnackbar,
}) => {
  const dispatch = useDispatch();
  const navbarRef = useRef();

  const profile = JSON.parse(localStorage.getItem('profile'));
  const user = JSON.parse(localStorage.getItem('profile'))?.user;
  const userAuth = JSON.parse(localStorage.getItem('profile'))?.jwt;

  // white background of navbar in small screen
  const isShowing = () => {
    const collapse = document.querySelector('.navbar-collapse');
    collapse.classList.toggle('bg-light');
  };

  // change navbar color on scroll
  const navbarStyleListener = () => {
    if (navbarRef.current) {
      if (window.location.pathname === '/' && window.scrollY < 90) {
        navbarRef.current.className = 'navbar fixed-top navbar-expand-lg navbar-light';
      } else {
        navbarRef.current.className = 'bg-light shadow navbar fixed-top navbar-expand-lg navbar-light';
      }
    }
  };

  useEffect(() => {
    if (user && !userAuth) {
      dispatch(SHOW_MODAL());
    }
    dispatch(getEvents());
    dispatch(getBlogs());
    dispatch(getMhps());
    dispatch(getTherapyTerms());
  }, []);

  useEffect(() => {
    if (profile?.jwt) {
      dispatch(getSchedule(profile.user.id));
    }
  }, [profile]);

  useEffect(() => {
    window.addEventListener('scroll', navbarStyleListener);
    return () => {
      window.removeEventListener('scroll', navbarStyleListener);
    };
  }, []);

  useEffect(() => {
    navbarStyleListener();
  }, [location]);

  const logout = () => {
    dispatch({ type: LOGOUT });
    enqueueSnackbar('Successfully logged out!');
    history.push('/');
  };

  const verifyEmail = () => {
    if (!user.confirmed) {
      sendEmailVerification(user.email).then(() => {
        enqueueSnackbar('Check your email for the link!', { variant: 'success' });
      }).catch((err) => {
        console.error(err);
      });
    } else {
      enqueueSnackbar('Email Already Verified!', { variant: 'error' });
    }
  };

  return (
    <div className="Header">
      <nav ref={navbarRef}>
        <Link className="navbar-brand" to="/">
          RAAHEE
          <hr />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={isShowing}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                activeClassName="selected"
                className="nav-link navsize"
                exact
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="selected"
                className="nav-link navsize"
                to="/event"
              >
                Events
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                activeClassName="selected"
                className="nav-link navsize"
                to="/blog"
              >
                Blogs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="selected"
                className="nav-link navsize"
                to="/therapists"
              >
                Therapists
              </NavLink>
            </li>
            <li className="nav-item">
              <a
                className="nav-link navsize"
                href="https://discord.gg/RZyGBY7JnH"
                target="_blank"
                rel="noreferrer"
              >
                Community
              </a>
            </li>
          </ul>
          <div className="vertical" />
          <ul className="navbar-nav user mx-lg-4">
            {!userAuth && (
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-secondary text-capitalize px-4"
                  id="login-button"
                  onClick={() => {
                    dispatch(SHOW_MODAL());
                  }}
                >
                  Sign In
                </button>
              </li>
            )}
            {userAuth && (
              <li
                className="nav-item dropdown"
                id="user-dropdown"
              >
                <i
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Avatar src={user.image?.url} style={{ height: '30px', width: '30px' }} />
                </i>
                <div className="nav-item dropdown-menu" aria-labelledby="navbarDropdown">
                  {/* <button
                    className="dropdown-item"
                    id="login-button"
                    onClick={() => history.push('/profile')}
                  > */}
                  <NavLink
                    activeClassName="selected"
                    className="nav-link navsize dropdown-item"
                    id="login-button"
                    exact
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                  {/* </button>
                   <button
                    className="dropdown-item"
                    id="login-button"
                    onClick={() => history.push(`/community/${auth.currentUser.uid}`)}
                  >
                    My Posts
                  </button> */}
                  <button
                    className="dropdown-item"
                    id="login-button"
                    onClick={logout}
                  >
                    Log Out
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {user && !user.confirmed && (
        <nav className="navbar fixed-top navbar-expand" style={{ color: 'white', backgroundColor: 'red', marginTop: '4.5rem' }}>
          <div className="navbar-collapse collapse" id="navbar2">
            <b>
              To get access to all the featues of the website, please verify
              {' '}
              <span role="button" style={{ textDecoration: 'underline' }} onClick={verifyEmail}>your email</span>
              {' '}
              and then Sign In.
            </b>
          </div>
        </nav>
      )}
    </div>
  );
};

export default withRouter(withSnackbar(Header));
