import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { withSnackbar } from 'notistack';
import ReactHtmlParser from 'react-html-parser';
// import { Nav } from 'react-bootstrap';
// import { Link } from 'react-scroll';
import { RiEdit2Fill } from 'react-icons/ri';
import { IoExitSharp } from 'react-icons/io5';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
// import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
// import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import { useDispatch } from 'react-redux';
import './eventShowPage.scss';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { SHOW_MODAL } from '../../store/reducers/showLoginModal';
import Feedback from '../../components/Feedback/Feedback';
import EventTestimonials from '../../components/EventTesti/EventTestimonials';
import EditEventPage from './editEventPage';
import { attendEvent, unattendEvent, sendEmail, fetchEventById } from '../../api/index';
import { getEventFeedbacks } from '../../actions/eventFeedbacks';

function NewlineText({ text }) {
  const newText = ReactHtmlParser(text);
  return newText;
}

const EventShowPage = ({ enqueueSnackbar }) => {
  const dispatch = useDispatch();
  const { eventName } = useParams();
  const eventId = eventName.split('-').splice(-1);
  const user = JSON.parse(localStorage.getItem('profile'))?.user;
  const userAuth = JSON.parse(localStorage.getItem('profile'))?.jwt;
  const eventProfile = JSON.parse(localStorage.getItem('eventDetails'));

  const [event, setEvent] = useState({});
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState({ display: 'none' });
  const [pageLoading, setPageLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const gapi = window.gapi;
  const CLIENT_ID = process.env.REACT_APP_CALENDAR_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_CALENDAR_API_KEY;
  const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ];
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  useEffect(() => {
    if (eventProfile) {
      const data = eventProfile.props;
      setEvent(data);
      if (userAuth) {
        setIsRegistered(data.attendants.includes(user.id));
      }
      if (data.endTime < (new Date()).toISOString()) {
        setStatus('past');
      }
      setPageLoading(false);
      dispatch(getEventFeedbacks(data.id));
    } else {
      fetchEventById(eventId).then((eventData) => {
        const data = eventData.data;
        console.log(data);
        setEvent(data);
        if (userAuth) {
          setIsRegistered(data.attendants.includes(user.id));
        }
        if (data.endTime < (new Date()).toISOString()) {
          setStatus('past');
        }

        setPageLoading(false);
      });

      dispatch(getEventFeedbacks(eventId));
    }
  }, []);

  const addToCalendar = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client');
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load('calendar', 'v3', () => console.log('bam!'));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          const calendarEvent = {
            summary: `${event.title}`,
            location: 'Online',
            description: `${event.summary} Join the meeting through this link: ${event.link}`,
            start: {
              dateTime: `${new Date(event.startTime).toISOString()}`,
              timeZone: 'Asia/Kolkata',
            },
            end: {
              dateTime: `${new Date(event.endTime).toISOString()}`,
              timeZone: 'Asia/Kolkata',
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
            sendUpdates: 'all',
          };

          const request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: calendarEvent,
          });

          request.execute((event) => {
            enqueueSnackbar(
              'Registered. Check your email and google calendar for more information!',
              {
                variant: 'success',
                autoHideDuration: 4000,
              },
            );
            window.open(event.htmlLink, '_blank');
          });
        });
    });
  };

  const handleUnregister = () => {
    if (userAuth) {
      setLoading({ display: 'inline-block' });
      unattendEvent(event.id)
        .then(() => {
          setIsRegistered(false);
          const emailData = {
            email: user.email,
            subject: 'Registration for Raahee Session',
            content: `<img src=${event.image?.url} /><p>Registration cancelled for the event ${event.title}.<p><br /><p>Thanks,<p><p>Team Raahee</p>`,
          };
          sendEmail(emailData)
            .then(() => {
              enqueueSnackbar(
                'Successfully Unregistered',
                {
                  variant: 'success',
                  autoHideDuration: 4000,
                },
              );
              setLoading({ display: 'none' });
            })
            .catch((error) => {
              console.log(error);
            });
        });
    } else {
      dispatch(SHOW_MODAL());
    }
  };

  const handleRegister = () => {
    if (userAuth) {
      setLoading({ display: 'inline-block' });
      attendEvent(event.id)
        .then(() => {
          setIsRegistered(true);
          addToCalendar();
          const emailData = {
            email: user.email,
            subject: 'Registration for Raahee Session',
            content: `<img src=${event.image?.url} />` + event.emailContent,
          };
          sendEmail(emailData)
            .then(() => {
              enqueueSnackbar(
                'Registered. Check your email for more information! Make sure to check the spam folder as well.',
                {
                  variant: 'success',
                  autoHideDuration: 4000,
                },
              );
              setLoading({ display: 'none' });
            })
            .catch((error) => {
              console.log(error);
            });
        });
    } else {
      dispatch(SHOW_MODAL());
    }
  };

  return (
    <>
      {!pageLoading ? (
        <>
          {user && user.email === process.env.REACT_APP_ADMIN_EMAIL
            && (
              <button className="btn btn--primary btn-block py-2 text-white" style={{ position: 'fixed', marginTop: '100px', right: '10px', zIndex: 2, backgroundColor: '#aa66cc', width: 'auto' }} onClick={() => setEditing(!editing)}>
                {editing ? <IoExitSharp /> : <RiEdit2Fill />}
              </button>
            )}
          {!editing ? (
            <div className="EventShowPage">
              {Object.keys(event).length > 0 && (
                <>
                  <Helmet>
                    <title>{`Raahee | ${event.title ? event.title : 'Event'}`}</title>
                  </Helmet>
                  <div className="jumbotron">
                    <img src={event.image?.url} alt="Event Banner" />
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-8">
                        {/* <Nav className="event__navbar">
                          <Nav.Item>
                            <Link
                              activeClass="selected"
                              className="nav-link navsize"
                              to="about"
                              smooth
                              spy
                              duration={100}
                              offset={-150}
                            >
                              <AnnouncementOutlinedIcon />
                              <h6>About</h6>
                            </Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Link
                              activeClass="selected"
                              className="nav-link navsize"
                              to="time"
                              spy
                              smooth
                              duration={100}
                              offset={-100}
                            >
                              <AccessTimeOutlinedIcon />
                              <h6>Timings</h6>
                            </Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Link
                              activeClass="selected"
                              className="nav-link navsize"
                              to="testi"
                              spy
                              smooth
                              duration={100}
                              offset={-50}
                            >
                              <i className="fa fa-comments" aria-hidden="true" />
                              <h6>Testimonials</h6>
                            </Link>
                          </Nav.Item>
                        </Nav> */}
                        <div className="event__about" id="about">
                          <h4>
                            About the
                            {' '}
                            <span className="text-uppercase">{event.title}</span>
                            <hr />
                          </h4>
                          <NewlineText className="my-4" text={event.about} />
                        </div>
                        <div className="event__time" id="time" style={{ marginTop: '60px' }}>
                          <h4>
                            Event Date & Time
                            <hr />
                          </h4>
                          <h5 className="my-4 text-muted">
                            <i className="far fa-calendar-alt mr-2" />
                            Starts
                            {' '}
                            {moment(event.startTime.toString()).utc().format('MMM DD YYYY')}
                            {', '}
                            {moment(event.startTime.toString()).format('HH:mm') + ' IST'}
                          </h5>
                        </div>
                        <h5 className="add__Calender" onClick={addToCalendar} style={{ cursor: 'pointer' }}>Add to Calendar</h5>
                      </div>
                      <div className="col-md-4">
                        {/* <div className="event__social">
                  <Facebook className="event__icon" />
                  <Instagram className="event__icon" />
                  <Linkedin className="event__icon" />
                  <Youtube className="event__icon" />
                </div> */}
                        <div className="card mt-md-5" id="register">
                          <div className="embed-responsive embed-responsive-16by9 card-image">
                            <iframe width="560" height="315" src={event.ytLink ? event.ytLink : 'https://www.youtube.com/embed/n8Sn6bBzsgQ'} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                            {' '}
                          </div>
                          <div className="container mt-3">
                            <h6>
                              About the
                              {' '}
                              <span className="text-uppercase">{event.title}</span>
                            </h6>
                            <NewlineText className="my-4" text={event.summary} />
                            <h6 className="add__Calender" style={{ margin: '20px 0' }}>
                              {moment(event.startTime.toString()).utc().format('MMM DD YYYY')}
                              {', '}
                              {moment(event.startTime.toString()).format('HH:mm') + ' IST'}
                            </h6>
                          </div>
                        </div>
                        {
                          status !== 'past' ? (
                            <div className="register">
                              <button
                                className="btn btn--primary btn-block py-2 text-capitalize text-white"
                                onClick={!isRegistered ? handleRegister : handleUnregister}
                              >
                                <span className="spinner-border spinner-border-sm mr-2" role="status" style={loading} />
                                {!isRegistered ? <>Register Here</> : <>Cancel Registration</>}
                              </button>
                            </div>
                          ) : null
                        }
                      </div>
                    </div>
                  </div>
                  <div id="testi" />
                  <Feedback id={event.id} item="events" />
                  <EventTestimonials />
                </>
              )}
            </div>
          ) : (
            <EditEventPage event={event} />
          )}
        </>
      ) : (
        <Box sx={{ color: 'grey.500', display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress color="secondary" />
        </Box>
      )}
    </>
  );
};

export default withSnackbar(EventShowPage);
