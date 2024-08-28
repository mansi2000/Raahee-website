/* eslint-disable */
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firestore, FieldValue } from '../../firebase/firebase.utils';
import { SHOW_MODAL } from '../../store/reducers/showLoginModal';

const roomStatus = {
  INIT: 'INIT',
  OPEN_FOR_WORRIES: 'OPEN_FOR_WORRIES',
  WAIT_FOR_REPLY: 'WAIT_FOR_REPLY',
  OPEN_FOR_REPLIES: 'OPEN_FOR_REPLIES',
  WAIT_FOR_CLOSE: 'WAIT_FOR_CLOSE',
  CLOSED: 'CLOSED',
  END: 'END',
};

const UserAnonymousPanelForRoomSelection = ({
  currentRoom, setCurrentRoom, subscribeToRoom,
}) => {
  const changeRoomhandler = (event) => {
    setCurrentRoom(event.target.value.toLowerCase());
  };

  return (
    <div>
      <div className="mt-5 form-group">
        <label htmlFor="exampleFormControlTextarea1">
          <h5>Enter Room-ID</h5>
        </label>

        <input
          value={currentRoom}
          className="form-control"
          id="room-id"
          onChange={changeRoomhandler}
        />
        <small className="form-text text-muted mb-4">
          If you're attending a workshop, it will be given to you.
        </small>
      </div>
      <button className="btn btn-primary" id="send-btn" onClick={subscribeToRoom}>
        Join Room
      </button>
    </div>
  );
};

const UserAnonymousPanelForWorry = ({
  currentRoom, trouble, setTrouble,
}) => {
  const user = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const changeTroubleHandler = (event) => {
    setTrouble(event.target.value);
  };

  const sendToStrangerHandler = () => {
    if (trouble.trim() === '') {
      return enqueueSnackbar('Please enter something!', { variant: 'error' });
    }
    if (user) {
      firestore.collection('messages').doc(currentRoom).get()
        .then((doc) => {
          if (!doc.exists) {
            throw alert('No such room!');
          } else {
            if (doc.data().status !== roomStatus.OPEN_FOR_WORRIES) {
              return enqueueSnackbar('Room is already closed!', { variant: 'error' });
            }
            return firestore.collection('messages').doc(currentRoom).update({
              anonymous: FieldValue.arrayUnion({
                trouble,
                userId: user.uid,
              }),
            });
          }
        })
        .catch((err) => console.error(err));
    } else {
      return dispatch(SHOW_MODAL());
    }
  };

  return (
    <div>
      <div className="mt-5 form-group">
        <h5>
          {`Current Room: ${currentRoom}`}
        </h5>
        <label htmlFor="exampleFormControlTextarea1">
          <h5>What's troubling you?</h5>
        </label>
        <textarea
          className="form-control"
          id="message"
          rows="3"
          value={trouble}
          onChange={changeTroubleHandler}
        />
        <small className="form-text text-muted">
          This message will be sent to a stranger as an
          anonymous message.
        </small>
      </div>
      <button className="btn btn-primary" id="send-btn" onClick={sendToStrangerHandler}>
        Send to a stranger
      </button>
    </div>
  );
};

const UserAnonymousPanelForRoomOpenWait = ({
  currentRoom,
}) => {
  return (
    <div>
      <div className="mt-5 form-group">
        <h5>
          {`Current Room: ${currentRoom}`}
        </h5>
        <small>
          Please wait while the admin opens the room for replies.
        </small>
      </div>
    </div>

  );
};

