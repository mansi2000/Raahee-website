import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import { Box, LinearProgress } from '@material-ui/core';
import moment from 'moment';
import AppointmentCard from '../../components/appointmentCard/AppointmentCard';
import avatar from '../../assets/avatar-placeholder.png';
import { updateProfile, uploadFile } from '../../api';
import './UserDashboard.scss';

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('profile')).user;
  const { schedules } = useSelector((state) => state.schedules);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    gender: user.gender ? user.gender : 'Other',
    phoneNo: user.phoneNo ? user.phoneNo : '-',
    email: user.email,
    dob: user.dob ? user.dob : '-',
    bio: user.bio ? user.bio : 'bio',
    displayName: user.displayName ? user.displayName : user.username,
    image: user.image,
  });

  const genderOptions = [
    'Select Gender',
    'Agender',
    'Androgyne',
    'Androgynous',
    'Bigender',
    'Cis',
    'Cisgender',
    'CisFemale',
    'CisMale',
    'CisMan',
    'CisWoman',
    'CisgenderFemale',
    'CisgenderMale',
    'CisgenderMan',
    'CisgenderWoman',
    'Female',
    'FTM',
    'GenderFluid',
    'GenderNonconforming',
    'GenderQuestioning',
    'GenderVariant',
    'Genderqueer',
    'Intersex',
    'Male',
    'MTF',
    'Neither',
    'Neutrois',
    'Non-binary',
    'Other',
    'Pangender',
    'Trans',
    'TransFemale',
    'TransMale',
    'TransMan',
    'TransPerson',
    'TransWoman',
    'Transfeminine',
    'Transgender',
    'TransgenderFemale',
    'TransgenderMale',
    'TransgenderMan',
    'TransgenderPerson',
    'TransgenderWoman',
    'Transmasculine',
    'Transsexual',
    'TranssexualFemale',
    'TranssexualMale',
    'TranssexualMan',
    'TranssexualPerson',
    'TranssexualWoman',
    'TwoSpirit',
    'PreferNotToSay',
  ];

  const saveDetails = () => {
    updateProfile(details).then((userData) => {
      const loggedInUser = JSON.parse(localStorage.getItem('profile'));
      loggedInUser.user = userData.data;
      localStorage.setItem('profile', JSON.stringify(loggedInUser));
    });
    setIsEditing(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = (image) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('files', image);
    uploadFile(formData)
      .then((response) => {
        setDetails({ ...details, image: response.data[0] });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    setUpcomingSessions([]);
    setPastSessions([]);
    schedules.forEach((schedule) => {
      if (schedule.startTime > (new Date()).toISOString()) {
        setUpcomingSessions((upcomingSessions) => [...upcomingSessions, schedule]);
      } else {
        setPastSessions((pastSessions) => [...pastSessions, schedule]);
      }
    });
  }, [schedules]);

  return (
    <div className="userDashboard" id="calendar">
      <div className="userDashboard__detailsBox">
        <h4>Personal Details</h4>
        <br />
        {!isEditing ? (
          <div className="userDashboard__personalDetails">
            <img src={details.image ? details.image.url : avatar} alt="user profile pic" />
            <div className="userDashboard__profile">
              <h5>{`${details.displayName}`}</h5>
              <div className="detail__row">
                <span className="detail__head">Gender: </span>
                <span>{details.gender ? details.gender : 'Other'}</span>
              </div>
              <div className="detail__row">
                <span className="detail__head">Email: </span>
                <span>{details.email}</span>
              </div>
              <div className="detail__row">
                <span className="detail__head">Date of Birth: </span>
                <span>{details.dob ? moment.utc(details.dob).format('MMM DD, YYYY') : '-'}</span>
              </div>
              <div className="detail__row">
                <span className="detail__head">Phone Number: </span>
                <span>{details.phoneNo ? details.phoneNo : '-'}</span>
              </div>
              <div className="detail__row">
                <span className="detail__head">Bio: </span>
                <span>{details.bio}</span>
              </div>
            </div>
            <button className="btn btn--primary text-capitalize text-white" onClick={() => setIsEditing(true)}>
              Edit Profile
              <EditIcon />
            </button>
          </div>
        ) : (
          <div className="userDashboard__personalDetails">
            <div className="editProfile__image">
              <img src={details.image ? details.image.url : avatar} alt="user profile pic" />
              {loading ? (
                <Box sx={{ width: '100%' }}>
                  <LinearProgress />
                </Box>
              ) : (
                null
              )}
              <label className="userDashboard__imageEdit">
                <EditIcon />
                <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
              </label>
            </div>
            <div className="userDashboard__profile">
              <div className="detail__rowEdit">
                <span className="detail__head">Name: </span>
                <input value={details.displayName} id="displayName" onChange={handleChange} />
              </div>
              <div className="detail__rowEdit">
                <span className="detail__head">Gender: </span>
                <select value={details.gender} id="gender" onChange={handleChange}>
                  {genderOptions.map((gender, i) => {
                    return (
                      <option key={i} value={gender}>{gender}</option>
                    );
                  })}
                </select>
              </div>
              <div className="detail__rowEdit">
                <span className="detail__head">Email: </span>
                <input value={details.email} id="email" onChange={handleChange} disabled />
              </div>
              <div className="detail__rowEdit">
                <span className="detail__head">Date of Birth: </span>
                <input type="date" value={details.dob} id="dob" onChange={handleChange} />
              </div>
              <div className="detail__rowEdit">
                <span className="detail__head">Phone Number: </span>
                <input type="number" value={details.phoneNo} id="phoneNo" onChange={handleChange} />
              </div>
              <div className="detail__rowEdit">
                <span className="detail__head">Bio: </span>
                <input value={details.bio} id="bio" onChange={handleChange} />
              </div>
            </div>
            <button className="btn btn--primary text-capitalize text-white" onClick={saveDetails}>
              Save Profile
              <EditIcon />
            </button>
          </div>
        )}
        <br />
        <br />
        {upcomingSessions.length > 0 && <h4>Upcoming Sessions</h4>}
        <div className="userDashboard__sessions">
          {upcomingSessions.length > 0 && upcomingSessions.map((schedule, i) => (
            <AppointmentCard key={i} schedule={schedule} status="upcoming" />
          ))}
          <span>
            If you want to reschedule, please reach out to us on
            <a href="https://www.instagram.com/raahee.mentalhealth/" target="_blank" rel="noreferrer"> Instagram </a>
            or
            <span style={{ fontWeight: 'bold' }}> care.raahee@gmail.com </span>
          </span>
        </div>
        <br />
        {pastSessions.length > 0 && <h4>Previous Sessions</h4>}
        <div className="userDashboard__sessions">
          {pastSessions.length > 0 && pastSessions.map((schedule, i) => (
            <AppointmentCard key={i} schedule={schedule} status="past" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
