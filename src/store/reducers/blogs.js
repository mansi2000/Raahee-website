import { CREATE_BLOG, DELETE_BLOG, FETCH_BLOGS, UPDATE_BLOG } from '../../constants/actionTypes';

const blogReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case FETCH_BLOGS:
      return { ...state, blogs: action.payload };

    case CREATE_BLOG:
      return { ...state, blogs: [...state.blogs, action.payload] };

    case UPDATE_BLOG:
      return { blogs: state.blogs.map((blog) => (blog.id === action.payload.id ? action.payload : blog)), ...state };

    case DELETE_BLOG:
      return { ...state, blogs: state.blogs.filter((blog) => blog.id !== action.payload) };

    default:
      return state;
  }
};

export default blogReducer;