const UserAnonymousPanelForReply = ({
  currentRoom, closeReplyPanel,
}) => {
  const user = useSelector((state) => state.user);
  let messageToReplyIndex = -1;
  const [messageToReply, setmessageToReply] = useState({});

  const [reply, setReply] = useState('');

  useEffect(() => {
    let isCancelled = false;
    const userId = user.uid;
    firestore.collection('messages').doc(currentRoom).get()
      .then((doc) => {
        const anon = doc.data().anonymous;
        anon.forEach((element, index) => {
          if (element.userId === userId) {
            messageToReplyIndex = index === 0 ? anon.length - 1 : index - 1;
            if (!isCancelled) {
              setmessageToReply(anon[messageToReplyIndex]);
            }
          }
        });
      })
      .catch((err) => console.error(err));

    return () => {
      isCancelled = true;
    }
  }, []);

  const changeReplyHandler = (event) => {
    setReply(event.target.value);
  };

  const sendReplyHandler = () => {
    if (reply.trim() === '') {
      return alert('Please enter something');
    }
    firestore.collection('messages').doc(currentRoom).get()
      .then(() => {
        firestore.collection('messages').doc(currentRoom).update({
          [messageToReply.userId]: {
            reply,
            userId: user.uid,
          },
        })
          .then(() => closeReplyPanel());
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="mt-5 form-group" id="replyPanel">
        <i className="fas fa-quote-left" aria-hidden="true" />
        <p>{`Message: ${messageToReply.trouble}`}</p>
        <i className="fas fa-quote-right" aria-hidden="true" />
        <br />
        <br />
        <label htmlFor="exampleFormControlTextarea1">
          <h5>Please reply kindly to the stranger</h5>
        </label>
        <textarea
          className="form-control"
          id="message"
          rows="3"
          value={reply}
          onChange={changeReplyHandler}
        />
        <small className="form-text text-muted">
          This reply will be sent to the stranger anonymously.
        </small>
      </div>
      <button className="btn btn-primary" id="send-btn" onClick={sendReplyHandler}>
        Reply
      </button>
    </div>
  );
};

const UserAnonymousPanelForRoomCloseWait = ({
  currentRoom,
}) => {
  return (
    <div>
      <div className="mt-5 form-group">
        <h5>
          {`Current Room: ${currentRoom}`}
        </h5>
        <small>
          Please wait while we collect the replies.
        </small>
      </div>
    </div>
  );
};

const UserAnonymousPanelForFinalReply = ({
  currentRoom, trouble, finalClose, setTrouble,
}) => {
  const [reply, setReply] = useState('');
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const userId = user.uid;
    firestore.collection('messages').doc(currentRoom).get()
      .then(async (doc) => {
        doc.data().anonymous.every((worry) => {
          if (worry.userId === userId) {
            setTrouble(worry.trouble);
            return false;
          }
          return true;
        });
        if (doc.data()[userId] && doc.data()[userId].reply) {
          setReply(doc.data()[userId].reply);
        } else {
          setReply('Sorry, looks like nobody replied to your message!');
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(async () => {
    if (reply === '') {
      return;
    }
    await firestore
      .collection('users')
      .doc(user.uid)
      .collection('anonymousMessage')
      .add({
        timestamp: FieldValue.serverTimestamp(),
        question: trouble,
        answer: reply,
      });
  }, [reply]);

  return (
    <div>
      <div className="mt-5 form-group">

        <p>{`Your message: ${trouble}`}</p>

        <h5>Reply</h5>
        <i className="fas fa-quote-left" aria-hidden="true" />
        <p>{reply}</p>
        <i className="fas fa-quote-right" aria-hidden="true" />
        <br />
        <br />
      </div>
      <button className="btn btn-primary" id="send-btn" onClick={finalClose}>
        Exit
      </button>
    </div>
  );
};

const UserAnonymousPanel = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [trouble, setTrouble] = useState('');
  const [currentStatus, setCurrentStatus] = useState(roomStatus.INIT);
  const [currentRoom, setCurrentRoom] = useState('');

  const initToTroublePanel = () => {
    setCurrentStatus(roomStatus.OPEN_FOR_WORRIES);
  }

  const writeTroubleToWaitPanel = () => {
    setCurrentStatus(roomStatus.WAIT_FOR_REPLY);
  };

  const closeWaitPanel1 = () => {
    setCurrentStatus(roomStatus.OPEN_FOR_REPLIES);
  };

  const closeReplyPanel = () => {
    setCurrentStatus(roomStatus.WAIT_FOR_CLOSE);
  };

  const closeWaitPanel2 = () => {
    setCurrentStatus(roomStatus.CLOSED);
  };

  const finalClose = () => {
    setCurrentStatus(roomStatus.END);
  };

  const subscribeToRoom = () => {
    if (user) {
      firestore.collection('messages').doc(currentRoom).onSnapshot((doc) => {
        if (!doc.exists) {
          return enqueueSnackbar('Please check the Room ID', { variant: 'error' });
        }
        if (doc.data().status === roomStatus.OPEN_FOR_WORRIES) {
          initToTroublePanel();
          doc.data().anonymous.every((message) => {
            if (message.userId === user.uid) {
              writeTroubleToWaitPanel();
              return false;
            }
            return true;
          });
        } else {
          const userIndex = doc.data().anonymous.findIndex((element) => {
            return element.userId === user.uid
          });

          if (userIndex === -1) {
            return enqueueSnackbar(`You didn't join the room on time`, { variant: 'error' });
          }

          if (doc.data().status === roomStatus.OPEN_FOR_REPLIES) {
            closeWaitPanel1();
            Object.keys(doc.data()).every((repliedUID) => {
              if (doc.data()[repliedUID].userId === user.uid) {
                closeReplyPanel();
                return false;
              }
              return true;
            });
          } else if (doc.data().status === roomStatus.CLOSED) {
            closeWaitPanel2();
          }
        }
      });
    } else {
      return dispatch(SHOW_MODAL());
    }
  };

  return (
    <>
      { currentStatus === roomStatus.INIT && <UserAnonymousPanelForRoomSelection currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} subscribeToRoom={subscribeToRoom} />}
      { currentStatus === roomStatus.OPEN_FOR_WORRIES && <UserAnonymousPanelForWorry trouble={trouble} setTrouble={setTrouble} currentRoom={currentRoom} />}
      { currentStatus === roomStatus.WAIT_FOR_REPLY && <UserAnonymousPanelForRoomOpenWait currentRoom={currentRoom} />}
      { currentStatus === roomStatus.OPEN_FOR_REPLIES && <UserAnonymousPanelForReply currentRoom={currentRoom} closeReplyPanel={closeReplyPanel} />}
      { currentStatus === roomStatus.WAIT_FOR_CLOSE && <UserAnonymousPanelForRoomCloseWait currentRoom={currentRoom} />}
      { currentStatus === roomStatus.CLOSED && <UserAnonymousPanelForFinalReply currentRoom={currentRoom} finalClose={finalClose} trouble={trouble} setTrouble={setTrouble} />}
      { currentStatus === roomStatus.END && <p>Thank you for taking part with us.</p>}
    </>
  );
};

export default UserAnonymousPanel;
