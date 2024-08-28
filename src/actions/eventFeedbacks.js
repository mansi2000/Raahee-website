import { CREATE_EVENT_FEEDBACK, DELETE_EVENT_FEEDBACK, FETCH_EVENT_FEEDBACKS } from '../constants/actionTypes';
import * as api from '../api/index';

export const getEventFeedbacks = (eventId) => async (dispatch) => {
  try {
    const { data } = await api.fetchEventFeedbackById(eventId);
    dispatch({ type: FETCH_EVENT_FEEDBACKS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createEventFeedback = (eventFeedback) => async (dispatch) => {
  try {
    const { data } = await api.createEventFeedback(eventFeedback);
    dispatch({ type: CREATE_EVENT_FEEDBACK, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteEventFeedback = (id) => async (dispatch) => {
  try {
    await api.deleteEventFeedback(id);
    dispatch({ type: DELETE_EVENT_FEEDBACK, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
