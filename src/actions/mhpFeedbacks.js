import { CREATE_MHP_FEEDBACK, FETCH_MHP_FEEDBACKS, DELETE_MHP_FEEDBACK } from '../constants/actionTypes';
import * as api from '../api/index';

export const getMhpFeedbacks = (mhpId) => async (dispatch) => {
  try {
    const { data } = await api.fetchMhpFeedbackById(mhpId);
    dispatch({ type: FETCH_MHP_FEEDBACKS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createMhpFeedback = (mhpFeedback) => async (dispatch) => {
  try {
    const { data } = await api.createMhpFeedback(mhpFeedback);
    dispatch({ type: CREATE_MHP_FEEDBACK, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMhpFeedback = (id) => async (dispatch) => {
  try {
    await api.deleteMhpFeedback(id);
    dispatch({ type: DELETE_MHP_FEEDBACK, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
