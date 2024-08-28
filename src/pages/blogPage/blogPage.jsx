import React from 'react';
import { Helmet } from 'react-helmet';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector } from 'react-redux';
import 'react-alice-carousel/lib/alice-carousel.css';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import BlogCard from '../../components/blogCard/blogCard';
import './blogPage.scss';

const BlogPage = (props) => {
  const user = JSON.parse(localStorage.getItem('profile'))?.user;
  const { blogs } = useSelector((state) => state.blogs);

  function makeGroups() {
    let blog1 = {};
    let blog2 = {};
    if (blogs.length === 1) {
      blog1 = blogs[0];
    } else {
      blog1 = blogs[0];
      blog2 = blogs[1];
    }
    const blogGroup = [];
    const blogCategories = [];
    for (let i = 0; i < blogs.length; i += 1) {
      const category = blogs[i].category;
      const group = [];
      while (i < blogs.length && blogs[i].category === category) {
        group.push(<BlogCard key={i} {...blogs[i]} height="auto" width="300px" imgHeight="13rem" />);

        if (blogs[i].likes.length > blog1.likes.length) {
          blog2 = blog1;
          blog1 = blogs[i];
        } else if (blogs[i].likes.length > blog2.likes.length) {
          // 1 edge case to be included
          blog2 = blogs[i];
        }

        i += 1;
      }
      i -= 1;
      if (group.length > 0) {
        const divId = category.replace(/ /g, '');
        blogCategories.push(<a key={blogs[i].id} className="category-top" href={'#' + divId}>{category}</a>);
        const temp = (
          <div key={blogs[i].id} className="corousel-div" id={divId}>
            <p className="blog-category">{category}</p>
            <ScrollingCarousel>
              {group}
            </ScrollingCarousel>
          </div>
        );
        blogGroup.push(temp);
      }
    }

    const retItem = (
      <div className="wrapper-div">
        <div className="likes-div">
          <div className="like-div">
            <BlogCard key={blog1.id} {...blog1} height="auto" width="100%" imgHeight="60vh" />
          </div>
          <div className="like-div liked-2">
            <BlogCard key={blog2.id} {...blog2} height="auto" width="100%" imgHeight="60vh" />
          </div>
        </div>
        <div className="category-div">
          {blogCategories}
        </div>
        <div className="blogsdiv">
          {blogGroup}
        </div>
      </div>
    );
    return retItem;
  }

  return (
    <div className="BlogPage">
      <Helmet>
        <title>Raahee | Blogs</title>
      </Helmet>
      {user?.email === process.env.REACT_APP_ADMIN_EMAIL && (
        <div className="admin-div">
          <button
            onClick={() => props.history.push('/adminBlog')}
          >
            Add Blog
          </button>
        </div>
      )}
      <div>
        {blogs.length > 0 ? makeGroups() : [0, 1, 2].map((e) => {
          return (
            <div
              key={e}
              className="blogCard col-lg-4 col-md-12 mb-lg-0 mb-4"
              style={{ padding: '0 20px' }}
            >
              {/* <div className="view overlay rounded z-depth-2 mb-4 waves-light"> */}
              <Skeleton variant="rect" height="22rem" className="img-fluid card-image" />
              <Skeleton variant="text" className="font-weight-bold mb-3" style={{ marginTop: '1rem' }} />
              <Skeleton variant="rect" className="font-weight-bold mb-2" />
              <Skeleton variant="rect" height="10rem" className="dark-grey-text" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPage;
