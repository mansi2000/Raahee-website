import React, { useEffect, useState } from 'react';
import { withSnackbar } from 'notistack';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';
import './Feedback.scss';
import {
  useDispatch, useSelector,
} from 'react-redux';
import { SHOW_MODAL } from '../../store/reducers/showLoginModal';
import { createEventFeedback } from '../../actions/eventFeedbacks';
import { createMhpFeedback } from '../../actions/mhpFeedbacks';

const StyledContainer = styled.div.attrs((props) => ({
  width: props.width || '0%',
}))`
  width: ${(props) => props.width};
  height: 100%;
  background-color: #AA66CC;
  border-radius: 10px;
`;

function Feedback({ id, item, enqueueSnackbar }) {
  const [hoverRating, setHoverRating] = useState(5);
  const [reviews, setReviews] = useState(0);
  const [fiveStars, setFiveStars] = useState(0);
  const [fourStars, setFourStars] = useState(0);
  const [threeStars, setThreeStars] = useState(0);
  const [twoStars, setTwoStars] = useState(0);
  const [oneStars, setOneStars] = useState(0);
  const [starCount, setStarCount] = useState(0);
  const [eventObj, setEventObj] = useState({
    rating: 5,
    feedback: '',
  });
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'))?.user;
  const userAuth = JSON.parse(localStorage.getItem('profile'))?.jwt;
  const { eventFeedbacks } = useSelector((state) => state.eventFeedbacks);
  const [loading, setLoading] = useState({ display: 'none' });

  useEffect(() => {
    if (item === 'events') {
      setReviews(eventFeedbacks.length);
      let stars = 0;
      let fiveCount = 0;
      let fourCount = 0;
      let threeCount = 0;
      let twoCount = 0;
      let oneCount = 0;
      eventFeedbacks.forEach((feedback) => {
        stars += parseInt(feedback.rating, 10);
        if (feedback.rating === 5) {
          fiveCount += 1;
        } else if (feedback.rating === 4) {
          fourCount += 1;
        } else if (feedback.rating === 3) {
          threeCount += 1;
        } else if (feedback.rating === 2) {
          twoCount += 1;
        } else {
          oneCount += 1;
        }
      });

      setFiveStars(fiveCount);
      setFourStars(fourCount);
      setThreeStars(threeCount);
      setTwoStars(twoCount);
      setOneStars(oneCount);
      setStarCount(stars);
    }
  }, [eventFeedbacks]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventObj((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const sendFeedback = () => {
    if (userAuth && item === 'events') {
      setLoading({ display: 'inline-block' });
      const { rating, feedback } = eventObj;
      dispatch(createEventFeedback({
        event: id,
        user: user.id,
        rating,
        feedback,
      }))
        .then(() => {
          setLoading({ display: 'none' });
          enqueueSnackbar(
            'Event Feedback Sent!',
            {
              variant: 'success',
              autoHideDuration: 4000,
            },
          );
          setEventObj({
            rating: 5,
            feedback: '',
          });
        })
        .catch(() => {
          enqueueSnackbar('Error sending feedback', { variant: 'error' });
        });
    } else if (userAuth && item === 'mhp') {
      setLoading({ display: 'inline-block' });
      const { feedback } = eventObj;
      dispatch(createMhpFeedback({
        mhp: id,
        user: user.id,
        feedback,
      }))
        .then(() => {
          setLoading({ display: 'none' });
          enqueueSnackbar(
            'Therapist Feedback Sent!',
            {
              variant: 'success',
              autoHideDuration: 4000,
            },
          );
          setEventObj({
            feedback: '',
          });
        })
        .catch(() => {
          enqueueSnackbar('Error sending feedback', { variant: 'error' });
        });
    } else {
      dispatch(SHOW_MODAL());
    }
  };
  return (
    <div className="container EventFeedback" style={{ marginTop: '80px' }}>
      <h4 className="landing-text">
        Feedback:
      </h4>
      <hr />
      <div className="row justify-content-between home-landing">
        <div className={item === 'events' ? 'col-md-6' : 'col-md-12'}>
          <div>
            <div className="container" style={{ padding: 0 }}>
              <div className="hf">
                <textarea
                  style={{ width: '100%', height: '100px' }}
                  placeholder="Write your feedback here"
                  name="feedback"
                  value={eventObj.feedback}
                  onChange={handleChange}
                />
                <div className={`send__review ${item}`}>
                  {item === 'events'
                    ? (
                      <div className="event__rating">
                        {[...Array(5)].map((star, i) => {
                          const ratingValue = i + 1;
                          return (
                            <label key={i}>
                              <input type="radio" className="d-none" name="rating" value={ratingValue} onChange={handleChange} />
                              <FaStar
                                className="yo"
                                color={ratingValue <= (hoverRating || eventObj.rating) ? '#f0932b' : '#C4B8B4'}
                                size={20}
                                onMouseEnter={() => setHoverRating(ratingValue)}
                                onMouseLeave={() => setHoverRating(eventObj.rating ? eventObj.rating : 5)}
                              />
                            </label>
                          );
                        })}
                      </div>
                    ) : <div />}
                  <button
                    className="btn btn-secondary"
                    style={{ boxShadow: 'none', width: 'auto', right: '0' }}
                    onClick={sendFeedback}
                  >
                    <span className="mr-2 spinner-border spinner-border-sm" role="status" style={loading} />
                    Leave a review&nbsp;
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M10.6421 0.679432L10.2927 0.346998C10.1798 0.23805 10.045 0.150786 9.89606 0.0913017C9.74714 0.031817 9.5871 0.000784677 9.42528 1.46896e-05C9.26346 -0.000755297 9.1031 0.0287525 8.95354 0.086817C8.80399 0.144881 8.66823 0.23034 8.5542 0.338209L2.55735 6.04025L1.95474 8.02555C1.92893 8.11112 1.92931 8.20178 1.95584 8.28716C1.9915 8.4059 2.07585 8.5065 2.19037 8.56688C2.30489 8.62727 2.44023 8.6425 2.5667 8.60925L4.63811 8.04882L10.6509 2.33178C11.1286 1.87785 11.1242 1.13802 10.6421 0.679432ZM4.4477 1.41306C4.4477 1.15353 4.22647 0.943105 3.95351 0.943105H1.97676C0.884918 0.943105 0 1.78479 0 2.82242V8.46087C0 9.49901 0.884918 10.3407 1.97676 10.3407H7.90702C8.99886 10.3407 9.88433 9.49901 9.88433 8.46087V6.58207C9.88433 6.32202 9.6631 6.1116 9.39014 6.1116C9.11718 6.1116 8.89595 6.32202 8.89595 6.58156V8.46087C8.89595 8.97994 8.45294 9.40078 7.90702 9.40078H1.97676C1.43084 9.40078 0.988378 8.97994 0.988378 8.46087V2.82242C0.988378 2.30386 1.43084 1.88302 1.97676 1.88302H3.95351C4.01882 1.88268 4.08341 1.87025 4.1436 1.84645C4.20379 1.82264 4.2584 1.78792 4.30429 1.74427C4.35019 1.70063 4.38648 1.64891 4.41109 1.59208C4.43569 1.53524 4.44814 1.47441 4.4477 1.41306Z" fill="white" />
                    </svg>
                  </button>
                </div>
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
        {item === 'events'
          ? (
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-4 overall__rating">
                  <h5 style={{ textAlign: 'center' }}>Overall Rating</h5>
                  <div>
                    <h5 className="rating font-weight-bold" style={{ display: 'inline-block' }}>{reviews === 0 ? starCount : (starCount / reviews).toFixed(2)}</h5>
                    <h5 className="font-weight-bold" style={{ display: 'inline-block' }}>/5.0</h5>
                  </div>
                  <p className="reviews">
                    Based on&ensp;
                    {reviews}
                    &ensp;reviews
                  </p>
                </div>
                <div className="col-md-8">
                  <div className="side">
                    <div>
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                    </div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <StyledContainer width={reviews === 0 ? fiveStars : `${(100 * fiveStars) / reviews}%`} />
                    </div>
                  </div>
                  <div className="side right">
                    <div>
                      {fiveStars === 0 ? 0 : ((fiveStars / reviews) * 100).toFixed(2)}
                      %
                    </div>
                  </div>
                  <div className="side">
                    <div>
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                    </div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <StyledContainer width={reviews === 0 ? fourStars : `${(100 * fourStars) / reviews}%`} />
                    </div>
                  </div>
                  <div className="side right">
                    <div>
                      {fourStars === 0 ? 0 : ((fourStars / reviews) * 100).toFixed(2)}
                      %
                    </div>
                  </div>
                  <div className="side">
                    <div>
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                    </div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <StyledContainer width={reviews === 0 ? threeStars : `${(100 * threeStars) / reviews}%`} />
                    </div>
                  </div>
                  <div className="side right">
                    <div>
                      {threeStars === 0 ? 0 : ((threeStars / reviews) * 100).toFixed(2)}
                      %
                    </div>
                  </div>
                  <div className="side">
                    <div>
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                    </div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <StyledContainer width={reviews === 0 ? twoStars : `${(100 * twoStars) / reviews}%`} />
                    </div>
                  </div>
                  <div className="side right">
                    <div>
                      {twoStars === 0 ? 0 : ((twoStars / reviews) * 100).toFixed(2)}
                      %
                    </div>
                  </div>
                  <div className="side">
                    <div>
                      <span className="fa fa-star checked" />
                    </div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <StyledContainer width={reviews === 0 ? oneStars : `${(100 * oneStars) / reviews}%`} />
                    </div>
                  </div>
                  <div className="side right">
                    <div>
                      {oneStars === 0 ? 0 : ((oneStars / reviews) * 100).toFixed(2)}
                      %
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : <div />}
      </div>
    </div>
  );
}

export default withSnackbar(Feedback);
