import { FETCH_MHP_FEEDBACKS, CREATE_MHP_FEEDBACK, DELETE_MHP_FEEDBACK } from '../../constants/actionTypes';

const mhpFeedbackReducer = (state = { mhpFeedbacks: [] }, action) => {
  switch (action.type) {
    case FETCH_MHP_FEEDBACKS:
      return { ...state, mhpFeedbacks: action.payload };

    case CREATE_MHP_FEEDBACK:
      return { ...state, mhpFeedbacks: [action.payload, ...state.mhpFeedbacks] };

    case DELETE_MHP_FEEDBACK:
      return { ...state, mhpFeedbacks: state.mhpFeedbacks.filter((mhpFeedback) => mhpFeedback.id !== action.payload) };

    default:
      return state;
  }
};

export default mhpFeedbackReducer;
