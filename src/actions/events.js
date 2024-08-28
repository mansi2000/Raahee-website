import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT } from '../constants/actionTypes';
import * as api from '../api/index';

export const getEvents = () => async (dispatch) => {
  try {
    const { data } = await api.fetchEvents();
    dispatch({ type: FETCH_EVENTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createEvent = (event) => async (dispatch) => {
  try {
    const { data } = await api.createEvent(event);
    dispatch({ type: CREATE_EVENT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const attendEvent = (id, attendees) => async (dispatch) => {
  try {
    const { data } = await api.attendEvent(id, attendees);
    dispatch({ type: UPDATE_EVENT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await api.deleteEvent(id);
    dispatch({ type: DELETE_EVENT, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateEvent = (eventId, event) => async (dispatch) => {
  try {
    const { data } = await api.updateEvent(eventId, event);
    console.log(data);
    dispatch({ type: UPDATE_EVENT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
