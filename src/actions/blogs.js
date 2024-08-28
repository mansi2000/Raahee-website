import { CREATE_BLOG, DELETE_BLOG, FETCH_BLOGS, UPDATE_BLOG } from '../constants/actionTypes';
import * as api from '../api/index';

export const getBlogs = () => async (dispatch) => {
  try {
    const { data } = await api.fetchBlogsbyCategory();
    dispatch({ type: FETCH_BLOGS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createBlog = (blog) => async (dispatch) => {
  try {
    const { data } = await api.createBlog(blog);
    dispatch({ type: CREATE_BLOG, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likeBlog = (id, likedBy) => async (dispatch) => {
  try {
    const { data } = await api.likeBlog(id, likedBy);
    dispatch({ type: UPDATE_BLOG, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await api.deleteBlog(id);
    dispatch({ type: DELETE_BLOG, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateBlog = (blogId, blog) => async (dispatch) => {
  try {
    const { data } = await api.updateBlog(blogId, blog);
    console.log(data);
    dispatch({ type: UPDATE_BLOG, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
