import React from 'react';
import moment from 'moment';
import calendar from '../../assets/Calendar.jpg';
import clock from '../../assets/Vector.jpg';
import './Info.scss';

function therapistInfo() {
  const mhp = JSON.parse(localStorage.getItem('therapistDetails')).props;
  const bookedSlot = JSON.parse(localStorage.getItem('bookedSlot'));

  return (
    <div className="bookedMhp__profile">
      <img className="bookedMhp__image" src={mhp.image.url} alt="mhp profile pic" />
      <div className="bookedMhp__info">
        <h5>{mhp.displayName}</h5>
        <p>{mhp.kindOfProfessional}</p>
        <div className="bookedTherapist__dateTime">
          <img src={calendar} alt="date" />
          <h6>
            {moment(bookedSlot?.startTime).local().format('D MMM, dddd')}
          </h6>
        </div>
        <div className="bookedTherapist__dateTime">
          <img src={clock} alt="time" />
          <h6>
            {moment(bookedSlot?.startTime).local().format('LT')}
            {' '}
            to
            {' '}
            {moment(bookedSlot?.endTime).local().format('LT')}
            {' '}
            <b>·</b>
            {' '}
            {bookedSlot.sessionType === 'Consultation Call' ? 15 : mhp.sessionDuration}
            {' '}
            mins.
          </h6>
        </div>
      </div>
    </div>
  );
}

export default therapistInfo;
