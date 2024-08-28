import React from 'react';
import { useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteEventFeedback } from '../../actions/eventFeedbacks';
import { deleteMhpFeedback } from '../../actions/mhpFeedbacks';
import './EventTestimonial.scss';

function EventTestimonial({ item, user, feedId, name, email, location, profilePic, rating, feedback }) {
  const dispatch = useDispatch();

  const deleteEventTestimonial = () => {
    dispatch(deleteEventFeedback(feedId));
  };

  const deleteMhpTestimonial = () => {
    dispatch(deleteMhpFeedback(feedId));
  };

  return (
    <div className="col-md-12 testimonial__card" style={{ float: 'left' }}>
      <div className="card mb-2 card__details">
        <div className="user__details">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Avatar src={profilePic} />
            <div className="user__info">
              <h5>{name}</h5>
              <h6>{location}</h6>
            </div>
          </div>

          {item !== 'mhp'
            ? (
              <div className="user__rating">
                {rating}
                <span className="fa fa-star checked" />
              </div>
            ) : <div />}
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <p className="card-text">
            {feedback}
          </p>
          {user && email === user.email && (
            <DeleteIcon
              className="mb-3 card-title"
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={() => {
                if (item === 'mhp') { deleteMhpTestimonial(); } else { deleteEventTestimonial(); }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EventTestimonial;
