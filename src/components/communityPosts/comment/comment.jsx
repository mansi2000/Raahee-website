import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { firestore } from '../../../firebase/firebase.utils';

const Comment = ({
  content,
  userId,
}) => {
  const [Name, setName] = useState('Anonymous');

  useEffect(() => {
    firestore.collection('users').doc(userId).get()
      .then((doc) => {
        if (doc.data() && doc.data().displayName) setName(doc.data().displayName);
        else setName('Anonymous');
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <li>
      <div className="float-child-1 ">
        <Avatar aria-label="recipe" style={{ backgroundColor: 'purple' }}>
          {Name[0].toUpperCase()}
        </Avatar>
        {/* <img
                        src={comment.imageURL ? comment.imageURL : 'https://i.pravatar.cc/100'}
                        height="40rem"
                        width="40rem"
                        className="d-block mr-1 rounded-circle user-image"
                        alt=""
                      /> */}
      </div>
      <div className="float-child-2 ">
        <h6 className="written-post mrg">{Name.charAt(0).toUpperCase() + Name.slice(1)}</h6>
        <p>{content}</p>
      </div>
    </li>
  );
};

export default Comment;
