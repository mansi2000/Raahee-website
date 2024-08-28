/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import Comment from './comment/comment';
import {
  auth,
  FieldValue,
  firestore,
  serverTimeStamp,
} from '../../firebase/firebase.utils';
import './communityPosts.scss';
import { SHOW_MODAL } from '../../store/reducers/showLoginModal';

const CommunityPosts = ({
  userID,
  content,
  timestamp,
  id,
  imageURL,
  reportPost,
  deletePost,
  likes,
  commentsExist,
  enqueueSnackbar,
  isAnonymous,
}) => {
  const dispatch = useDispatch();
  const [Comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [likedBy, setLikedBy] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [limit, setLimit] = useState(1);
  const [isBoxVisible, setBoxVisible] = useState(false);
  const [textContent, setTextContent] = useState('');
  // const [showAllComments, setShowAllComments] = useState(false);
  useEffect(async () => {
    setLikedBy(likes);

    const comments = await firestore
      .collection('post')
      .doc(id)
      .collection('Comments')
      .get();
    if (comments) {
      setComments(
        comments.docs.map((doc) => {
          const data = doc.data();
          const { id } = doc;
          return { ...data, id };
        }),
      );
    }

    firestore
      .collection('users')
      .doc(userID)
      .get()
      .then((doc) => {
        if (doc.data() && doc.data().displayName) setName(doc.data().displayName);
        else setName('Anonymous');
      })
      .catch((err) => console.error(err));
  }, []);

  const comment = () => {
    firestore.collection('post').doc(id).update({
      commentsExist: true,
    });
    firestore
      .collection('post')
      .doc(id)
      .collection('Comments')
      .add({
        content: textContent,
        timestamp: serverTimeStamp,
        userId: auth.currentUser.uid,
        id: null,
      })
      .then(() => {
        enqueueSnackbar('Comment Posted', { variant: 'success' });
        setComments([
          { content: textContent, userId: auth.currentUser.uid },
          ...Comments,
        ]);
        setTextContent('');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  const toggleForm = () => {
    const user = auth.currentUser;

    if (user) {
      setShowForm(!showForm);
    } else {
      dispatch(SHOW_MODAL());
    }
  };

  const moreComments = () => {
    setLimit(limit + 5);
    setBoxVisible(!isBoxVisible);
  };
  const toggleLike = () => {
    const user = auth.currentUser;
    if (user) {
      if (likedBy.includes(user.uid)) {
        firestore
          .collection('post')
          .doc(id)
          .update({
            likes: FieldValue.arrayRemove(user.uid),
          })
          .then(() => {
            setLikedBy(likes.filter((element) => element !== user.uid));
          })
          .catch((err) => console.error(err));
      } else {
        firestore
          .collection('post')
          .doc(id)
          .update({
            likes: FieldValue.arrayUnion(user.uid),
          })
          .then(() => {
            setLikedBy([...likedBy, user.uid]);
          })
          .catch((err) => console.error(err));
      }
    } else {
      dispatch(SHOW_MODAL());
    }
  };

  const handleChange = (event) => {
    setTextContent(event.target.value);
  };

  const [redirect, setRedirect] = useState(null);

  const handleClick = () => {
    setRedirect(true);
  };
  useEffect(() => '', [redirect]);

  if (redirect && name !== 'Anonymous') {
    return <Redirect to={'/community/' + userID} />;
  }
  return (
    <div className="container-fluid mt-10">
      <div className="row">
        <div className="col-md-12 comment-box">
          <div className="card mb-4">
            <div className="card-header comment-box-row">
              <div className="media flex-wrap w-100 align-items-center comment-box-left-col">
                {/* {' '} */}
                <Avatar
                  aria-label="recipe"
                  style={{ backgroundColor: 'purple' }}
                >
                  {name[0]}
                </Avatar>
                {/* <img
                  src={Avatar}
                  height="40rem"
                  width="40rem"
                  className="d-block mr-1 rounded-circle user-image"
                  alt=""
                  style={{ marginLeft: '0.1rem' }}
                /> */}
                <div className="media-body ml-1 marginup">
                  {' '}
                  {isAnonymous ? (
                    <strong
                      data-abc="true"
                      className="username"
                      style={{ fontSize: '1.07rem', cursor: 'pointer' }}
                    >
                      Anonymous
                    </strong>
                  ) : (
                    <strong
                      onClick={() => handleClick()}
                      data-abc="true"
                      className="username"
                      style={{ fontSize: '1.07rem', cursor: 'pointer' }}
                    >
                      {name}
                    </strong>
                  )}
                  <p style={{ fontFamily: 'Poppins', fontSize: '0.7rem' }}>
                    {moment(new Date(timestamp.seconds * 1000)).fromNow()}
                  </p>
                </div>
              </div>
              <div className="float-right medium btn-group dropleft">
                <button
                  className="btnspcl"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {/* Drop */}
                  <i className="fa fa-ellipsis-v" aria-hidden="true" />
                </button>
                <div className="dropdown-menu">
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => deletePost(id)}
                    style={
                      auth.currentUser && userID === auth.currentUser.uid
                        ? { display: 'inline' }
                        : { display: 'none' }
                    }
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => reportPost(id)}
                    style={
                      auth.currentUser
                        ? { display: 'inline' }
                        : { display: 'none' }
                    }
                  >
                    Report
                  </button>
                </div>
              </div>
            </div>
            <div
              className="card-body written-post"
              style={{ fontFamily: 'Poppins', fontSize: '1rem' }}
            >
              <p>{content}</p>
            </div>
            <div>
              {imageURL ? (
                <img className="uploadImg" src={imageURL} alt="userImage" />
              ) : (
                ''
              )}
            </div>
            <div
              className="card-footer d-flex flex-wrap justify-content-between align-items-center px-4 pb-3 cmt"
              style={{ paddingTop: '1rem' }}
            >
              <span
                className="mb-1"
                style={{ display: 'inline', fontSize: '0.8rem' }}
              >
                <button
                  style={{
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    paddingLeft: '0em',
                    backgroundColor: 'transparent',
                  }}
                  onClick={toggleLike}
                >
                  {auth.currentUser
                  && likedBy.includes(auth.currentUser.uid) ? (
                    <>
                      <i
                        className="fas fa-heart text-danger"
                        style={{ fontSize: '1.15rem' }}
                      />
                    </>
                    ) : (
                      <>
                        <i
                          className="far fa-heart"
                          style={{ fontSize: '1.3rem' }}
                        />
                      </>
                    )}
                  {/* <span className="like-num ml-2">{typeof likes !== 'undefined' ? likedBy.length : 0}</span> */}
                </button>
                &nbsp;
                <span
                  className="mb-1"
                  style={{ display: 'inline', fontSize: '0.8rem' }}
                >
                  <button
                    className="comment-button"
                    onClick={toggleForm}
                  >
                    <i
                      className="far fa-comment"
                      style={{ fontSize: '1.3rem' }}
                    />
                    &nbsp;
                    {' '}
                    <span className="comment-button-text" style={{ fontSize: '1.0rem' }}> Comment</span>
                  </button>
                </span>
              </span>
              {commentsExist && (
                <div className="commnt">
                  <button
                    className="commnt-button"
                    onClick={moreComments}
                  >
                    View All comments
                  </button>
                </div>
              )}
            </div>
            <div className="container cmt">
              <form className="comment-form">
                {showForm === false ? (
                  ''
                ) : (
                  <>
                    <textarea
                      type="text"
                      className="form-control comment"
                      maxLength="200"
                      id="comment"
                      rows="1"
                      cols="170"
                      value={textContent}
                      onChange={handleChange}
                      placeholder="Write a comment"
                    />
                    <br />
                    <button
                      type="button"
                      className="btn btn-primary comment-btn"
                      onClick={comment}
                    >
                      Comment
                    </button>
                  </>
                )}
              </form>
            </div>
            <div className={`backCol ${isBoxVisible ? 'bodyList' : ''}`}>
              <ul className="comment-list">
                {Comments
                  && Comments.slice(0, limit).map((comment) => (
                    <Comment key={comment.id} {...comment} />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withSnackbar(CommunityPosts);
