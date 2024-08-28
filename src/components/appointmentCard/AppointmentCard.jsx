import { Avatar } from '@material-ui/core';
import moment from 'moment';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import Calendar from '../calendar/calendar';
import './AppointmentCard.scss';

const AppointmentCard = ({ schedule, status }) => {
  const userProfile = JSON.parse(localStorage.getItem('profile')).user;
  const { mhps } = useSelector((state) => state.mhps);
  const history = useHistory();
  const [visibility, setDialogVisibility] = useState(false);
  const mhp = schedule.mhp ? mhps.find((therapist) => therapist.id === schedule.mhp.id) : mhps[0];
  // const gapi = window.gapi;
  const CLIENT_ID = process.env.REACT_APP_CALENDAR_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_CALENDAR_API_KEY;
  const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ];
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  const addToCalendar = () => {
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
            summary: `Raahee: ${userProfile.displayName}'s appointment with ${mhp.displayName}`,
            location: 'Online',
            description: `$Join the meeting through this link: ${mhp.meetUrl ? mhp.meetUrl : ''}`,
            start: {
              dateTime: `${new Date(schedule.startTime).toISOString()}`,
              timeZone: 'Asia/Kolkata',
            },
            end: {
              dateTime: `${new Date(schedule.endTime).toISOString()}`,
              timeZone: 'Asia/Kolkata',
            },
            attendees: [
              {
                email: `${mhp.email}`,
                organizer: true,
              },
              {
                email: 'care.raahee@gmail.com',
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

  function saveToLocal() {
    const therapistDetails = mhp;
    console.log(therapistDetails);
    let urlName = schedule.mhp.displayName.trim().toLowerCase().replace(/[\W_]+/g, '-');
    urlName += '-' + schedule.mhp.id;
    localStorage.setItem('therapistDetails', JSON.stringify({ props: therapistDetails }));
    history.push(`/therapists/${urlName}`);
  }

  const dialogClose = () => {
    setDialogVisibility(false);
  };

  const handleClick = () => {
    setDialogVisibility(true);
  };

  return (
    <div className="AppointmentsCard">
      <div className="mhp__profile">
        {schedule.mhp
          && (
            <Avatar
              className="mhp__image"
              src={schedule.mhp.image && schedule.mhp.image.url}
              alt="mhp profile pic"
            />
          )}
        <div className="mhp__details">
          <h5>{schedule.mhp ? schedule.mhp.displayName : 'Deleted User'}</h5>
          <p>{schedule.sessionType}</p>
          <p>{moment(schedule?.startTime.toString()).local().format('MMM DD, YYYY')}</p>
          <p>
            {moment(schedule.startTime.toString()).local().format('hh:mm A')}
            -
            {moment(schedule.endTime.toString()).local().format('hh:mm A')}

          </p>
          {status !== 'upcoming' && (
            <div className="schedule__actions">
              <button className="btn btn--primary text-capitalize text-white" onClick={saveToLocal}>
                Share your experience
              </button>
            </div>
          )}
        </div>
      </div>
      {status === 'upcoming'
        && (
          <div style={{ width: '100%' }}>
            {schedule.rescheduleRequested && (
              <div className="reschedule__actions">
                <div className="schedule__actions">
                  <button className="btn btn--primary text-capitalize text-white schedule__rescheduled">
                    Join Meet
                  </button>
                  <div className="reschedule__action">
                    <div className="required__dot" />
                    <span className="reschedule__required" onClick={() => handleClick()} role="button">Reschedule</span>
                  </div>
                </div>
                <p className="reschedule__warning">We are sorry to inform you our therapist is not available on current slot, Please reschedule the meeting.</p>
              </div>
            )}
            {!schedule.rescheduleRequested && (
              <div className="addToCalendar">
                <div className="schedule__actions">
                  <button className="btn btn--primary text-capitalize text-white">
                    <a href={schedule.mhp.meetUrl}>Join Meet</a>
                  </button>
                  {Math.abs(new Date(schedule.startTime) - new Date()) / 36e5 > 12 && <span onClick={() => handleClick()} role="button">Reschedule</span>}
                </div>
                <button className="btn btn--primary text-capitalize text-white" onClick={() => addToCalendar()}>
                  <InsertInvitationIcon />
                  <span className="addToCalendar__btn">Add To Calendar</span>
                </button>
              </div>
            )}
          </div>
        )}
      <DialogComponent
        width="425px"
        target="#calendar"
        isModal
        animationSettings={{ effect: 'Zoom', duration: 400, delay: 0 }}
        close={() => dialogClose()}
        header="Select a time slot"
        visible={visibility}
        showCloseIcon
        className="reschedule__modal"
      >
        <Calendar schedules={mhp.mhp_schedules} selectedDate={schedule.startTime} actionType="rescheduling" prevSchedule={schedule.id} dialogClose={dialogClose} />
      </DialogComponent>
    </div>
  );
};

export default AppointmentCard;
