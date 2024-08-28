import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EventTestimonial from './EventTestimonial';

const MhpTestimonials = () => {
  const { mhpFeedbacks } = useSelector((state) => state.mhpFeedbacks);
  const user = JSON.parse(localStorage.getItem('profile'))?.user;
  const [visible, setVisible] = useState(2);

  const showMoreFeedbacks = () => {
    if (visible === mhpFeedbacks.length) {
      document.getElementById('loadMoreReviews').style.display = 'none';
    } else setVisible((prevValue) => prevValue + 3);
  };

  return (
    <>
      {mhpFeedbacks.length > 0 && (
        <div className="container padding0" id="testi" style={{ margin: '2rem 0' }}>
          <div className="row justify-content-center mx-auto" />
          <div className="col-lg-8 col-md-12 my-4">
            <h4>
              Reviews
              <span style={{ color: '#908A8A' }}>
                (
                {mhpFeedbacks.length}
                )
              </span>
              <hr />
            </h4>
          </div>
          {mhpFeedbacks.map((feed, i) => {
            return (
              <EventTestimonial
                key={i}
                item="mhp"
                user={user}
                feedId={feed.id}
                name={feed.user.displayName}
                email={feed.user?.email}
                location={feed.user.bio}
                profilePic={feed.user.image?.url}
                feedback={feed.feedback}
              />
            );
          })}
          {mhpFeedbacks?.length > 5 && (
            <button className="specialisations" id="loadMoreReviews" style={{ margin: '0 auto' }} onClick={showMoreFeedbacks}>Load more reviews</button>
          )}
        </div>
      )}
    </>
  );
};

export default MhpTestimonials;
