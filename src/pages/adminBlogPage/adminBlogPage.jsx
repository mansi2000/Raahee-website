import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Editor from 'rich-markdown-editor';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import './adminBlogPage.scss';
import { createBlog } from '../../actions/blogs';

const AdminBlogPage = ({ enqueueSnackbar, history }) => {
  const user = JSON.parse(localStorage.getItem('profile'))?.user;
  const [blogObj, setBlogObj] = useState({
    content: 'Content goes here (select something to toggle toolbar).  \n## Write subtitle here (delete this line as well)',
    title: '',
    category: '',
    summary: '',
  });

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlogObj((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const { title, summary, content, category } = blogObj;

    const formData = new FormData();

    formData.append('files.image', file);
    formData.append('data', JSON.stringify({
      title: title,
      summary: summary,
      content: content,
      category: category,
      author: user?.id,
      created_by: user?.id,
      updated_by: user?.id,
      likes: [],
      published_at: new Date(),
    }));

    dispatch(createBlog(formData))
      .then(() => {
        enqueueSnackbar('Blog published!', { variant: 'success' });
        history.replace('/blog');
      })
      .catch(() => {
        enqueueSnackbar('Error creating blog', { variant: 'error' });
      });
  };

  const onEditorStateChange = (value) => {
    setBlogObj((prevDetail) => ({
      ...prevDetail,
      content: value().trim(),
    }));
  };

  return (
    <>
      {user?.email === process.env.REACT_APP_ADMIN_EMAIL && (
        <div className="AdminBlogPage">
          <input
            type="text"
            value={blogObj.title}
            onChange={handleChange}
            name="title"
            placeholder="Title"
            className="w-75 details"
          />
          <br />

          <input
            type="text"
            className="w-75 details"
            onChange={handleChange}
            value={blogObj.category}
            name="category"
            placeholder="category"
          />
          <br />

          <input
            type="text"
            className="w-75 details"
            onChange={handleChange}
            value={blogObj.summary}
            name="summary"
            placeholder="Summary"
          />
          <br />

          <Editor
            style={{ margin: '2em 0' }}
            defaultValue={blogObj.content}
            onChange={onEditorStateChange}
          />
          <Button
            variant="contained"
            color="primary"
            component="label"
            className="uploadButton"
            startIcon={<CloudUploadIcon />}
          >
            <input
              onChange={handleUpload}
              name="imageurl"
              type="file"
              hidden
            />
            Upload
          </Button>
        </div>
      )}
    </>
  );
};

export default withSnackbar(withRouter(AdminBlogPage));
