import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import Slider from 'react-slick';
import home from '../../assets/landing.png';
import app from '../../assets/app-ss.png';
import appCircle from '../../assets/Ellipse.png';
import more from '../../assets/more.svg';
import dslogo from '../../assets/Ds-Logo.png';
import { firestore } from '../../firebase/firebase.utils';
import meditate2 from '../../assets/meditate2.jpg';
import messages from '../../assets/messages.jpg';
import worry from '../../assets/worry-tree.jpg';
import playstore from '../../assets/playstore.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './homePage.scss';

// function SampleArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       role="button"
//       style={{ ...style, display: 'block', color: 'green' }}
//       onClick={onClick}
//     />
//   );
// }

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: 'linear',
    arrows: false,
  };

  const [blogs, setBlogs] = useState([]);
  useEffect(async () => {
    const blogs = await firestore
      .collection('blogs')
      .orderBy('created', 'desc')
      .limit(3)
      .get();
    if (blogs) {
      setBlogs(
        blogs.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { ...data, id };
        }),
      );
    }
  }, []);

  return (
    <div className="homePage">
      <Helmet>
        <title>Raahee | Home</title>
      </Helmet>
      {/* ========================================================== */}
      <div className="container" style={{ marginTop: '80px' }}>
        <div className="row justify-content-between home-landing">
          <div className="col-md-6">
            <img src={home} className="img-fluid" alt="fluid" />
          </div>
          <div className="col-md-5 my-auto">
            <div className="main-heading">
              <div>
                <h1 className="landing-text">
                  Let Raahee be your buddy for every step you take ahead !!
                </h1>
                <h2 className="tagline mt-4">
                  Find your path to a better life
                </h2>
                <div className="buttons mt-5">
                  <a
                    href="http://bit.ly/RaaheeApp"
                    className="btn border border-secondary text-secondary text-capitalize"
                    style={{ boxShadow: 'none' }}
                  >
                    <img src={more} alt="Raahee App" className="mr-3 mt-n2" />
                    Get Raahee App
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ====================================================== */}
        {/* <div className="card my-5" id="activities">
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-5 my-auto text-left">
              <p className="display-4 main-2">
                Vent out about whatever is disturbing you right now and then
                meditate for 20 seconds with us to calm your mind.
              </p>
              <div className="center">
                <Link
                  type="button"
                  className="btn aqua-gradient"
                  to="/meditation"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <img src={meditate2} className="img-fluid mb-3" alt="fluid" />
            </div>
          </div>
        </div> */}
        {/* ============================== */}
        {/* <div className="card my-5">
          <div className="row">
            <div className="col-md-6">
              <img src={messages} className="img-fluid mb-3" alt="fluid" />
            </div>
            <div className="col-md-5 my-auto text-left">
              <p className="display-4 main-2">
                <b>Anonymous Messages! </b>
                Write your most heartfelt problem anonymously, and let someone
                else answer it anonymously, the best part, the person answering
                your problem won't know about you, and you won't
                know about them.
              </p>
              <div className="center">
                <Link
                  to="/anonymousMessage"
                  type="button"
                  className="btn aqua-gradient mb-4"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="col-md-1" />
          </div>
        </div> */}
        {/* ======================================================== */}
        {/* <div className="card my-5 py-4">
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-5 my-auto text-left">
              <p className="display-4 main-2">
                <b>Worry Tree </b>
                is a famous technique where you decide if there is something you
                can do about your worry or not. Dive in with your worry and come
                out with a simple solution, decided by you. Sounds simple? It is
                simple.
              </p>
              <div className="center">
                <Link
                  to="/worryTree"
                  type="button"
                  className="btn aqua-gradient mb-4"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src={worry}
                className="img-fluid"
                alt="fluid"
              />
            </div>
          </div>
        </div> */}

        {/* ============================================================ */}
        <div
          className="row justify-content-between"
          style={{ marginTop: '7rem', marginBottom: '7rem' }}
        >
          <div className="col-md-12 col-lg-7 app-left">
            <img
              src={appCircle}
              className="img-fluid app-circle ml-lg-5 mt-lg-5 ml-md-0"
              alt="fluid"
            />
            <div className="row justify-content-center app-image">
              <img src={app} className="img-fluid" alt="fluid" />
            </div>
          </div>
          <div className="col-lg-4 col-md-12 my-auto">
            <div className="main-heading mb-5">
              <div>
                <h2 className="app-text mt-3">Get the Raahee App</h2>
                <ul className="app-features my-lg-4 my-md-2 pl-0">
                  <li className="mb-2">
                    Affordable sessions with verified therapists
                    {' '}
                  </li>
                  <li className="mb-2">Extensive Library of resources </li>
                  <li className="mb-2">Meditation and venting features </li>
                  <li className="mb-2">Community as close knit as a family </li>
                  <li className="mb-2">Mood trackers and guided journaling </li>
                </ul>
              </div>
            </div>
            <a href="http://bit.ly/RaaheeApp" target="_blank" rel="noreferrer">
              <img src={playstore} alt="Download from Google PlayStore" />
            </a>
          </div>
        </div>

        {/* =================================== HACKON ======================================== */}

        <Slider {...settings}>
          <div className="hackon my-5">
            <div className="row hackon-row">
              <div className="col-md-5 hackon-column">
                <svg
                  width="85"
                  height="70"
                  viewBox="0 0 105 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M52.4991 101L96.1061 54.8843C101.84 48.8204 104.998 40.7478 104.998 32.1509C104.998 23.554 101.84 15.4812 96.1061 9.41755C90.3647 3.34408 82.7313 0.000228218 74.6094 0.000228218C67.3775 0.000228218 60.3132 2.84127 54.6511 8.06919L52.4991 10.1989L50.277 8.00297C44.6849 2.84082 37.6225 0 30.3887 0C22.2669 0 14.6332 3.34363 8.89206 9.41732C3.15806 15.4812 0 23.5538 0 32.1507C0 40.7476 3.15806 48.8222 8.89185 54.8841L52.4991 101Z"
                    fill="#FF877F"
                  />
                  <path
                    d="M95.7365 54.8841L74.9991 77.5C35 54.8841 41.4894 19.4241 50.3102 10.1987L52.5521 8.06896C58.4504 2.84105 65.8094 0 73.343 0C81.8037 0 89.7556 3.34386 95.7365 9.41733C101.71 15.481 104.999 23.5538 104.999 32.1507C104.999 40.7476 102.499 47.6945 95.7365 54.8841Z"
                    fill="#FDC858"
                  />
                </svg>

                <p className="hackon-column-text">Raahee</p>
                {/* <img src={messages} className="img-fluid mb-3" alt="fluid" /> */}
              </div>
              <div className="col-md-1" />
              <div className="col-md-5 my-auto text-left">
                <p className="display-4 hackon-text">
                  Raahee is coming up with
                  {' '}
                  <b>Relax with Raahee</b>
                  {' '}
                  filled with interactive conversations along with fun and relaxing activities.
                </p>
                <div className="hackon-center">
                  <a
                    href="https://raahee.in/event/relax-with-raahee-nsvvm9"
                    type="button"
                    className="btn mt-4 hackon-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register
                  </a>
                </div>
              </div>
              {/* <div className="col-md-1" /> */}
            </div>
          </div>

          <div className="hackon my-5 ">
            <div className="row hackon-row">
              <div className="col-md-5 hackon-column hackon-column-left">
                <img className="hackon-column-logo" src={dslogo} alt="fluid" />
              </div>
              <div className="col-md-1" />
              <div className="col-md-5 my-auto text-left">
                <p className="display-4 hackon-text">
                  We’re partnering with Design Sundays for a fundraiser to save
                  lives impacted by COVID 19, to be held on 15-16th May.
                </p>
                <div className="hackon-center">
                  <a
                    href="https://oxygen.designsundays.in/"
                    type="button"
                    className="btn mt-4 hackon-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hackon my-5 card">
            <div className="row hackon-row">
              <div className="col-md-5 hackon-column">
                <svg
                  width="175"
                  height="172"
                  className="hackon-image"
                  viewBox="0 0 175 172"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M110.887 153.08C108.486 153.08 106.09 152.843 103.737 152.371C101.455 151.912 99.224 151.231 97.0779 150.34C94.9682 149.462 92.95 148.385 91.0514 147.125C89.1676 145.873 87.4097 144.447 85.8014 142.867C84.1937 141.286 82.743 139.558 81.4691 137.707C80.1868 135.841 79.0914 133.857 78.1983 131.784C77.2913 129.674 76.5989 127.482 76.1312 125.239C75.6513 122.926 75.4097 120.571 75.4102 118.211C75.4096 115.851 75.6512 113.497 76.1312 111.184C76.5988 108.94 77.2912 106.748 78.1983 104.638C79.0913 102.565 80.1866 100.581 81.4691 98.7155C82.7428 96.8636 84.1935 95.1355 85.8014 93.5547C87.4095 91.9745 89.1675 90.5489 91.0514 89.2973C92.9498 88.0366 94.9681 86.9598 97.0779 86.082C97.57 85.8774 98.0738 85.6813 98.5753 85.499V98.1596C91.3419 102.476 87.0235 110.001 87.0235 118.289C87.0235 131.265 97.7645 141.822 110.967 141.822C124.169 141.822 134.91 131.265 134.91 118.289C134.91 110.019 130.605 102.502 123.394 98.1807V85.5703C123.832 85.7323 124.27 85.9045 124.697 86.082C126.806 86.9596 128.825 88.0365 130.723 89.2973C132.607 90.5488 134.365 91.9744 135.973 93.5547C137.581 95.1354 139.031 96.8635 140.305 98.7155C141.587 100.581 142.683 102.565 143.576 104.638C144.483 106.748 145.175 108.94 145.643 111.184C146.123 113.497 146.364 115.851 146.364 118.211C146.364 120.571 146.123 122.926 145.643 125.239C145.175 127.482 144.483 129.674 143.576 131.784C142.683 133.857 141.587 135.841 140.305 137.707C139.031 139.559 137.581 141.286 135.973 142.867C134.365 144.447 132.607 145.873 130.723 147.125C128.824 148.385 126.806 149.462 124.697 150.34C122.551 151.231 120.32 151.912 118.037 152.371C115.684 152.843 113.289 153.08 110.887 153.08Z"
                    fill="white"
                  />
                  <path
                    d="M118.62 102.229V69.3924C118.62 68.0107 117.48 66.8906 116.075 66.8906H105.575C104.169 66.8906 103.029 68.0107 103.029 69.3924V102.229C103.029 103.611 104.169 104.731 105.575 104.731H116.075C117.48 104.731 118.62 103.611 118.62 102.229Z"
                    fill="#E58AB2"
                  />
                  <path
                    d="M75.2357 83.3417C74.8559 83.3417 74.4917 83.1935 74.2232 82.9296C73.9547 82.6656 73.8039 82.3077 73.8039 81.9345V56.5357H39.7881V81.9345C39.7881 82.3077 39.6373 82.6656 39.3688 82.9296C39.1002 83.1935 38.736 83.3417 38.3563 83.3417H30.2277C29.848 83.3417 29.4837 83.1935 29.2152 82.9296C28.9467 82.6656 28.7959 82.3077 28.7959 81.9345V20.3272C28.7959 19.954 28.9467 19.596 29.2152 19.3321C29.4837 19.0682 29.848 18.9199 30.2277 18.9199H38.356C38.7357 18.9199 39.0999 19.0682 39.3685 19.3321C39.637 19.596 39.7878 19.954 39.7878 20.3272V45.726H73.8036V20.3272C73.8036 19.954 73.9544 19.596 74.2229 19.3321C74.4914 19.0682 74.8556 18.9199 75.2354 18.9199H83.3641C83.7438 18.9199 84.1081 19.0682 84.3766 19.3321C84.6451 19.596 84.7959 19.954 84.7959 20.3272V81.9345C84.7959 82.3077 84.6451 82.6656 84.3766 82.9296C84.1081 83.1935 83.7438 83.3417 83.3641 83.3417H75.2357Z"
                    fill="white"
                  />
                </svg>
                {/* <img src={messages} className="img-fluid mb-3" alt="fluid" /> */}
              </div>
              <div className="col-md-1" />
              <div className="col-md-5 my-auto text-left">
                <p className="display-4 hackon-text">
                  If you want to build and innovate a mental health solution,
                  join us at HackOn 2.0 !
                </p>
                <div className="hackon-center">
                  <a
                    href="https://hackon.tech/"
                    type="button"
                    className="btn mt-4 hackon-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hackon my-5">
            <div className="row hackon-row">
              <div className="col-md-5 hackon-column">
                <svg
                  width="85"
                  height="70"
                  viewBox="0 0 105 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M52.4991 101L96.1061 54.8843C101.84 48.8204 104.998 40.7478 104.998 32.1509C104.998 23.554 101.84 15.4812 96.1061 9.41755C90.3647 3.34408 82.7313 0.000228218 74.6094 0.000228218C67.3775 0.000228218 60.3132 2.84127 54.6511 8.06919L52.4991 10.1989L50.277 8.00297C44.6849 2.84082 37.6225 0 30.3887 0C22.2669 0 14.6332 3.34363 8.89206 9.41732C3.15806 15.4812 0 23.5538 0 32.1507C0 40.7476 3.15806 48.8222 8.89185 54.8841L52.4991 101Z"
                    fill="#FF877F"
                  />
                  <path
                    d="M95.7365 54.8841L74.9991 77.5C35 54.8841 41.4894 19.4241 50.3102 10.1987L52.5521 8.06896C58.4504 2.84105 65.8094 0 73.343 0C81.8037 0 89.7556 3.34386 95.7365 9.41733C101.71 15.481 104.999 23.5538 104.999 32.1507C104.999 40.7476 102.499 47.6945 95.7365 54.8841Z"
                    fill="#FDC858"
                  />
                </svg>

                <p className="hackon-column-text">Raahee</p>
                {/* <img src={messages} className="img-fluid mb-3" alt="fluid" /> */}
              </div>
              <div className="col-md-1" />
              <div className="col-md-5 my-auto text-left">
                <p className="display-4 hackon-text">
                  Be a part of Team Raahee and work at an emerging start up, skill up and contribute to a social cause.
                </p>
                <div className="hackon-center">
                  <a
                    href="https://bit.ly/WorkAtRaahee"
                    type="button"
                    className="btn mt-4 hackon-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply
                  </a>
                </div>
              </div>
              {/* <div className="col-md-1" /> */}
              <div className="col-md-1" />
            </div>
          </div>
        </Slider>

        <Slider
          style={{ marginBottom: '60px', marginTop: '20px' }}
          {...settings}
        >
          <div className="card small-card my-5">
            <div className="row">
              <div className="col-md-1" />
              <div className="col-md-5 my-auto text-left">
                <p className="display-4 main-2">
                  Vent out about whatever is disturbing you right now and then
                  meditate for 20 seconds with us to calm your mind.
                </p>
                <div className="center">
                  <Link
                    type="button"
                    className="btn aqua-gradient"
                    to="/meditation"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <img
                  src={meditate2}
                  className="img-fluid mb-3 mt-10"
                  alt="fluid"
                />
              </div>
            </div>
          </div>
          {/* ============================== */}
          <div className="card small-card my-5">
            <div className="row">
              <div className="col-md-6">
                <img src={messages} className="img-fluid mb-3" alt="fluid" />
              </div>
              <div className="col-md-5 my-auto text-left">
                <p className="display-4 main-2">
                  <b>Anonymous Messages! </b>
                  Write your most heartfelt problem anonymously, and let someone
                  else answer it anonymously, the best part, the person
                  answering your problem won't know about you, and you won't
                  know about them.
                </p>
                <div className="center">
                  <Link
                    to="/anonymousMessage"
                    type="button"
                    className="btn aqua-gradient mb-4"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="col-md-1" />
            </div>
          </div>
          {/* ======================================================== */}
          <div className="card small-card my-5 py-4">
            <div className="row">
              <div className="col-md-1" />
              <div className="col-md-5 my-auto text-left">
                <p className="display-4 main-2">
                  <b>Worry Tree </b>
                  is a famous technique where you decide if there is something
                  you can do about your worry or not. Dive in with your worry
                  and come out with a simple solution, decided by you. Sounds
                  simple? It is simple.
                </p>
                <div className="center">
                  <Link
                    to="/worryTree"
                    type="button"
                    className="btn aqua-gradient mb-4"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <img src={worry} className="img-fluid" alt="fluid" />
              </div>
            </div>
          </div>
        </Slider>

        {/* ============================================================ */}
        <div className="row mb-3 justify-content-center" id="blogs">
          {blogs.length > 0
            ? blogs.map((blog) => {
              return (
                <div key={blog.id} className="col-md-4 card-deck">
                  <div className="card card-cascade narrower mb-4">
                    <div className="view view-cascade overlay">
                      <img
                        className="card-img-top"
                        src={blog.imageurl}
                        alt="Card cap"
                      />
                      <i>
                        <div className="mask rgba-white-slight" />
                      </i>
                    </div>
                    <div className="card-body card-body-cascade">
                      <h5 className="pink-text pb-2 pt-1">{blog.tag}</h5>
                      <h4 className="font-weight-bold card-title">
                        {blog.title}
                      </h4>
                      <p className="card-text">{blog.summary}</p>
                      <Link
                        className="btn aqua-gradient"
                        target="_blank"
                        rel="noreferrer"
                        to={'/blog/' + blog.id}
                      >
                        Read
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
            : [1, 2, 3].map((e) => {
              return (
                <div key={e} className="col-md-4">
                  <div className="card card-cascade narrower">
                    <div className="view view-cascade overlay">
                      <Skeleton variant="rect" height="30vh" />
                    </div>
                    <div className="card-body card-body-cascade">
                      <Skeleton
                        variant="rect"
                        className="pink-text pb-2 pt-1"
                      />
                      <br />
                      <Skeleton
                        variant="rect"
                        className="font-weight-bold card-title"
                      />
                      <Skeleton
                        variant="rect"
                        height={118}
                        className="card-text"
                      />
                      <Skeleton
                        variant="rect"
                        height={30}
                        width={60}
                        className="btn btn-default"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <br />
        {blogs.length > 0 && (
          <div className="text-center">
            <Link type="button" className="btn btn-secondary mb-4" to="/blog">
              View More
              <i className="fas fa-arrow-right" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
