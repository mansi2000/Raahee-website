import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import business from '../../assets/business.png';
import EventCard from '../../components/eventCard/eventCard';
import './eventPage.scss';

const eventPage = (props) => {
  const user = JSON.parse(localStorage.getItem('profile'))?.user;
  const { events } = useSelector((state) => state.events);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);

  useEffect(() => {
    setUpcomingEvents([]);
    setOngoingEvents([]);
    setPastEvents([]);
    events.forEach((event) => {
      if (event.startTime > (new Date()).toISOString()) {
        setUpcomingEvents((upcomingEvents) => [...upcomingEvents, event]);
      } else if (event.endTime < (new Date()).toISOString()) {
        setPastEvents((pastEvents) => [...pastEvents, event]);
      } else if (event.startTime < (new Date()).toISOString()) {
        setOngoingEvents((ongoingEvents) => [...ongoingEvents, event]);
      }
    });
  }, [events]);

  return (
    <div className="EventPage">
      <Helmet>
        <title>Raahee | Events</title>
      </Helmet>
      <div className="container" style={{ marginTop: '80px' }}>
        <div className="row justify-content-between home-landing">
          <div className="col-md-5 my-auto">
            <div className="main-heading">
              <div>
                <p className="landing-text" style={{ fontSize: '40px' }}>
                  RAAHEE: EVENTS
                </p>
                <p className="landing-text" style={{ fontSize: '40px' }}>
                  GROW WITH RAAHEE
                </p>
                <h2 className="tagline mt-4">Find your path to a better life</h2>
                <div className="buttons mt-5">
                  <br />
                  {user && user.email === process.env.REACT_APP_ADMIN_EMAIL && (
                    <button
                      onClick={() => props.history.push('/addEvent')}
                      className="btn btn-secondary text-capitalize mr-md-4"
                      style={{ boxShadow: 'none' }}
                    >
                      Add New Event
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <img src={business} className="img-fluid" alt="fluid" />
          </div>
        </div>
      </div>
      {ongoingEvents.length > 0 && (
        <div className="container" style={{ marginTop: '40px' }}>
          <div className="justify-content-between home-landing">
            <p className="landing-text">
              Ongoing Events
            </p>
            <hr />
            <section className="row">
              {ongoingEvents.sort((a, b) => {
                return (a.startTime < b.startTime) ? 1 : -1;
              }).map((event, index) => (
                <EventCard key={index} index={index % 3} {...event} {...props} status="ongoing" />
              ))}
            </section>
          </div>
        </div>
      )}
      {upcomingEvents.length > 0 && (
        <div className="container" style={{ marginTop: '40px' }} id="scroll">
          <div className="justify-content-between home-landing">
            <p className="landing-text">
              Upcoming Events
            </p>
            <hr />
            <section className="row">
              {upcomingEvents.sort((a, b) => {
                return (a.startTime < b.startTime) ? 1 : -1;
              }).map((event, index) => (
                <EventCard key={index} index={index % 3} {...event} {...props} status="upcoming" />
              ))}
            </section>
          </div>
        </div>
      )}
      <div className="container" style={{ marginTop: '40px' }} id="pastScroll">
        <div className="justify-content-between home-landing">
          <p className="landing-text">
            Past Events
          </p>
          <hr />
          {pastEvents.length > 0 && (
            <section className="row">
              {pastEvents.sort((a, b) => {
                return (a.startTime < b.startTime) ? 1 : -1;
              }).filter((item, index) => index < 6).map((event, i) => (
                <EventCard key={i} index={i % 3} {...event} {...props} status="past" />
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default eventPage;
