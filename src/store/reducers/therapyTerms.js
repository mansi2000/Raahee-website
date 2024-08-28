import { FETCH_TERMS, UPDATE_TERMS } from '../../constants/actionTypes';

const therapyTermsReducer = (state = { therapyTerms: [] }, action) => {
  switch (action.type) {
    case FETCH_TERMS:
      return { ...state, therapyTerms: action.payload };

    case UPDATE_TERMS:
      return { ...state, therapyTerms: state.therapyTerms.map((term) => (term.id === action.payload.id ? action.payload : term)) };

    default:
      return state;
  }
};

export default therapyTermsReducer;
