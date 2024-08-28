import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EventTestimonial from './EventTestimonial';

const EventTestimonials = () => {
  const { eventFeedbacks } = useSelector((state) => state.eventFeedbacks);
  const user = JSON.parse(localStorage.getItem('profile'))?.user;
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    setFeedbacks(eventFeedbacks.filter((element) => element.feedback.length !== 0));
  }, [eventFeedbacks]);

  return (
    <>
      {feedbacks.length > 0 ? (
        <div className="container mb-5" id="testi">
          <div className="row justify-content-center" />
          <div className="col-lg-8 col-md-12 my-4" style={{ padding: 0 }}>
            <h4 className="landing-text">
              Testimonials
            </h4>
            <hr />
          </div>
          {feedbacks.map((feed) => {
            return (
              <EventTestimonial
                key={feed.id}
                user={user}
                feedId={feed.id}
                name={feed.user?.displayName}
                email={feed.user?.email}
                location={feed.user?.bio}
                profilePic={feed.user.image?.url}
                rating={feed.rating}
                feedback={feed.feedback}
              />
            );
          })}
        </div>
      ) : (
        null
      )}
    </>
  );
};

export default EventTestimonials;
