import { FETCH_TERMS, UPDATE_TERMS } from '../constants/actionTypes';
import * as api from '../api/index';

export const getTherapyTerms = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTherapyTerms();
    dispatch({ type: FETCH_TERMS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCancellationPolicy = (id, value) => async (dispatch) => {
  try {
    const { data } = await api.updateCancellationPolicy(id, value);
    dispatch({ type: UPDATE_TERMS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateConfidentiality = (id, value) => async (dispatch) => {
  try {
    const { data } = await api.updateConfidentiality(id, value);
    dispatch({ type: UPDATE_TERMS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateMainTerms = (id, value) => async (dispatch) => {
  try {
    const { data } = await api.updateMainTerms(id, value);
    dispatch({ type: UPDATE_TERMS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
