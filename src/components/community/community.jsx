import React from 'react';
import './community.scss';

const Community = () => {
  return (
    <div className="community ">
      <h4 className="community__heading">Community</h4>
      <div className="d-flex  community__discussion">Start a discussion</div>
      <div className="community__input">
        <input
          className="community__input__text"
          type="text"
          placeholder="Start typing here...."
        />
      </div>
    </div>
  );
};

export default Community;
