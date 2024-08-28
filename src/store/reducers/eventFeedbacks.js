import { FETCH_EVENT_FEEDBACKS, CREATE_EVENT_FEEDBACK, DELETE_EVENT_FEEDBACK } from '../../constants/actionTypes';

const eventFeedbackReducer = (state = { eventFeedbacks: [] }, action) => {
  switch (action.type) {
    case FETCH_EVENT_FEEDBACKS:
      return { ...state, eventFeedbacks: action.payload };

    case CREATE_EVENT_FEEDBACK:
      return { ...state, eventFeedbacks: [action.payload, ...state.eventFeedbacks] };

    case DELETE_EVENT_FEEDBACK:
      return { ...state, eventFeedbacks: state.eventFeedbacks.filter((eventFeedback) => eventFeedback.id !== action.payload) };

    default:
      return state;
  }
};

export default eventFeedbackReducer;
