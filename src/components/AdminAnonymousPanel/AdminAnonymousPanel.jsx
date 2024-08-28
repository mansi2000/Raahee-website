import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { firestore } from '../../firebase/firebase.utils';

const roomStatus = {
  INIT: 'INIT',
  OPEN_FOR_WORRIES: 'OPEN_FOR_WORRIES',
  OPEN_FOR_REPLIES: 'OPEN_FOR_REPLIES',
  CLOSED: 'CLOSED',
};

const AdminAnonymousPanelForRoomCreation = ({ createRoom, newRoomID, setNewRoomID, joinRoom }) => {
  const [rooms, setRooms] = useState([]);

  const newRoomIDHandler = (event) => {
    setNewRoomID(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const unsubscribe = firestore.collection('messages').where('status', 'in', [roomStatus.OPEN_FOR_WORRIES, roomStatus.OPEN_FOR_REPLIES]).onSnapshot((snaps) => {
      const tempRooms = [];
      snaps.docChanges().forEach((change) => {
        if (change.type === 'added' || change.type === 'modified') {
          tempRooms.push(change.doc.id);
        }
      });

      setRooms(tempRooms);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div
      className="my-auto"
    >
      <div>
        <label>
          <h5>Hello Admin, create a room</h5>
        </label>
        <input type="text" className="form-control mb-4" placeholder="Enter Room ID" value={newRoomID} onChange={newRoomIDHandler} />
      </div>
      <button className="btn btn-primary" id="create-room-btn" onClick={createRoom}>
        Create Room
      </button>
      <div>
        <label>
          <h5 className="mt-4">OR</h5>
          <h5>Select a room to continue</h5>
        </label>
        <select
          className="form-control"
          id="room-id"
          onChange={newRoomIDHandler}
          value={newRoomID}
        >
          <option value="">Select Room</option>
          {rooms.map((room) => {
            return (
              <option key={room} value={room}>{room}</option>
            );
          })}
        </select>
      </div>
      <button className="btn btn-primary" id="create-room-btn" onClick={joinRoom}>
        Join Room
      </button>
    </div>
  );
};

const AdminAnonymousPanelForViewingPeople = ({
  newRoomID, openRoomForReplies, peopleWhoPosted, setPeopleWhoPosted,
}) => {
  const [peopleOptions, setPeopleOptions] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection('messages').doc(newRoomID).onSnapshot((doc) => {
      const anon = doc.data().anonymous;
      const tempPeopleOptions = [];
      const tempPeople = [];
      anon.forEach((element) => {
        tempPeopleOptions.push(<option key={element.userId} value={element.userId}>{element.userId}</option>);
        tempPeople.push(element);
      });
      setPeopleWhoPosted(tempPeople);
      setPeopleOptions(tempPeopleOptions);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div
      className="my-auto"
    >
      <div>
        <label>
          <h5>
            Room created,
            {' '}
            {newRoomID}
          </h5>
          <small>
            {`Current people, ${peopleWhoPosted.length}`}
          </small>
        </label>
        <select className="form-control mb-4" size={Math.min(20, peopleWhoPosted.length + 1)} readOnly value="">
          {peopleOptions}
        </select>

      </div>
      <button className="btn btn-primary" id="create-room-btn" onClick={openRoomForReplies}>
        Open Room for Replies
      </button>
    </div>
  );
};

const AdminAnonymousPanelForReplies = ({
  newRoomID, peopleWhoPosted, closeRoom,
}) => {
  const user = useSelector((state) => state.user);
  const [peopleWithNoReply, setPeopleWithNoReply] = useState([]);
  const [currentPerson, setCurrentPerson] = useState('');
  const [messageToReply, setMessageToReply] = useState(undefined);
  const [reply, setReply] = useState('');

  useEffect(() => {
    const unsubscribe = firestore.collection('messages').doc(newRoomID).onSnapshot((doc) => {
      const data = doc.data();
      const peopleWithReplies = [];
      Object.keys(data).forEach((objKey) => {
        if (data[objKey].reply) {
          peopleWithReplies.push(objKey);
        }
      });

      const noReplyTemp = peopleWhoPosted.filter((e) => !peopleWithReplies.includes(e.userId));
      setPeopleWithNoReply(noReplyTemp);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const showThatPerson = (event) => {
    const val = event.target.value;
    setCurrentPerson(val);
    if (val !== '') {
      const message = peopleWhoPosted.find((e) => e.userId === val);
      setMessageToReply(message);
    } else {
      setMessageToReply(undefined);
    }
  };

  const changeReplyHandler = (event) => {
    setReply(event.target.value);
  };

  const sendReplyHandler = () => {
    if (reply.trim() === '') {
      return alert('Please enter something');
    }
    firestore.collection('messages').doc(newRoomID).get()
      .then(() => {
        firestore.collection('messages').doc(newRoomID).update({
          [messageToReply.userId]: {
            reply,
            userId: user.uid,
          },
        })
          .then(() => {
            setMessageToReply(undefined);
            setCurrentPerson('');
          });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className="my-auto"
    >
      <div>
        <label>
          <h5>
            Room opened,
            {' '}
            {newRoomID}
          </h5>
          <small>
            {`Current people who HAVE NOT received replies, ${peopleWithNoReply.length}`}
          </small>
        </label>
        <select className="form-control mb-4" size={Math.min(20, peopleWithNoReply.length + 1)} value={currentPerson} onChange={showThatPerson}>
          <option key="none" value="">Select something</option>
          {peopleWithNoReply.map((e) => <option key={e.userId} value={e.userId}>{e.userId}</option>)}
        </select>
      </div>

      <button className="btn btn-primary" id="create-room-btn" onClick={closeRoom}>
        Close Room
      </button>

      {messageToReply && (
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
      )}
    </div>
  );
};

const AdminAnonymousPanel = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [newRoomID, setNewRoomID] = useState('');
  const [currentStatus, setCurrentStatus] = useState(roomStatus.INIT);

  const [peopleWhoPosted, setPeopleWhoPosted] = useState([]);

  const createRoom = () => {
    firestore.collection('messages').doc(newRoomID).get()
      .then((doc) => {
        if (doc.exists) {
          throw enqueueSnackbar('Room already exists!', { variant: 'error' });
        } else {
          return firestore.collection('messages').doc(newRoomID).set({
            status: roomStatus.OPEN_FOR_WORRIES,
            anonymous: [],
          });
        }
      })
      .then(() => {
        joinRoom();
        roomCreationToViewingPeopleHandler();
      })
      .catch((err) => console.error(err));
  };

  const roomCreationToViewingPeopleHandler = () => {
    setCurrentStatus(roomStatus.OPEN_FOR_WORRIES);
  };

  const viewingPeopleToReplyPageHandler = () => {
    setCurrentStatus(roomStatus.OPEN_FOR_REPLIES);
  };

  const roomCloseToEndHandler = () => {
    setCurrentStatus(roomStatus.CLOSED);
    setNewRoomID('');
  };

  const joinRoom = () => {
    firestore.collection('messages').doc(newRoomID).onSnapshot((doc) => {
      if (doc.data().status === roomStatus.OPEN_FOR_WORRIES) {
        roomCreationToViewingPeopleHandler();
      } else if (doc.data().status === roomStatus.OPEN_FOR_REPLIES) {
        viewingPeopleToReplyPageHandler();
      } else if (doc.data().status === roomStatus.CLOSED) {
        roomCloseToEndHandler();
      }
    });
  };

  const openRoomForReplies = () => {
    firestore.collection('messages').doc(newRoomID).update({
      status: roomStatus.OPEN_FOR_REPLIES,
    })
      .then(() => {
        viewingPeopleToReplyPageHandler();
      })
      .catch((err) => console.error(err));
  };

  const closeRoom = () => {
    firestore.collection('messages').doc(newRoomID).update({
      status: roomStatus.CLOSED,
    })
      .then(() => {
        roomCloseToEndHandler();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {currentStatus === roomStatus.INIT && <AdminAnonymousPanelForRoomCreation createRoom={createRoom} newRoomID={newRoomID} setNewRoomID={setNewRoomID} joinRoom={joinRoom} />}
      {currentStatus === roomStatus.OPEN_FOR_WORRIES && <AdminAnonymousPanelForViewingPeople newRoomID={newRoomID} openRoomForReplies={openRoomForReplies} peopleWhoPosted={peopleWhoPosted} setPeopleWhoPosted={setPeopleWhoPosted} />}
      {currentStatus === roomStatus.OPEN_FOR_REPLIES && <AdminAnonymousPanelForReplies newRoomID={newRoomID} peopleWhoPosted={peopleWhoPosted} closeRoom={closeRoom} />}
      {currentStatus === roomStatus.CLOSED && <p>Everything is done.</p>}
    </>
  );
};

export default AdminAnonymousPanel;
