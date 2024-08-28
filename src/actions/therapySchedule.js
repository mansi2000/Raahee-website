import { CREATE_SCHEDULE, FETCH_SCHEDULE, UPDATE_SCHEDULE } from '../constants/actionTypes';
import * as api from '../api/index';

export const getSchedule = (mhpId) => async (dispatch) => {
  try {
    const { data } = await api.fetchSchedule(mhpId);
    dispatch({ type: FETCH_SCHEDULE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const scheduleAppointment = (scheduleId) => async (dispatch) => {
  try {
    const { data } = await api.scheduleAppointment(scheduleId);
    dispatch({ type: CREATE_SCHEDULE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const rescheduleAppointment = (scheduleId) => async (dispatch) => {
  try {
    const { data } = await api.rescheduleAppointment(scheduleId);
    dispatch({ type: UPDATE_SCHEDULE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
