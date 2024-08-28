import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { withSnackbar } from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Editor from 'rich-markdown-editor';
import moment from 'moment';
import { RiEdit2Fill } from 'react-icons/ri';
import { IoExitSharp } from 'react-icons/io5';
import { fetchBlogById, likeBlog, uploadFile } from '../../api';
import { SHOW_MODAL } from '../../store/reducers/showLoginModal';
import './blogShowPage.scss';
import { updateBlog } from '../../actions/blogs';

const BlogShowPage = ({ history, enqueueSnackbar }) => {
  const { blogTitle } = useParams();
  const blogId = blogTitle.split('-').splice(-1);
  const dispatch = useDispatch();
  const [blog, setBlog] = useState({});
  const [blogObj, setBlogObj] = useState({});
  const [TimeStamp, setTimeStamp] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [spinnerLoading, setSpinnerLoading] = useState({ display: 'none' });
  const [readOnly, setReadOnly] = useState(true);
  const user = JSON.parse(localStorage.getItem('profile'))?.user;
  const userAuth = JSON.parse(localStorage.getItem('profile'))?.jwt;
  const blogData = JSON.parse(localStorage.getItem('blogDetails'));

  useEffect(() => {
    if (blogData) {
      const data = JSON.parse(localStorage.getItem('blogDetails')).props;
      setTimeStamp(moment(data.createdAt.toString()).utc().format('DD-MM-YYYY'));
      setBlog(data);
      if (user) {
        setLiked(typeof data.likes !== 'undefined' ? data.likes.includes(user.id) : false);
      }
      setLoading(false);
    } else {
      fetchBlogById(blogId).then((blogData) => {
        const data = blogData.data;
        setTimeStamp(moment(data.createdAt.toString()).utc().format('DD-MM-YYYY'));
        setBlog(data);
        if (user) {
          setLiked(typeof data.likes !== 'undefined' ? data.likes.includes(user.id) : false);
        }
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    setBlogObj(blog);
  }, [blog]);

  const toggleLike = () => {
    if (userAuth) {
      if (liked) {
        setLiked(false);
        const currentBlog = blog;
        currentBlog.likes = currentBlog.likes.filter((element) => element !== user.id);
        setBlog(currentBlog);
        likeBlog(blog.id, blog.likes.filter((element) => element !== user.id))
          .catch((err) => console.error(err));
      } else {
        setLiked(true);
        const currentBlog = blog;
        if (typeof currentBlog.likes === 'undefined') {
          currentBlog.likes = [];
        }
        currentBlog.likes = [...currentBlog.likes, user.id];
        setBlog(currentBlog);
        likeBlog(blog.id, [...blog.likes, user.id])
          .catch((err) => console.error(err));
      }
    } else {
      dispatch(SHOW_MODAL());
    }
  };

  const handleChange = (e, name) => {
    const value = e();
    setBlogObj((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = (image) => {
    setUploadLoading(true);
    const formData = new FormData();
    formData.append('files', image);
    uploadFile(formData)
      .then((response) => {
        setBlogObj((prevDetail) => ({
          ...prevDetail,
          image: response.data[0],
        }));
        setUploadLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const saveBlog = () => {
    setSpinnerLoading({ display: 'inline-block' });
    dispatch(updateBlog(blog.id, blogObj))
      .then(() => {
        setLoading({ display: 'none' });
        enqueueSnackbar('Blog Updated!', { variant: 'success' });
        history.push('/blog');
      });
  };

  return (
    <>
      {user && user.email === process.env.REACT_APP_ADMIN_EMAIL
        && (
          <button className="btn btn--primary btn-block py-2 text-white" style={{ position: 'fixed', marginTop: '20px', right: '10px', zIndex: 2, backgroundColor: '#aa66cc', width: 'auto' }} onClick={() => setReadOnly(!readOnly)}>
            {!readOnly ? <IoExitSharp /> : <RiEdit2Fill />}
          </button>
        )}
      {!loading ? (
        <div className="BlogShowPage">
          <Helmet>
            <title>{`Raahee | ${blog.title ? blog.title : 'Blog'}`}</title>
          </Helmet>
          <div className="container row mx-auto" id="blog-card">
            <div className="col-3 col-author">
              <div className="author-details mt-7">
                <span className="text-capitalize text-muted">Posted By:</span>
                <br />
                <span className="font-weight-bold">Raahee</span>
                <br />
                <br />
                Leading a generation of change.
                <br />
                Advocates for mental health, emotional hygiene and a
                society where help is given to the ones in need.
                <p className="like mt-4">
                  <button className="btn" style={{ boxShadow: 'none', paddingLeft: '0em' }} onClick={toggleLike}>
                    {liked
                      ? <i className="fas fa-heart text-danger" />
                      : <i className="far fa-heart" />}
                    <span className="like-num ml-2">{typeof blog.likes !== 'undefined' ? blog.likes.length : 0}</span>
                  </button>
                </p>
              </div>
            </div>
            <div className="cards col-lg-9 col-md-12" id={blog.id}>
              {user && user.email === process.env.REACT_APP_ADMIN_EMAIL && !readOnly
                && (
                  <div className="register">
                    <button
                      className="btn btn--primary btn-block py-2 text-capitalize text-white"
                      style={{ position: 'fixed', bottom: '10px', zIndex: '2', backgroundColor: '#aa66cc', width: 'auto', left: '55%' }}
                      onClick={saveBlog}
                    >
                      <span className="spinner-border spinner-border-sm mr-2" role="status" style={spinnerLoading} />
                      Update Blog
                    </button>
                  </div>
                )}
              {TimeStamp ? (
                <div className="card-body">
                  <img
                    style={{ maxHeight: '600px' }}
                    className="card-img"
                    src={blogObj.image?.url}
                    alt="blog Pic"
                  />
                  {uploadLoading ? (
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress />
                    </Box>
                  ) : (
                    null
                  )}
                  {user && user.email === process.env.REACT_APP_ADMIN_EMAIL && !readOnly
                    && (
                      <div className="register">
                        <label className="btn btn--primary btn-block py-2 text-capitalize text-white" style={{ backgroundColor: '#aa66cc' }} htmlFor="upload">
                          Upload Image
                          <input style={{ display: 'none' }} id="upload" placeholder="" type="file" onChange={handleFileChange} />
                        </label>
                      </div>
                    )}
                  <Editor
                    className="card-title-editable"
                    value={blog.title}
                    readOnly={readOnly}
                    template
                    onChange={(e) => handleChange(e, 'title')}
                  />
                  <p className="card-subtitle flex text-muted">{TimeStamp}</p>
                  <div className="card-text mt-5">
                    <Editor
                      value={blog.content}
                      readOnly={readOnly}
                      template
                      onChange={(e) => handleChange(e, 'content')}
                    />
                  </div>
                  <p className="bottom-like">
                    <button className="btn" style={{ boxShadow: 'none', paddingLeft: '0em' }} onClick={toggleLike}>
                      {liked
                        ? <i className="fas fa-heart text-danger" />
                        : <i className="far fa-heart" />}
                      <span className="like-num ml-2">{typeof blog.likes !== 'undefined' ? blog.likes.length : 0}</span>
                    </button>
                  </p>
                </div>
              ) : <p>Loading...</p>}
            </div>
          </div>
        </div>
      ) : (
        <Box sx={{ color: 'grey.500', display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress color="secondary" />
        </Box>
      )}
    </>
  );
};

export default withSnackbar(BlogShowPage);
