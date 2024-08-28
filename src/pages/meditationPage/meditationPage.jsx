import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import './meditationPage.scss';
import ThoughtCard from '../../components/thoughtCard/thoughtCard';
import { SHOW_MODAL } from '../../store/reducers/showLoginModal';
import { createThought, deleteUserThought, fetchThoughts, fetchThoughtsInPages, updateProfile } from '../../api';

const CryptoJS = require('crypto-js');

const MeditationPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'))?.user;

  const [showModal, setShowModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [val, setVal] = useState('');
  const [thoughts, setThoughts] = useState([]);
  const [lastDoc, setLastDoc] = useState(0);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const event = () => {
    if (val === 'save') saveThoughts(key);
    else if (val === 'prev') prevThoughts(key);
    else if (val === 'reset') ResetKey(key);
  };

  const handleTextChange = (event) => {
    document.querySelector('#type-here').style.border = event.target.value.trim() === '' ? '1px solid red' : '1px solid #ced4da';
    setText(event.target.value);
  };

  const handleChange = (event) => {
    setKey(event.target.value);
  };

  const ResetKey = async (key) => {
    const RAAHEE_AES = CryptoJS.AES.encrypt(
      'RAAHEE',
      CryptoJS.enc.Utf8.parse(key),
      { iv: CryptoJS.enc.Base64.parse(key) },
    ).toString();

    updateProfile({ RAAHEE_AES: RAAHEE_AES }).then((details) => {
      const loggedInUser = JSON.parse(localStorage.getItem('profile'));
      loggedInUser.user = details.data;
      localStorage.setItem('profile', JSON.stringify(loggedInUser));
    });

    fetchThoughts(user.id)
      .then((thoughts) => {
        thoughts.data.forEach((thought) => {
          deleteUserThought(thought.id)
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });

    setKey('');
    enqueueSnackbar('Previous Thoughts deleted !', { variant: 'success' });
    return enqueueSnackbar('Key has been successfully reset !', {
      variant: 'success',
    });
  };

  const saveThoughts = (key) => {
    if (user) {
      if (text.trim() === '') {
        document.querySelector('#type-here').style.border = '1px solid red';
        return;
      }
      const RAAHEE_AES = CryptoJS.AES.encrypt('RAAHEE', CryptoJS.enc.Utf8.parse(key), { iv: CryptoJS.enc.Base64.parse(key) }).toString();
      if (user && user.RAAHEE_AES !== undefined) {
        if (RAAHEE_AES === user.RAAHEE_AES) {
          const thought = CryptoJS.AES.encrypt(text, key).toString();
          createThought({ thought: thought, user: user.id })
            .then(() => setRedirect(true))
            .catch((err) => {
              console.error(err.response);
            });
        } else {
          const action = () => (
            <div>
              <button
                className="btn btn-light"
                onClick={() => {
                  setViewModal(true);
                  setVal('reset');
                  enqueueSnackbar(
                    'Resetting key will delete previous thoughts !!',
                    {
                      variant: 'warning',
                    },
                  );
                }}
              >
                Reset Key
              </button>
            </div>
          );
          return enqueueSnackbar('Wrong key!', {
            variant: 'error',
            action,
          });
        }
      } else {
        updateProfile({ RAAHEE_AES: RAAHEE_AES }).then((details) => {
          const loggedInUser = JSON.parse(localStorage.getItem('profile'));
          loggedInUser.user = details.data;
          localStorage.setItem('profile', JSON.stringify(loggedInUser));
        });
        const thought = CryptoJS.AES.encrypt(text, key).toString();
        createThought({ thought: thought, user: user.id })
          .then(() => setRedirect(true))
          .catch((err) => {
            console.error(err.response);
          });
      }
    } else {
      dispatch(SHOW_MODAL());
    }
    setKey('');
  };

  const prevThoughts = (key) => {
    if (user) {
      const RAAHEE_AES = CryptoJS.AES.encrypt('RAAHEE', CryptoJS.enc.Utf8.parse(key), { iv: CryptoJS.enc.Base64.parse(key) }).toString();
      if (user && user.RAAHEE_AES !== undefined) {
        if (RAAHEE_AES === user.RAAHEE_AES) {
          fetchThoughtsInPages(user.id, 3, lastDoc)
            .then((docs) => {
              if (docs) {
                const last = lastDoc + 3;
                setLastDoc(last);
                docs.data.forEach((doc) => {
                  const data = doc;
                  const id = doc.id;
                  data.thought = CryptoJS.AES.decrypt(
                    doc.thought,
                    key,
                  ).toString(CryptoJS.enc.Utf8);
                  setThoughts((thoughts) => [
                    ...thoughts,
                    { ...data, id },
                  ]);
                });
              }
            })
            .catch((err) => {
              console.error(err.response);
            });
        } else {
          const action = () => (
            <div>
              <button
                className="btn btn-light"
                onClick={() => {
                  setViewModal(true);
                  setVal('reset');
                  enqueueSnackbar(
                    'Resetting key will delete previous thoughts !!',
                    {
                      variant: 'warning',
                    },
                  );
                }}
              >
                Reset Key
              </button>
            </div>
          );
          return enqueueSnackbar('Wrong key!', { variant: 'error', action });
        }
      } else {
        return enqueueSnackbar('No thoughts saved!', { variant: 'error' });
      }
    } else {
      dispatch(SHOW_MODAL());
    }
    setKey('');
  };

  const removeFromArr = (id) => {
    const newThoughts = thoughts.filter((thought) => thought.id !== id);
    setThoughts(newThoughts);
  };

  return (
    <div className="meditationPage">
      <Helmet>
        <title>Raahee | Meditation</title>
      </Helmet>
      {redirect && <Redirect to="/breathe" />}
      <button type="button" id="primary" className="btn btn-primary" onClick={toggleModal}>
        <i className="fa fa-question-circle-o ml-n3" style={{ fontSize: '20px', marginTop: '100px', zIndex: '3' }} />
      </button>

      <Modal
        show={showModal}
        onHide={toggleModal}
        dialogClassName="modal-50w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Vent Out
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 my-auto">
                <img
                  className="modal-img img-fluid ml-n3"
                  src="https://image.freepik.com/free-vector/concentration-meditation-icon-vector_53876-43310.jpg"
                  alt="activity"
                />
              </div>
              <div className="col-sm-6">
                <p>
                  When we
                  {' '}
                  <mark className="mark">vent out</mark>
                  {' '}
                  disturbing thoughts we do not
                  seek advice from someone but want
                  {' '}
                  <mark className="mark">to be heard</mark>
                  .
                </p>
                <ul>
                  <li>
                    <mark className="mark1">Talk</mark>
                    {' '}
                    about your daily struggles, sorrows,
                    anxiety or anger and rip them off like a band-aid at once.
                  </li>
                  <br />
                  <li>
                    <mark className="mark2">De-clutter your mind</mark>
                    {' '}
                    to have a healthy perspective towards unlikely situations
                  </li>
                </ul>
                <p>
                  So
                  {' '}
                  <span className="start">let's get started</span>
                  {' '}
                  with some
                  {' '}
                  <mark className="mark3">self help talk</mark>
                  !
                </p>
              </div>
            </div>
          </div>

        </Modal.Body>
      </Modal>

      <Modal
        show={viewModal}
        onHide={() => { setViewModal(!viewModal); }}
        dialogClassName="modal-50w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Please enter a key
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            If you are a first-time user, please note that Raahee does not
            save your key. It is advisable to keep this key safe with you for future use.
          </p>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="key"
              name="key"
              onChange={handleChange}
              value={key}
            />
            <button
              className="btn aqua-gradient"
              onClick={() => { event(); setViewModal(!viewModal); }}
            >
              Ok
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <div className="container mt-n4">
        <div className="card" id="vent-out-box" style={{ marginBottom: '0em' }}>
          <div className="row custom-row">
            <div className="col-md-1" />
            <div className="col-md-5 my-auto">
              <div className="main-heading">
                <h1>
                  <div className="tagline">
                    What's on your mind?
                  </div>
                </h1>
              </div>

              <div className="form-group">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Type your thoughts here..."
                  id="type-here"
                  rows="8"
                  onChange={handleTextChange}
                  value={text}
                />
              </div>
              <div className="left">
                <Link type="button" className="btn aqua-gradient" to="/breathe">
                  Don't Save
                </Link>
                <button className="btn aqua-gradient" onClick={() => { setViewModal(!viewModal); setVal('save'); }}>
                  Save
                </button>
                <button className="btn aqua-gradient" onClick={() => { setViewModal(!viewModal); setVal('prev'); }}>
                  Previous Thoughts
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="https://image.freepik.com/free-vector/mindfulness-concept-illustration_114360-936.jpg"
                className="img-fluid mb-3 card-img-top"
                alt="meditation"
              />
            </div>
          </div>
        </div>
        {thoughts.length > 0 && (
          <div style={{ marginTop: '-4em' }}>
            <section className="text-center my-5">
              <div className="row mx-auto">
                {thoughts.map((thought) => (
                  <ThoughtCard key={thought.id} {...thought} removeFromArr={removeFromArr} />
                ))}
              </div>
              <br />
              <button className="btn aqua-gradient" onClick={() => { setViewModal(!viewModal); setVal('prev'); }}>Show more</button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeditationPage;
