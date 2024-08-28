import React, { useState } from 'react';
import './communityNewPost.scss';
import { v4 as uuidv4 } from 'uuid';
import { withSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { storage, firestore, serverTimeStamp } from '../../firebase/firebase.utils';
import { SHOW_MODAL } from '../../store/reducers/showLoginModal';

const CommunityNewPost = ({ enqueueSnackbar, generatePost }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isChecked, setIsChecked] = useState(false);
  const [isAnonymousDisabled, setIsAnonymousDisabled] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = (image) => {
    const filename = image.name.split('.').join(`${uuidv4()}.`);
    const uploadTask = storage.ref('posts/' + filename).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgress(progress);
      },
      (err) => {
        console.error(err);
      },
      () => {
        storage
          .ref('posts')
          .child(filename)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
        setIsChecked(false);
        setIsAnonymousDisabled(true);
      },
    );
  };
  const post = () => {
    if (user) {
      const currentPost = {
        imageURL: url,
        content: textContent,
        timestamp: serverTimeStamp,
        isAnonymous: isChecked,
        userID: user.uid,
        numberOfReports: 0,
        reports: {},
        likes: [],
        commentsExist: false,
      };

      firestore
        .collection('post')
        .add(currentPost)
        .then((doc) => {
          setTextContent('');
          setUrl('');
          setProgress(0);
          generatePost(doc.id);
          enqueueSnackbar('Post Saved!', { variant: 'success' });
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    } else {
      alert('please login');
    }
  };

  const handleCheck = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleChange = (event) => {
    setTextContent(event.target.value);
  };

  return (
    <div className="container-fluid mt-10">
      <div className="row" id="start-post-box">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-body">
              <form id="post-content">
                <textarea
                  type="text"
                  className="form-control"
                  id="post-start"
                  rows="3"
                  maxLength="200"
                  placeholder="Start a conversation..."
                  value={textContent}
                  onChange={handleChange}
                />
              </form>
            </div>
            {user && (
              <div>
                <div className="button-wrap">
                  <label className="mybtn" htmlFor="upload">
                    Upload Image
                    <input id="upload" type="file" onChange={handleFileChange} />
                  </label>
                  {/* <button type="button" className="btn btn-success" onClick={handleUpload}>Upload</button> */}
                  {progress > 0 && <progress className="prg" value={progress} min="0" />}
                </div>
                <br />
                {url ? <img className="uploadImg" src={url} alt="dbhome" /> : ''}
              </div>
            )}

            <div className="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
              <div className="px-4 pt-3">
                {user ? <button className="btn btn-primary" id="post-btn" onClick={post}>Post</button> : <button className="btn btn-primary" id="post-btn" onClick={() => dispatch(SHOW_MODAL())}>Login to Post</button>}
              </div>
              <div className="px-4 pt-3">
                <label htmlFor="post-an" hidden={isAnonymousDisabled}>
                  <input type="checkbox" name="post-an" id="post-an" onChange={handleCheck} value={isChecked} hidden={isAnonymousDisabled} />
                  {' '}
                  Post as
                  Anonymous
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withSnackbar(CommunityNewPost);
