import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import './WorkExp.scss';
import moment from 'moment';

function WorkExp({ experience }) {
  return (
    <div className="steps">
      <div className="step">
        <CircleIcon style={{ color: '#AB70CA', fontSize: '30px' }} />
        <p>{experience.organization}</p>
      </div>
      <div className="empTypP">
        {experience.empType}
        <br />
        <div className="empduration">
          {moment(experience.startDateTime.toString()).local().format('MMM YYYY')}
          {' - '}
          {experience.endDateTime ? moment(experience.endDateTime.toString()).local().format('MMM YYYY') : 'present'}
        </div>
        {experience.workDescription}
      </div>
      <div className="step__verticalLine" style={{ backgroundColor: '#AB70CA' }} />
    </div>
  );
}

export default WorkExp;
