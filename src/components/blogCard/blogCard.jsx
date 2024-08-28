import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import './blogCard.scss';
import { deleteBlog } from '../../actions/blogs';

const BlogCard = (props) => {
  const user = JSON.parse(localStorage.getItem('profile'))?.user;
  const dispatch = useDispatch();
  const history = useHistory();

  let urlName = props.title.trim().toLowerCase().replace(/[\W_]+/g, '-');
  // showing up atmost 9 words in the URL
  const splitIndex = urlName.split('-', 9).join('-').length;
  urlName = urlName.slice(0, splitIndex);
  urlName += '-' + props.id;

  const date = new Date(props.published_at);

  function saveToLocal() {
    localStorage.setItem('blogDetails', JSON.stringify({ props }));
  }
  const deleteBlogCard = (event) => {
    event.stopPropagation();
    dispatch(deleteBlog(props.id));
  };

  return (
    <div
      key={props.id}
      className="blogCard"
      style={{ cursor: 'pointer', height: props.height, width: props.width }}
      onClick={() => {
        saveToLocal();
        history.push(`/blog/${urlName}`);
      }}
      role="contentinfo"
    >

      <div className="view overlay mb-4 waves-light">
        <img style={{ cursor: 'pointer', margin: '0', height: props.imgHeight }} className="img-fluid card-image" alt="blogPic" src={props.image.url} />
      </div>
      {user && user.email === process.env.REACT_APP_ADMIN_EMAIL && (
        <DeleteIcon style={{ color: 'red', cursor: 'pointer', alignSelf: 'flex-end' }} onClick={deleteBlogCard} />
      )}
      {/* <div style={{ padding: '0' }} className={'font-weight-bold mb-3' + tagColor[props.index]} onClick={TagFilter} role="contentinfo">{props.category}</div> */}
      <p className="p-title mb-2" style={{ padding: '0' }}>{props.title}</p>
      <div className="date-time-div">
        <p>
          <i className="fa fa-calendar-o" />
          {' ' + date.toDateString()}
        </p>
        <p>|</p>
        <p>
          <i className="fa fa-clock-o" />
          {' ' + Math.round(props.content.split(' ').length / 175) + ' min read'}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
