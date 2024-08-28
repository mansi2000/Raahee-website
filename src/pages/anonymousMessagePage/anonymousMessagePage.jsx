import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AdminAnonymousPanel from '../../components/AdminAnonymousPanel/AdminAnonymousPanel';
import UserAnonymousPanel from '../../components/UserAnonymousPanel/UserAnonymousPanel';
import worrySketch from '../../assets/worry-sketch1.png';
import anonymous2Image from '../../assets/anonymous2.png';
import './anonymousMessagePage.scss';

const AnonymousMessagePage = () => {
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="anonymousMessagePage">
      <Helmet>
        <title>Raahee | Anonymous Message</title>
      </Helmet>
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
            Anonymous Message
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-sm-1" />
              <div className="col-sm-4 my-auto">
                <img className="modal-img img-fluid ml-n4" src={worrySketch} alt="activity" />
              </div>
              <div className="col-sm-7">
                <p>
                  {' '}
                  If you ever wished for
                  <mark className="mark">meeting a stranger</mark>
                  {' '}
                  and having a deep conversation with them at the middle of the night,
                  then we've got you!
                </p>
                <ul>
                  <li>
                    Talk to a soul in the same ship as yours.
                    <mark className="mark1">Listen and Be Heard. </mark>
                  </li>
                  <br />
                  <li>
                    <mark className="mark2">Spreading positivity</mark>
                    {' '}
                    doesn't come along with judgements.
                  </li>
                </ul>
                <p>
                  This feature is
                  <mark className="mark3">available on demand</mark>
                  . To take a demo
                  <br />
                  <a href="/">Book Our Workshop</a>
                  {' '}
                  Now!
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="container" style={{ marginTop: '3rem' }}>
        <div className="row">
          <div className="col-md-6 my-5">
            <img src={anonymous2Image} className="img-fluid" alt="anonymous" />
          </div>
          <div
            className="col-md-6 my-auto"
          >
            {
              user?.email === process.env.REACT_APP_ADMIN_EMAIL
                ? <AdminAnonymousPanel />
                : <UserAnonymousPanel />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnonymousMessagePage;
