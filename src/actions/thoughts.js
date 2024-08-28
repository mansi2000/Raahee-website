import { CREATE_THOUGHT, DELETE_THOUGHT, FETCH_THOUGHTS } from '../constants/actionTypes';
import * as api from '../api/index';

export const getThoughts = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchThoughts(userId);
    dispatch({ type: FETCH_THOUGHTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createThought = (thought) => async (dispatch) => {
  try {
    const { data } = await api.createThought(thought);
    dispatch({ type: CREATE_THOUGHT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUserThought = (id) => async (dispatch) => {
  try {
    await api.deleteUserThought(id);
    dispatch({ type: DELETE_THOUGHT, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
