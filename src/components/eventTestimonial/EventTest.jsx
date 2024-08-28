import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Avatar } from '@material-ui/core';
import './EventTest.scss';

const EventTest = ({ testimonials }) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [showButton, setShowButton] = useState(true);
  return (
    <div className="EventTest mb-5">
      <div className="container">
        <div className="row justify-content-center mx-auto">
          {Object.keys(testimonials).slice(0, visibleCount).map((UID) => {
            return (
              <div key={UID} className="col-lg-7 col-md-12">
                <Card className="py-2 px-4 mb-4">
                  <div>
                    <div className="row">
                      <Avatar aria-label="recipe" style={{ backgroundColor: 'purple' }}>
                        {UID[0]}
                      </Avatar>
                      <p className="ml-2 my-auto">
                        <span className="user-name">{UID}</span>
                      </p>
                    </div>
                  </div>
                  <Card.Body className="text-center">
                    <Card.Text>
                      "
                      {testimonials[UID]}
                      "
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="row justify-content-center mx-auto">
          {showButton && (
            <button
              className="btn btn-secondary text-capitalize"
              onClick={() => {
                setVisibleCount((prevState) => (prevState + 3));
                if (visibleCount % 3 === 0) setShowButton(false);
              }}
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventTest;
