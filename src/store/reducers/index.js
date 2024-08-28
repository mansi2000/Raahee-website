import { combineReducers } from 'redux';
import authReducer from './auth';
import showLoginModalReducer from './showLoginModal';
import eventsReducer from './events';
import blogsReducer from './blogs';
import mhpReducer from './mhps';
import therapyTermsReducer from './therapyTerms';
import eventFeedbackReducer from './eventFeedbacks';
import mhpFeedbackReducer from './mhpFeedbacks';
import scheduleReducer from './therapySchedule';

export default combineReducers({
  showLoginModal: showLoginModalReducer,
  events: eventsReducer,
  blogs: blogsReducer,
  mhps: mhpReducer,
  eventFeedbacks: eventFeedbackReducer,
  mhpFeedbacks: mhpFeedbackReducer,
  authData: authReducer,
  therapyTerms: therapyTermsReducer,
  schedules: scheduleReducer,
});
