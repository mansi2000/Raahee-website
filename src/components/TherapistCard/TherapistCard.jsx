import { Avatar } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './TherapistCard.scss';

const TherapistCard = (props) => {
  const specialityArr = props.speciality?.split('$');
  let urlName = props.displayName.trim().toLowerCase().replace(/[\W_]+/g, '-') + '-';
  urlName += props.id;
  function saveToLocal() {
    // localStorage.setItem('therapistDetails', JSON.stringify({ props }));
  }
  return (
    <div className="TherapistCard" onClick={saveToLocal} role="contentinfo">
      <Link to={`/therapists/${urlName}`} key={props.id} className="link" style={{ width: '100%', textDecoration: 'none' }}>
        <div className="card">
          <div className="card-body">
            <Avatar src={props.image?.url} />
            <h3 className="therapist__name">{props.displayName}</h3>
            <p className="therapist__profession">{props.kindOfProfessional != null ? props.kindOfProfessional : 'Psychologist'}</p>
            <div className="speciality" style={{ width: '120%', marginBottom: '15px', paddingLeft: '10px', paddingRight: '10px' }}>
              {specialityArr?.length > 1 ? specialityArr.slice(0, 5).map((domain, i) => (
                <span key={i}>
                  <span className="text">
                    {domain}
                  </span>
                </span>
              )) : null}
            </div>
            <div className="buttons">
              <div className="btn-therapy text-capitalize" style={{ boxShadow: 'none' }}>Know More</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TherapistCard;
