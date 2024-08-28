import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Modal } from 'react-bootstrap';
import worryingImage from '../../assets/worrying.jpg';
import worryingSketchImage from '../../assets/worry-sketch1.png';
import powerImage from '../../assets/power.jpg';
import decisionImage from '../../assets/decision.jpg';
import writingOptionsImage from '../../assets/writing-options.jpg';
import decisionTwoImage from '../../assets/decision2.jpg';
import './worryTreePage.scss';

const WorryTreePage = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const goToPart2 = () => {
    const part2 = document.getElementById('part-2');
    part2.style.display = 'block';
    setTimeout(() => {
      part2.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const goToYesPart2 = () => {
    const yesPart2 = document.getElementById('yes-part-2');
    yesPart2.style.display = 'block';
    setTimeout(() => {
      yesPart2.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    document.getElementById('no-1').style.display = 'none';
  };

  const goToPart3 = () => {
    const part3 = document.getElementById('part-3');
    part3.style.display = 'block';
    setTimeout(() => {
      part3.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const goToYesPart3 = () => {
    const yesPart3 = document.getElementById('yes-part-3');
    yesPart3.style.display = 'block';
    setTimeout(() => {
      yesPart3.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    document.getElementById('no-2').style.display = 'none';
  };

  const goToNoPart3 = () => {
    const noPart3 = document.getElementById('no-part-3');
    noPart3.style.display = 'block';
    setTimeout(() => {
      noPart3.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    document.getElementById('yes-2').style.display = 'none';
  };

  const end = () => {
    const last = document.getElementById('ending');
    last.style.display = 'block';
    setTimeout(() => {
      last.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const enddiff = () => {
    const last = document.getElementById('no-ending');
    last.style.display = 'block';
    setTimeout(() => {
      last.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    document.getElementById('yes-1').style.display = 'none';
  };

  return (
    <div className="worryTree">
      <Helmet>
        <title>Raahee | Worry Tree</title>
      </Helmet>
      <button type="button" id="primary" className="btn btn-primary" onClick={toggleModal}>
        <i className="fa fa-question-circle-o ml-n3" style={{ fontSize: '20px', marginTop: '100px', zIndex: '3' }} />
      </button>

      {/* <!-- Modal --> */}
      <Modal
        show={showModal}
        onHide={toggleModal}
        dialogClassName="modal-50w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Know your Worry
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-sm-1" />
              <div className="col-sm-4 my-auto">
                <img className="modal-img img-fluid ml-n3" src={worryingSketchImage} alt="activity" />
              </div>
              <div className="col-sm-7">
                <p>
                  Worry is a
                  {' '}
                  <mark className="mark"> repetitive thought</mark>
                  {' '}
                  that bothers us constantly.
                </p>
                <ul>
                  <li>
                    <mark className="mark1">Hypothetical Worries </mark>
                    {' '}
                    which are not in our control
                    eg. 'What if...?'
                  </li>
                  <br />
                  <li>
                    <mark className="mark2">Current Problems</mark>
                    {' '}
                    demand attention and action.
                    We can do something about it.
                  </li>
                </ul>
                <p>
                  So
                  {' '}
                  <b>let's get started</b>
                  {' '}
                  with some
                  {' '}
                  <mark className="mark3">self help talk</mark>
                  !
                </p>
              </div>
            </div>
          </div>
          {/* </div>
              </div>
            </div>
          </div> */}
        </Modal.Body>
      </Modal>

      {/* <!-- Part1 --> */}
      <div className="container worry-tree-component" id="part-1">
        <div className="row" style={{ marginTop: '3rem' }}>
          <div className="col-md-6 my-5">
            <img src={worryingImage} className="img-fluid" alt="worrying" />
          </div>
          <div className="col-md-6 my-auto">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">
                  <h5>What are you worried about?</h5>
                </label
                >
                <textarea
                  type="text"
                  className="form-control"
                  id="Input"
                  maxLength="200"
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={goToPart2}>Next</button>
              {/* <!-- Goes to Part2 --> */}
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Part2 --> */}

      <div className="container worry-tree-component" id="part-2" style={{ display: 'none' }}>
        <div className="row" style={{ marginTop: '1rem' }}>
          <div className="col-md-6 my-5">
            <img src={decisionImage} className="img-fluid" alt="decision" />
          </div>
          <div className="col-md-6 my-auto">
            <form>
              <div className="form-group">
                <label><h5>Can you do something about it?</h5></label>
              </div>
              <button type="button" onClick={goToYesPart2} id="yes-1" className="btn btn-primary mr-1">Yes</button>
              {/* <!-- Goes toYes(Part2) --> */}
              <button type="button" className="btn btn-primary" id="no-1" onClick={enddiff}>No</button>
              {/* <!-- Goes to End --> */}
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Yes(Part2) --> */}
      <div className="container worry-tree-component" id="yes-part-2" style={{ display: 'none' }}>
        <div className="row" style={{ marginTop: '1rem' }}>
          <div className="col-md-6 my-5">
            <img src={writingOptionsImage} style={{ height: '300px' }} className="img-fluid" alt="writing-options" />
          </div>
          <div className="col-md-6 my-auto">
            <form>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  <h5>Work out what you can do.</h5>
                </label
                >
                <textarea
                  type="text"
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  maxLength="200"
                />
              </div>
              <button type="button" onClick={goToPart3} className="btn btn-primary">Next</button>
              {/* <!-- Goes to Part3--> */}
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Part 3 --> */}
      <div className="container worry-tree-component" id="part-3" style={{ display: 'none' }}>
        <div className="row" style={{ marginTop: '1rem' }}>
          <div className="col-md-6 my-5">
            <img src={decisionTwoImage} className="img-fluid" alt="decision" />
          </div>
          <div className="col-md-6 my-auto">
            <form>
              <div className="form-group">
                <label><h5>Is there something you can do about it right now?</h5></label>
              </div>
              <button type="button" onClick={goToYesPart3} id="yes-2" className="btn btn-primary mr-1">Yes</button>
              {/* <!-- Goes to Yes(Part3) --> */}
              <button type="button" onClick={goToNoPart3} id="no-2" className="btn btn-primary">No</button>
              {/* <!-- Goes to No(Part3) --> */}
            </form>
          </div>
        </div>
      </div>

      {/* <!-- Yes(Part3) --> */}
      <div className="container worry-tree-component" id="yes-part-3" style={{ display: 'none' }}>
        <div className="row" style={{ marginTop: '1rem' }}>
          <div className="col-md-6 my-5">
            <img src={powerImage} style={{ height: '300px' }} className="img-fluid" alt="power" />
          </div>
          <div className="col-md-6 my-auto">
            <form>
              <div className="form-group">
                <label><h5>How about you do it right now?</h5></label>
              </div>
              {/* <!--<button type="button" onclick="goToPart3()" class="btn btn-primary mr-1">Back</button>--><!-- Goes to Part3 --> */}
              <button type="button" className="btn btn-primary" onClick={end}>Yeaah</button>
              {/* <!-- Goes to End--> */}
            </form>
          </div>
        </div>
      </div>

      {/* <!-- No(Part3) --> */}
      <div className="container worry-tree-component" id="no-part-3" style={{ display: 'none' }}>
        <div className="row" style={{ marginTop: '1rem' }}>
          <div className="col-md-6 my-5">
            <img src={powerImage} style={{ height: '300px' }} className="img-fluid" alt="power" />
          </div>
          <div className="col-md-6 my-auto">
            <form>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea2">
                  <h5>
                    Plan what you would do and
                    when
                  </h5>
                </label
                >
                <textarea
                  type="text"
                  className="form-control"
                  id="exampleFormControlTextarea2"
                  maxLength="200"
                />
              </div>
              {/* <!--<button type="button" onclick="goToPart3()" class="btn btn-primary mr-1">Back</button>--><!-- Goes to Part3 --> */}
              <button type="button" className="btn btn-primary" onClick={end}>Next</button>
              {/* <!-- Goes to End--> */}
            </form>
          </div>
        </div>
      </div>

      {/* <!-- No(Part2)/ End --> */}
      <div className="container worry-tree-component" id="ending" style={{ display: 'none' }}>
        <div className="row" style={{ marginTop: '1rem' }}>
          <div className="col-md-6 my-5">
            <img src="http://i.stack.imgur.com/SBv4T.gif" alt="this slowpoke moves" height="250" width="300" />

          </div>
          <div className="col-md-6 my-auto">
            <form>
              <div className="form-group">
                <label>
                  <h5>
                    Let the worry go.
                    <span className="time-lapse">Change Focus of Attention</span>
                  </h5>
                  <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>Again?</button>
                  {/* <!-- Reloads--> */}
                </label>
              </div>
            </form>
          </div>

        </div>
      </div>

      <div className="container worry-tree-component" id="no-ending" style={{ display: 'none' }}>
        <div className="row" style={{ marginTop: '1rem' }}>
          <div className="col-md-6 my-5">
            <img src="http://i.stack.imgur.com/SBv4T.gif" alt="this slowpoke moves" height="250" width="300" />

          </div>
          <div className="col-md-6 my-auto">
            <form>
              <div className="form-group">
                <label>
                  <h5>
                    Then don't worry about it.
                    <span className="time-lapse">Change Focus of Attention</span>
                  </h5>
                  <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>Again?</button>
                  {/* <!-- Reloads--> */}
                </label>
              </div>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
};

export default WorryTreePage;
