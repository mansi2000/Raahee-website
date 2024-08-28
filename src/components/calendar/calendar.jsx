/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import moment from 'moment';
import './calendar.scss';
import { addClass } from '@syncfusion/ej2-base';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';
import { rescheduleAppointment, scheduleAppointment } from '../../actions/therapySchedule';
import { getMhps } from '../../actions/mhps';
import { SHOW_MODAL } from '../../store/reducers/showLoginModal';
import KeepInMind from '../keepInMindModal/keepInMind';

const Calendar = ({ schedules, selectedDate, actionType, prevSchedule, dialogClose }) => {
  const { mhpID } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);
  const tomorrow = new Date(todaysDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const dayAfterTommorow = new Date(tomorrow);
  dayAfterTommorow.setDate(dayAfterTommorow.getDate() + 1);
  dayAfterTommorow.setHours(0, 0, 0, 0);
  const [loading, setLoading] = useState(false);
  const [sessionType, setSessionType] = useState(60);
  const [visibleDate, setVisibleDate] = useState(new Date());
  const [morningSlots, setMorningSlots] = useState([]);
  const [eveningSlots, setEveningSlots] = useState([]);
  const [afternoonSlots, setAfternoonSlots] = useState([]);
  const [validDates, setValidDates] = useState([]);
  const [isDateTimeSelected, setIsDateTimeSelected] = useState(false);
  const [timeSlotSelected, setTimeSlotSelected] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const bookedSlot = JSON.parse(localStorage.getItem('bookedSlot'));
  const userAuth = JSON.parse(localStorage.getItem('profile'))?.jwt;
  const user = JSON.parse(localStorage.getItem('profile'))?.user;

  useEffect(() => {
    if (!schedules) {
      schedules = [];
    }
    schedules.forEach((schedule) => {
      setValidDates((prevDates) => [...prevDates, new Date(schedule.startTime).toISOString()]);
    });
    if (selectedDate) {
      setVisibleDate(new Date(new Date(selectedDate).setHours(0, 0, 0, 0)));
    } else {
      schedules.every((schedule) => {
        if (new Date(schedule.startTime) > new Date()) {
          setVisibleDate(new Date(new Date(schedule.startTime).setHours(0, 0, 0, 0)));
          return false;
        }
        return true;
      });
    }
  }, []);

  useEffect(() => {
    setIsDateTimeSelected(false);
    setTimeSlotSelected(null);
  }, [visibleDate]);

  const defineSlots = (selectedDate) => {
    if (!schedules) {
      schedules = [];
    }
    setAfternoonSlots(schedules.filter((item) => {
      const date = moment(item.startTime.toString()).local().format('MMM DD YYYY');
      const currD = moment(selectedDate?.toString()).local().format('MMM DD YYYY');
      const time = new Date(item.startTime);
      const afternoonStart = 12 * 60;
      const afternoonEnd = 17 * 60;
      const currentTime = time.getHours() * 60 + time.getMinutes();
      return (date === currD && currentTime >= afternoonStart && currentTime < afternoonEnd);
    }).sort(({ startTime: a }, { startTime: b }) => (a > b ? 1 : a < b ? -1 : 0)));
    setMorningSlots(schedules.filter((item) => {
      const date = moment(item.startTime.toString()).local().format('MMM DD YYYY');
      const currD = moment(selectedDate?.toString()).local().format('MMM DD YYYY');
      const time = new Date(item.startTime);
      const morningStart = 0;
      const morningEnd = 12 * 60;
      const currentTime = time.getHours() * 60 + time.getMinutes();
      return (date === currD && currentTime >= morningStart && currentTime < morningEnd);
    }).sort(({ startTime: a }, { startTime: b }) => (a > b ? 1 : a < b ? -1 : 0)));
    setEveningSlots(schedules.filter((item) => {
      const date = moment(item.startTime.toString()).local().format('MMM DD YYYY');
      const currD = moment(selectedDate?.toString()).local().format('MMM DD YYYY');
      const time = new Date(item.startTime);
      const eveningStart = 17 * 60;
      const eveningEnd = 24 * 60;
      const currentTime = time.getHours() * 60 + time.getMinutes();
      return (date === currD && currentTime >= eveningStart && currentTime < eveningEnd);
    }).sort(({ startTime: a }, { startTime: b }) => (a > b ? 1 : a < b ? -1 : 0)));
  };

  useEffect(() => {
    defineSlots(visibleDate);
  }, [visibleDate]);

  const selectSessionType = (type) => {
    setSessionType(type);
  };

  const onDateChanged = (event) => {
    setVisibleDate(event.value);
  };

  const bookSelectedTime = (slot) => {
    if (!userAuth && !slot.isBooked) {
      dispatch(SHOW_MODAL());
    } else if (!slot.isBooked) {
      if (!isDateTimeSelected) {
        document.getElementById(slot.startTime.toString()).classList.add('selectedSlot');
        setTimeSlotSelected(slot.startTime.toString());
        localStorage.setItem('bookedSlot', JSON.stringify(slot));
        setIsDateTimeSelected(true);
      } else if (isDateTimeSelected) {
        if (timeSlotSelected !== null && timeSlotSelected !== slot.startTime.toString()) {
          document.getElementById(timeSlotSelected).classList.remove('selectedSlot');
          document.getElementById(slot.startTime.toString()).classList.add('selectedSlot');
          setTimeSlotSelected(slot.startTime.toString());
          localStorage.setItem('bookedSlot', JSON.stringify(slot));
          setIsDateTimeSelected(true);
        } else {
          document.getElementById(slot.startTime.toString()).classList.remove('selectedSlot');
          setIsDateTimeSelected(false);
        }
      }
    }
  };

  function renderSlots(slots) {
    return (
      <button
        id={slots.startTime.toString()}
        className={slots.sessionType === 'Therapy Session' ? 'timeSlots therapy' : 'timeSlots consult'}
        style={{ color: slots.isBooked && '#A14EB64A', backgroundColor: slots.isBooked && '#A14EB61A', cursor: slots.isBooked && 'default' }}
        onClick={() => bookSelectedTime(slots)}
      >
        {moment(slots.startTime.toString()).local().format('LT')}
        &nbsp;
      </button>
    );
  }

  const specialDate = (args) => {
    addClass([args.element], ['e-day', 'special']);
    args.element.style.backgroundColor = 'rgba(170, 102, 204, 0.5)';
    args.element.style.borderRadius = '100%';
  };

  const disabledDate = async (args) => {
    args.isDisabled = true;
    validDates.forEach((d) => {
      if (moment(d).local().format('MMM DD YYYY') === moment(new Date(args.date).toISOString()).local().format('MMM DD YYYY')) {
        args.isDisabled = false;
        if (Date.parse(new Date(d)) >= Date.parse(new Date())) {
          specialDate(args);
        }
      }
    });
  };

  const startBooking = () => {
    setModalShow((prev) => !prev);
  };

  const confirmDetails = () => {
    history.push(`/therapists/${mhpID}/therapy-confirmation`);
  };

  const reschedule = () => {
    setLoading(true);
    dispatch(rescheduleAppointment(prevSchedule));
    dispatch(scheduleAppointment(bookedSlot.id, true))
      .then(() => {
        setLoading(false);
        dialogClose();
      });
    dispatch(getMhps());
  };

  return (
    <div className="calendar">
      <div className="heading">
        <h6 className="headingTitle">Next Available Slots</h6>
        <hr />
        {actionType !== 'rescheduling' && (
          <div className="sessions">
            <button className={sessionType === 60 ? 'buttons activeButton' : 'buttons'} onClick={() => selectSessionType(60)}>
              1 Hour
            </button>
            {user === undefined ? (
              <button className={sessionType === 15 ? 'buttons activeButton' : 'buttons'} onClick={() => selectSessionType(15)}>
                15 Minute
                {/* <span style={{ fontSize: '10px' }}> (coming soon) </span> */}
              </button>
            ) : (
              <button disabled={!user.usedTherapistFreeConsultations?.split('$').includes(mhpID)} className={sessionType === 15 ? 'buttons activeButton' : 'buttons'} onClick={() => selectSessionType(15)}>
                15 Minute
                {/* <span style={{ fontSize: '10px' }}> (coming soon) </span> */}
              </button>
            )}
          </div>
        )}
        <br />
        <DatePickerComponent
          format="dd MMMM"
          id="startTime"
          data-name="startTime"
          renderDayCell={disabledDate}
          value={visibleDate}
          className="e-field"
          change={onDateChanged}
          min={todaysDate}
          cssClass="e-customStyle"
        />
      </div>
      <div className="timings active-content">
        {morningSlots.length > 0 && (
          <div className="partsOfDay">
            <span className="parts">
              Morning&nbsp;
              <span className="grayText">
                (
                {sessionType === 60 ? morningSlots.filter((item) => item.sessionType === 'Therapy Session').length : morningSlots.filter((item) => item.sessionType === 'Consultation Call').length}
                &nbsp;slots
                )
              </span>
            </span>
            {sessionType === 60 ? (
              <p>
                {morningSlots.filter((item) => item.sessionType === 'Therapy Session').map(renderSlots)}
              </p>
            ) : (
              <p>
                {morningSlots.filter((item) => item.sessionType === 'Consultation Call').map(renderSlots)}
              </p>
            )}
          </div>
        )}
        {afternoonSlots.length > 0 && (
          <div className="partsOfDay">
            <span className="parts">
              Afternoon&nbsp;
              <span className="grayText">
                (
                {sessionType === 60 ? afternoonSlots.filter((item) => item.sessionType === 'Therapy Session').length : afternoonSlots.filter((item) => item.sessionType === 'Consultation Call').length}
                &nbsp;slots
                )
              </span>
            </span>
            {sessionType === 60 ? (
              <p>
                {afternoonSlots.filter((item) => item.sessionType === 'Therapy Session').map(renderSlots)}
              </p>
            ) : (
              <p>
                {afternoonSlots.filter((item) => item.sessionType === 'Consultation Call').map(renderSlots)}
              </p>
            )}
          </div>
        )}
        {eveningSlots.length > 0 && (
          <div className="partsOfDay">
            <span className="parts">
              Evening&nbsp;
              <span className="grayText">
                (
                {sessionType === 60 ? eveningSlots.filter((item) => item.sessionType === 'Therapy Session').length : eveningSlots.filter((item) => item.sessionType === 'Consultation Call').length}
                &nbsp;slots
                )
              </span>
            </span>
            {sessionType === 60 ? (
              <p>
                {eveningSlots.filter((item) => item.sessionType === 'Therapy Session').map(renderSlots)}
              </p>
            ) : (
              <p>
                {eveningSlots.filter((item) => item.sessionType === 'Consultation Call').map(renderSlots)}
              </p>
            )}
          </div>
        )}
      </div>
      {isDateTimeSelected && (
        <button className="btn btn--primary py-2 text-white" onClick={actionType !== 'rescheduling' ? startBooking : reschedule} style={{ backgroundColor: '#a6c', textTransform: 'capitalize', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {selectedDate ? (
            <>
              Reschedule Appointment
              {loading ? (
                <Box>
                  <CircularProgress />
                </Box>
              ) : (
                null
              )}
            </>
          ) : (
            'Book Appointment'
          )}
        </button>
      )}
      {modalShow && <KeepInMind confirmDetails={confirmDetails} closeModal={startBooking} />}
    </div>
  );
};

export default Calendar;
