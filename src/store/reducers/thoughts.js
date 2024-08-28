import { CREATE_THOUGHT, DELETE_THOUGHT, FETCH_THOUGHTS } from '../../constants/actionTypes';

const thoughtReducer = (state = { thoughts: [] }, action) => {
  switch (action.type) {
    case FETCH_THOUGHTS:
      return { ...state, thoughts: action.payload };

    case CREATE_THOUGHT:
      return { ...state, thoughts: [...state.thoughts, action.payload] };

    case DELETE_THOUGHT:
      return { ...state, thoughts: state.thoughts.filter((thought) => thought.id !== action.payload) };

    default:
      return state;
  }
};

export default thoughtReducer;
