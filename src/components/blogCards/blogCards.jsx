import React from 'react';
import './blogCards.scss';
import greyarrow from '../../assets/greyArrow.svg';

const BlogCards = ({ source, text }) => {
  return (
    <div className="blogcards">
      <img
        style={{ opacity: 0.9, height: '270px' }}
        className="img-fluid "
        src={source}
        alt=""
      />
      <div className="blogcards__text d-flex">
        <h3 className="">{text}</h3>
        <div className="blogcards__circle">
          <img className="blogcards__circle__arrow" src={greyarrow} alt="" />
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
