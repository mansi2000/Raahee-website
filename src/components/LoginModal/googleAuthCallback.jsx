import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withSnackbar } from 'notistack';
import { googleSignIn } from '../../actions/auth';

function GoogleAuthCallback({ enqueueSnackbar }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!location) {
      return;
    }
    const { search } = location;
    dispatch(googleSignIn(search))
      .then((res) => {
        history.push('/');
        if (res) {
          if (res.response.data.message[0].messages[0].id === 'Auth.form.error.email.taken') {
            enqueueSnackbar('You have registered with your Email. Please try signing in with your email password', { variant: 'error' });
          } else {
            enqueueSnackbar('Something went wrong. Please try again!', { variant: 'error' });
          }
        }
      });
  }, [location]);

  return (
    <Box sx={{ color: 'grey.500', display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress color="secondary" />
    </Box>
  );
}

export default withSnackbar(GoogleAuthCallback);
