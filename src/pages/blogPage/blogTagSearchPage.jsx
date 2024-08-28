import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BlogCard from '../../components/blogCard/blogCard';
import './blogPage.scss';

const blogTagSearchPage = () => {
  const { blogs } = useSelector((state) => state.blogs);

  const query = useQuery();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  function Child({ name }) {
    return (
      <div>
        {name ? (
          <div className="container text-center my-5 row mx-auto">
            {blogs.filter((blog) => blog.category === name).sort((a, b) => {
              return (a.createdAt < b.createdAt) ? 1 : -1;
            }).map((blog, index) => (

              <BlogCard key={index} index={index % 3} {...blog} />

            ))}
          </div>
        ) : (
          <h3 className="text-center">Select a Tag to show results.</h3>
        )}
      </div>
    );
  }
  return (
    <div>
      <div className="container" style={{ paddingTop: '5.8rem' }}>
        <section className="text-center my-5">
          <h2 className="h1-responsive font-weight-bold my-5">
            TagSearch Posts
          </h2>
        </section>
      </div>
      <Child name={query.get('tag')} />
    </div>
  );
};

export default blogTagSearchPage;
