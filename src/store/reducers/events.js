import { FETCH_EVENTS, CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from '../../constants/actionTypes';

const eventReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return { ...state, events: action.payload };

    case CREATE_EVENT:
      return { ...state, events: [...state.events, action.payload] };

    case UPDATE_EVENT:
      return { ...state, events: state.events.map((event) => (event.id === action.payload.id ? action.payload : event)) };

    case DELETE_EVENT:
      return { ...state, events: state.events.filter((event) => event.id !== action.payload) };

    default:
      return state;
  }
};

export default eventReducer;
