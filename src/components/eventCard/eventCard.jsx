/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { FaStar } from 'react-icons/fa';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { deleteEvent } from '../../actions/events';
import './eventCard.scss';

function NewlineText({ text }) {
  const newText = ReactHtmlParser(text);
  return newText;
}

const EventCard = (props) => {
  const [reviews, setReviews] = useState(0);
  const [starCount, setStarCount] = useState(0);
  const user = JSON.parse(localStorage.getItem('profile'))?.user;
  const dispatch = useDispatch();
  const history = useHistory();

  let urlName = props.title.trim().toLowerCase().replace(/[\W_]+/g, '-');
  // showing up atmost 7 words in the URL
  const splitIndex = urlName.split('-', 7).join('-').length;
  urlName = urlName.slice(0, splitIndex);
  urlName += '-' + props.id;

  useEffect(() => {
    setReviews(props.event_feedbacks.length);
    let stars = 0;
    props.event_feedbacks.forEach((doc) => {
      stars += doc.rating;
    });
    setStarCount(stars);
  });

  const deleteEventCard = (event) => {
    event.stopPropagation();
    dispatch(deleteEvent(props.id));
  };

  return (
    <div key={props.id} className="col-lg-4 col-md-4 EventCard">
      <div
        className={`card mb-4 ${props.status}`}
        style={{ borderRadius: '0.5rem', width: '100%', height: '100%', cursor: 'pointer' }}
        onClick={() => {
          localStorage.setItem('eventDetails', JSON.stringify({ props }));
          history.push(`/event/${urlName}`);
        }}
        role="contentinfo"
      >
        <div className="view overlay rounded z-depth-2 waves-light" />

        <div className="imageContainer">
          <img src={props.image.url} alt="Raahee Events" className="card-img-top" />
          <div className="bottom-left">
            <h6 style={{ fontSize: '1.2rem', margin: 0 }}>
              {moment(props.startTime.toString()).utc().format('MMM DD YYYY')}
              {', '}
              {moment(props.startTime.toString()).format('HH:mm') + ' IST'}
            </h6>
          </div>
        </div>
        <div className="card-body">
          <div className="eventCard__header">
            <h3 className="mb-3 card-title h2-responsive font-weight-bold">
              {props.title}
            </h3>
            {user && user.email === process.env.REACT_APP_ADMIN_EMAIL && (
              <DeleteIcon className="mb-3 card-title" style={{ color: 'red' }} onClick={deleteEventCard} />
            )}
          </div>
          <div className="summary my-3" style={{ minHeight: '50px', maxHeight: '125px' }}>
            <NewlineText text={props.summary.substring(0, 100) + '...'} />
          </div>
          <div className="buttons mb-4">
            <div
              className="btn purple-text font-weight-bold"
              type="button"
              style={{ boxShadow: 'none', paddingLeft: '0.2rem !important', paddingRight: '0.2rem !important', margin: '0', marginLeft: '-10px' }}
            >
              Learn More &#8594;
            </div>
          </div>
          {props.status !== 'past' ? (
            null
          ) : (
            <div className="event__social">

              <div className="event__rating">
                {Array(starCount === 0 ? 0 : Math.floor(starCount / reviews))
                  .fill()
                  .map((i) => (
                    <FaStar
                      key={i}
                      style={{ margin: '0 3px' }}
                      color="#FEC60F"
                      size={20}
                    />
                  ))}
                {Array(starCount === 0 ? 5 : 5 - Math.floor(starCount / reviews))
                  .fill()
                  .map((i) => (
                    <FaStar
                      key={i}
                      style={{ margin: '0 3px' }}
                      color="#C4B8B4"
                      size={20}
                    />
                  ))}
                <p className="rating font-weight-bold">{reviews === 0 ? starCount : (starCount / reviews).toFixed(1)}</p>
                <p className="font-weight-bold">/5.0</p>
              </div>
              <p className="reviews">
                Based on&ensp;
                {reviews}
                &ensp;reviews
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
