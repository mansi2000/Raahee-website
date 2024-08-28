import { FETCH_MHPS } from '../constants/actionTypes';
import * as api from '../api/index';

export const getMhps = () => async (dispatch) => {
  try {
    const { data } = await api.fetchMhps();
    dispatch({ type: FETCH_MHPS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
