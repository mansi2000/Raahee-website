import { FETCH_SCHEDULE, CREATE_SCHEDULE, UPDATE_SCHEDULE } from '../../constants/actionTypes';

const scheduleReducer = (state = { schedules: [] }, action) => {
  switch (action.type) {
    case FETCH_SCHEDULE:
      return { ...state, schedules: action.payload };

    case CREATE_SCHEDULE:
      return { ...state, schedules: [...state.schedules, action.payload] };

    case UPDATE_SCHEDULE:
      return { ...state, schedules: state.schedules.filter((schedule) => schedule.id !== action.payload.id) };

    default:
      return state;
  }
};

export default scheduleReducer;
