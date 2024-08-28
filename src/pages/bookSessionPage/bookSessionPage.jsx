import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { withSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { firestore, auth } from '../../firebase/firebase.utils';
import { SHOW_MODAL } from '../../store/reducers/showLoginModal';
import './bookSessionPage.scss';

function bookSessionPage({ enqueueSnackbar }) {
  const dispatch = useDispatch();
  const user = auth.currentUser;
  const [session, setSession] = useState({
    email: '',
    name: '',
    gender: false,
    city: '',
    phone: '',
    age: '',
    typeOfTherapy: false,
    therapyBefore: false,
    anxiety: false,
    chronicPain: false,
    suicideThoughts: false,
    problemDesc: '',
    dateTime: '',
    else: false,
    elseDetails: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSession({ ...session, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (auth.currentUser) {
      setSession({ ...session, uid: auth.currentUser.uid });
      firestore
        .collection('bookSession')
        .add(session)
        .then(() => {
          const apiKey = process.env.REACT_APP_MAILGUN_API_KEY;
          const domain = 'raahee.app';
          const mailgun = require('mailgun-js')({
            apiKey: apiKey,
            domain: domain,
          });
          const emailData = {
            from: `Raahee Admin <${process.env.REACT_APP_ADMIN_EMAIL}>`,
            to: session.email,
            subject: 'Book a therapy session with Raahee',
            template: 'booksessionmail',
            'v:name': session.name,
          };

          mailgun.messages().send(emailData, (err, body) => {
            if (!err) {
              enqueueSnackbar(
                'Session Booked. Check your email for more information! Make sure to check the spam folder as well.',
                {
                  variant: 'success',
                  autoHideDuration: 2000,
                },
              );
              console.log(body);
            } else console.error(err);
          });
        })
        .catch((err) => console.error(err));

      setSession({
        email: '',
        name: '',
        gender: false,
        city: '',
        phone: '',
        age: '',
        typeOfTherapy: false,
        therapyBefore: false,
        anxiety: false,
        chronicPain: false,
        suicideThoughts: false,
        problemDesc: '',
        dateTime: '',
        else: false,
        elseDetails: false,
      });
    } else {
      dispatch(SHOW_MODAL());
    }
  };

  useEffect(() => {
    if (session.else === 'yes') {
      setSession({ ...session, elseDetails: '' });
    } else {
      setSession({ ...session, elseDetails: false });
    }
  }, [session.else]);

  useEffect(() => {
    if (!user) dispatch(SHOW_MODAL());
  }, [user]);

  return (
    <div className="bookSession">
      <Helmet>
        <title>Raahee | Book a Session</title>
      </Helmet>
      <div className="container p-5" style={{ marginTop: '5rem' }}>
        <h3 className="display-4 text-center">Book a Session with our Psychologists</h3>
        <div className="row justify-content-center mt-4">
          <Form onSubmit={handleSubmit}>
            <div className="row ml-0">
              <FormControl>
                <FormLabel className="font-weight-bold text-dark" component="legend">
                  Are you booking for someone else ?
                </FormLabel>
                <RadioGroup
                  aria-label="else"
                  name="else"
                  value={session.else}
                  onChange={handleChange}
                  required
                >
                  <FormControlLabel value="yes" control={<Radio color="secondary" />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio color="secondary" />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
            {session.else === 'yes' ? (
              <Form.Label className="font-weight-bold">
                If yes, enter their details below.
              </Form.Label>

            ) : ('')}

            <Form.Group controlId="formBasicEmail">
              <Form.Label className="font-weight-bold">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                value={session.email}
                className="input"
                name="email"
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label className="font-weight-bold">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                value={session.name}
                className="input"
                required
              />
            </Form.Group>

            <FormControl component="fieldset">
              <FormLabel className="font-weight-bold text-dark" component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={session.gender}
                onChange={handleChange}
                required
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
                <FormControlLabel
                  value="prefer not to say"
                  control={<Radio />}
                  label="Prefer Not to Say"
                />
              </RadioGroup>
            </FormControl>

            <Form.Group controlId="formBasicCity">
              <Form.Label className="font-weight-bold">City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City name"
                name="city"
                onChange={handleChange}
                value={session.city}
                className="input"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Label className="font-weight-bold">Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone Number"
                name="phone"
                onChange={handleChange}
                value={session.phone}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicAge">
              <Form.Label className="font-weight-bold">Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Age"
                name="age"
                onChange={handleChange}
                value={session.age}
                className="input"
                required
              />
            </Form.Group>

            <div className="row ml-2">
              <FormControl>
                <FormLabel className="font-weight-bold text-dark" component="legend">
                  What type of Counselling are you looking for?
                </FormLabel>
                <RadioGroup
                  aria-label="typeOfTherapy"
                  name="typeOfTherapy"
                  value={session.typeOfTherapy}
                  onChange={handleChange}
                  required
                >
                  <FormControlLabel
                    value="individual counselling"
                    control={<Radio />}
                    label="Individual Counselling (for myself)"
                  />
                  <FormControlLabel
                    value="couple counselling"
                    control={<Radio />}
                    label="Couple Counselling (for me and my partner)"
                  />
                  <FormControlLabel
                    value="teenage counselling"
                    control={<Radio />}
                    label="Teenage Counselling (for my child)"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="row ml-2">
              <FormControl>
                <FormLabel className="font-weight-bold text-dark" component="legend">
                  Have you ever been in Therapy or Counselling before?
                </FormLabel>
                <RadioGroup
                  aria-label="therapyBefore"
                  name="therapyBefore"
                  value={session.therapyBefore}
                  onChange={handleChange}
                  required
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="row ml-2">
              <FormControl>
                <FormLabel className="font-weight-bold text-dark" component="legend">
                  Are you currently experiencing anxiety, panic attacks or have any phobias?
                </FormLabel>
                <RadioGroup
                  aria-label="anxiety"
                  name="anxiety"
                  value={session.anxiety}
                  onChange={handleChange}
                  required
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="row ml-2">
              <FormControl>
                <FormLabel className="font-weight-bold text-dark" component="legend">
                  Are you currently experiencing any chronic pain?
                </FormLabel>
                <RadioGroup
                  aria-label="chronicPain"
                  name="chronicPain"
                  value={session.chronicPain}
                  onChange={handleChange}
                  required
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="row ml-2">
              <FormControl>
                <FormLabel className="font-weight-bold text-dark" component="legend">
                  Have you been getting any suicidal thoughts recently?
                </FormLabel>
                <RadioGroup
                  aria-label="suicideThoughts"
                  name="suicideThoughts"
                  value={session.suicideThoughts}
                  onChange={handleChange}
                  required
                >
                  <FormControlLabel value="yes" control={<Radio color="secondary" />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio color="secondary" />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="font-weight-bold">
                A short description about the problem you want to discuss with your therapist.
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="problemDesc"
                onChange={handleChange}
                value={session.problemDesc}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicDateTime">
              <Form.Label className="font-weight-bold">
                What Day and Time would you prefer for your session?
              </Form.Label>
              <Form.Control
                type="datetime-local"
                onChange={handleChange}
                name="dateTime"
                value={session.dateTime}
                className="input"
                required
              />
            </Form.Group>

            <Button
              variant="secondary"
              type="submit"
              block
              className="text-capitalize"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default withSnackbar(bookSessionPage);
