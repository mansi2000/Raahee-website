import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import {
  ActivityPage,
  AboutPage,
  AddEventPage,
  AdminBlogPage,
  EventPage,
  EventShowPage,
  BlogPage,
  BlogShowPage,
  BookSessionPage,
  NewHomePage,
  BreathePage,
  MeditationPage,
  AnonymousMessagePage,
  WorryTreePage,
  TermsPage,
  TeamsPage,
  ValuesPage,
  PasswordResetPage,
  TherapyTerms,
} from './pages';

import BlogTagSearchPage from './pages/blogPage/blogTagSearchPage';
import TherapistsPage from './pages/therapistsPage/TherapistsPage';
import TherapistInfo from './pages/TherapistInfo/TherapistInfo';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Header from './components/Header/Header';
import LoginModal from './components/LoginModal/LoginModal';
import ProtectedRouteAdmin from './components/ProtectedRoute/ProtectedRouteAdmin';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { HIDE_MODAL } from './store/reducers/showLoginModal';
import BookTherapy from './pages/bookTherapy/BookTherapy';
import GoogleAuthCallback from './components/LoginModal/googleAuthCallback';
import SuccessTransaction from './pages/transactionStatusPage/SuccessTransaction';
import FailTransaction from './pages/transactionStatusPage/FailTransaction';
import UserDashboard from './pages/userDashboard/UserDashboard';
import BookingPage from './pages/bookingPage/bookingPage';
import ConfirmDetailsPage from './pages/ConfirmDetailsPage/confirmDetailsPage';
import { getMhps } from './actions/mhps';
import { getBlogs } from './actions/blogs';
import { getTherapyTerms } from './actions/therapyTerms';
import { getEvents } from './actions/events';
import { getSchedule } from './actions/therapySchedule';

function App() {
  const [showHeaderAndFooter, setShowHeaderAndFooter] = useState(true);
  const showLoginModal = useSelector((state) => state.showLoginModal);
  const user = JSON.parse(localStorage.getItem('profile'))?.user;
  const profile = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getBlogs());
    dispatch(getMhps());
    dispatch(getTherapyTerms());
  }, []);

  useEffect(() => {
    if (profile?.jwt) {
      dispatch(getSchedule(profile.user.id));
    }
  }, [profile]);

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <Router>
          <ScrollToTop>
            {showHeaderAndFooter && <Header />}
            <LoginModal
              isShown={showLoginModal}
              onHide={() => dispatch(HIDE_MODAL())}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <NewHomePage {...props} />}
              />
              <Route exact path="/activities" component={ActivityPage} />
              <Route
                exact
                path="/anonymousMessage"
                render={(props) => <AnonymousMessagePage {...props} />}
              />
              <Route exact path="/about" component={AboutPage} />
              <ProtectedRouteAdmin
                exact
                path="/addEvent"
                user={user}
                component={AddEventPage}
              />
              <ProtectedRouteAdmin
                exact
                path="/adminBlog"
                user={user}
                component={AdminBlogPage}
              />
              <Route path="/auth/google/callback" component={GoogleAuthCallback} />

              <Route exact path="/blog" component={BlogPage} />
              <Route
                exact
                path="/blogTagSearchPage"
                component={BlogTagSearchPage}
              />
              <Route
                exact
                path="/blog/:blogTitle"
                render={(props) => <BlogShowPage {...props} />}
              />

              <Route exact path="/bookSession" component={BookSessionPage} />
              <Route
                exact
                path="/event"
                render={(props) => <EventPage {...props} user={user} />}
              />
              <Route
                exact
                path="/event/:eventName"
                render={(props) => <EventShowPage {...props} />}
              />
              <Route
                exact
                path="/breathe"
                render={(props) => (
                  <BreathePage
                    {...props}
                    setShowHeaderAndFooter={setShowHeaderAndFooter}
                  />
                )}
              />
              <Route
                exact
                path="/meditation"
                render={(props) => <MeditationPage {...props} />}
              />
              <Route exact path="/terms" component={TermsPage} />
              <Route exact path="/worryTree" component={WorryTreePage} />
              <Route path="/policy" user={user} component={TherapyTerms} />
              <ProtectedRoute exact path="/profile" component={UserDashboard} />
              <Route exact path="/therapists" component={TherapistsPage} />
              <Route
                exact
                path="/therapists/:mhpID"
                component={TherapistInfo}
              />
              <Route
                exact
                path="/booktherapy"
                component={BookTherapy}
              />
              <ProtectedRoute
                exact
                path="/therapists/:mhpID/therapy-confirmation"
                component={ConfirmDetailsPage}
              />
              <ProtectedRoute
                exact
                path="/therapists/:mhpID/schedule"
                component={BookingPage}
              />
              <ProtectedRoute
                exact
                path="/therapists/:mhpID/success"
                component={SuccessTransaction}
              />
              <ProtectedRoute
                exact
                path="/therapists/:mhpID/failure"
                component={FailTransaction}
              />
              <Route exact path="/about/values" component={ValuesPage} />
              <Route exact path="/about/team" component={TeamsPage} />
              <Route
                path="/reset-password"
                exact
                render={(props) => (
                  <PasswordResetPage
                    {...props}
                    setShowHeaderAndFooter={setShowHeaderAndFooter}
                  />
                )}
              />
            </Switch>
            {showHeaderAndFooter && <Footer />}
          </ScrollToTop>
        </Router>
      </div>
    </SnackbarProvider>
  );
}
export default App;
