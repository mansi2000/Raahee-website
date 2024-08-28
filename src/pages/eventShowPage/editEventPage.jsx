import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-scroll';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import './eventShowPage.scss';
import moment from 'moment';
import { updateEvent } from '../../actions/events';
import { uploadFile } from '../../api';

const EditEventPage = ({ event, enqueueSnackbar }) => {
  const [loading, setLoading] = useState({ display: 'none' });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [eventObj, setEventObj] = useState({
    title: event.title,
    about: event.about,
    summary: event.summary,
    startTime: event.startTime,
    endTime: event.endTime,
    image: event.image,
    link: event.link,
    ytLink: event.ytLink ? event.ytLink : '',
    emailContent: event.emailContent ? event.emailContent : '',
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDateTimeChange = (e) => {
    console.log(e.target.value);
    setEventObj((prevDetail) => ({
      ...prevDetail,
      [e.target.name]: new Date(e.target.value).toISOString(),
    }));
  };

  const handleChange = (e, editor, name) => {
    const newdata = editor.getData();
    setEventObj((prevDetail) => ({
      ...prevDetail,
      [name]: newdata,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = (image) => {
    setUploadLoading(true);
    const formData = new FormData();
    formData.append('files', image);
    uploadFile(formData)
      .then((response) => {
        setEventObj({ ...eventObj, image: response.data[0] });
        setUploadLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const saveEvent = () => {
    setLoading({ display: 'inline-block' });
    dispatch(updateEvent(event.id, eventObj))
      .then(() => {
        setLoading({ display: 'none' });
        enqueueSnackbar('Event Updated!', { variant: 'success' });
        history.push('/event');
      });
  };

  return (
    <div className="EventShowPage">
      {Object.keys(event).length > 0 && (
        <>
          <Helmet>
            <title>{`Raahee | ${event.title ? event.title : 'Event'}`}</title>
          </Helmet>
          <div className="jumbotron">
            <img src={eventObj.image?.url} alt="Event Banner" />
            {uploadLoading ? (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            ) : (
              null
            )}
            <div className="register">
              <label className="mybtn btn btn--primary btn-block py-2 text-capitalize text-white" style={{ backgroundColor: '#aa66cc' }} htmlFor="upload">
                Upload Image
                <input style={{ display: 'none' }} id="upload" placeholder="" type="file" onChange={handleFileChange} />
              </label>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <Nav className="event__navbar">
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
                </Nav>
                <div className="event__about" id="about">
                  <h4>
                    About the
                    {' '}
                    <input
                      size={eventObj.title.length}
                      type="text"
                      name="title"
                      value={eventObj.title}
                      onChange={(e) => setEventObj((prevDetail) => ({
                        ...prevDetail,
                        title: e.target.value,
                      }))}
                    />
                    <hr />
                  </h4>
                  <CKEditor
                    editor={ClassicEditor}
                    name="about"
                    data={eventObj.about}
                    onChange={(e, editor) => handleChange(e, editor, 'about')}
                  />
                </div>
                <div className="event__time" id="time">
                  <h4>
                    Event Date & Time
                    <hr />
                  </h4>
                  <h5 className="my-4 text-muted">
                    <i className="far fa-calendar-alt mr-2" />
                    Start Time
                    <input style={{ marginLeft: '10px' }} type="datetime-local" name="startTime" value={moment(eventObj.startTime.toString()).format('yyyy-MM-DDTHH:mm')} onChange={handleDateTimeChange} />
                  </h5>
                  <h5 className="my-4 text-muted">
                    <i className="far fa-calendar-alt mr-2" />
                    End Time
                    <input style={{ marginLeft: '20px' }} type="datetime-local" name="endTime" value={moment(eventObj.endTime.toString()).format('yyyy-MM-DDTHH:mm')} onChange={handleDateTimeChange} />
                  </h5>
                </div>
                <div className="event__about">
                  <h4>Email Content</h4>
                  <hr />
                  <CKEditor
                    editor={ClassicEditor}
                    name="emailContent"
                    data={eventObj.emailContent}
                    onChange={(e, editor) => handleChange(e, editor, 'emailContent')}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mt-md-5" id="register">
                  <div className="embed-responsive embed-responsive-16by9 card-image">
                    <iframe width="560" height="315" src={eventObj.ytLink ? eventObj.ytLink : 'https://www.youtube.com/embed/n8Sn6bBzsgQ'} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    {' '}
                  </div>
                  <div className="container mt-3 mb-3">
                    <h6>
                      About the
                      {' '}
                      <span className="text-uppercase">{event.title}</span>
                    </h6>
                    <CKEditor
                      editor={ClassicEditor}
                      name="summary"
                      data={eventObj.summary}
                      onChange={(e, editor) => handleChange(e, editor, 'summary')}
                    />
                    <h6 className="mt-2">
                      Event Link
                    </h6>
                    <input
                      className="event__titleInput"
                      type="text"
                      name="link"
                      value={eventObj.link}
                      onChange={(e) => setEventObj((prevDetail) => ({
                        ...prevDetail,
                        link: e.target.value,
                      }))}
                    />
                    <h6 className="mt-2">
                      Youtube Embed Link
                    </h6>
                    <input
                      className="event__titleInput"
                      type="text"
                      name="ytLink"
                      value={eventObj.ytLink}
                      onChange={(e) => setEventObj((prevDetail) => ({
                        ...prevDetail,
                        ytLink: e.target.value,
                      }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="register">
        <button
          className="btn btn--primary btn-block py-2 text-capitalize text-white"
          onClick={saveEvent}
        >
          <span className="spinner-border spinner-border-sm mr-2" role="status" style={loading} />
          Update Event
        </button>
      </div>
    </div>
  );
};

export default withSnackbar(EditEventPage);
