import React from 'react';
import './SuccessTransaction.scss';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import paymentSuccess from '../../assets/transaction__success.png';
import downArrow from '../../assets/down-arrow.png';

const SuccessTransaction = () => {
  const mhp = JSON.parse(localStorage.getItem('therapistDetails'))?.props;
  const user = JSON.parse(localStorage.getItem('profile'))?.user;
  const bookedSlot = JSON.parse(localStorage.getItem('bookedSlot'));
  const history = useHistory();
  // const gapi = window.gapi;
  const CLIENT_ID = process.env.REACT_APP_CALENDAR_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_CALENDAR_API_KEY;
  const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ];
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
  const location = useLocation();

  if (location.state === undefined || location.state === null || location.state === '') {
    console.log('success');
  }

  const addToCalendar = () => {
    console.log(window.gapi);
    window.gapi.load('client:auth2', () => {
      console.log('loaded client');
      window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      window.gapi.client.load('calendar', 'v3', () => console.log('bam!'));

      window.gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          const calendarEvent = {
            summary: `Raahee: ${user?.displayName}'s appointment with ${mhp.displayName}`,
            location: 'Online',
            description: `$Join the meeting through this link: ${mhp.meetUrl ? mhp.meetUrl : ''}`,
            start: {
              dateTime: `${new Date(bookedSlot.startTime).toISOString()}`,
              timeZone: 'Asia/Kolkata',
            },
            end: {
              dateTime: `${new Date(new Date(bookedSlot.startTime).getTime() + mhp.sessionDuration * 60000).toISOString()}`,
              timeZone: 'Asia/Kolkata',
            },
            attendees: [
              {
                email: `${mhp.email}`,
                organizer: true,
              },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 30 },
                { method: 'popup', minutes: 10 },
              ],
            },
            sendUpdates: 'all',
          };

          const request = window.gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: calendarEvent,
          });

          request.execute((event) => {
            window.open(event.htmlLink, '_blank');
          });
        });
    });
  };

  return (
    <div className="tansaction__status">
      <img className="payment__img" src={paymentSuccess} alt="payment-success" />
      <div className="title__payment">
        <span>Your session is booked successfully.</span>
        <p>
          You are brave,
          {' '}
          {user?.displayName.split(' ')[0]}
          !
        </p>
        <p>
          Pat yourself on your back for this big step towards your wellness ✨
        </p>
      </div>

      <div className="booked__therapist">
        <div className="doctors__profile">
          <img src={mhp.image.url} alt="doctor's profile" />
          <div className="doctors__name">
            <span>{mhp.displayName}</span>
            <p>{mhp.kindOfProfessional}</p>
            <div className="appointment__DD">
              <CalendarTodayIcon style={{ color: '#727272' }} />
              <p>{moment(bookedSlot?.startTime).local().format('D MMM, dddd')}</p>
            </div>
            <div className="appointment__slot">
              <WatchLaterIcon style={{ color: '#727272' }} />
              <p>
                {moment(bookedSlot?.startTime).local().format('LT')}
                {' '}
                to
                {' '}
                {moment(new Date(bookedSlot?.startTime).getTime() + mhp.sessionDuration * 60000).local().format('LT')}
              </p>
              <div className="duration"> </div>
              <p>
                {mhp.sessionDuration}
                {' '}
                mins.
              </p>
            </div>
          </div>
        </div>
        <div className="invoice__generate">
          <img src={downArrow} alt="arrow" />
          <button className="invoice__button1 btn btn--primary text-capitalize text-white" onClick={() => addToCalendar()}>
            <InsertInvitationIcon />
            Add to Calendar
          </button>
          <button className="invoice__button2 btn btn--primary text-capitalize text-white" onClick={() => history.push('/profile')}>
            Check your upcoming session
          </button>
        </div>
      </div>
    </div>
  );
};
export default SuccessTransaction;
