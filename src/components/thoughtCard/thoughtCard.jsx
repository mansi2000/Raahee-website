import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { deleteUserThought } from '../../api';

const ThoughtCard = ({
  id, createdAt, thought, removeFromArr,
}) => {
  const deleteThought = (id) => {
    removeFromArr(id);
    deleteUserThought(id)
      .catch((err) => console.error(err));
  };

  return (
    <div className="col-lg-4 col-md-12">
      <div
        key={id}
        className="eventCard card mb-lg-0 mb-4"
        style={{ padding: '0 20px' }}
      >
        <div className="view overlay rounded z-depth-2 mb-4 waves-light" />
        <div className="date" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="text-muted">
            {moment(createdAt.toString()).utc().format('MMM DD YYYY')}
          </span>
          <span>
            <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteThought(id)} />
          </span>
        </div>
        <br />
        <div className="time">
          <p className="dark-grey-text text-center">
            {thought}
          </p>
        </div>
        <br />
        {/* <div className="buttons mb-4" style={{ textAlign: 'right' }}>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => deleteThought(id)}
          >
            Delete
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ThoughtCard;
