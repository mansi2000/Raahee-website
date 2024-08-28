import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { WhatsAppWidget } from 'react-whatsapp-widget';
import Skeleton from '@material-ui/lab/Skeleton';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Slider from 'react-slick';
import lottie from 'lottie-web';
import home from '../../assets/landing.png';
import phone from '../../assets/app-ss.png';
import raaheeLogo from '../../assets/RaaheeLogo.png';
import playstore from '../../assets/playstore.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './NewHomePage.scss';
import TherapistLogo from '../../assets/homepage-therapist.json';
import more from '../../assets/more.svg';
import 'react-whatsapp-widget/dist/index.css';

const NewHomePage = () => {
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
  const { blogs } = useSelector((state) => state.blogs);
  const [allBlogs, setAllBlogs] = useState([]);
  // const dispatch = useDispatch();
  // const location = useLocation();
  // useEffect(() => {
  //   if (!location) {
  //     return;
  //   }
  //   const { search } = location;
  //   dispatch(googleSignIn(search));
  // }, [location]);

  useEffect(() => {
    setAllBlogs(blogs);
  }, [blogs]);

  useEffect(async () => {
    lottie.loadAnimation({
      container: document.querySelector('#therapist-homepage'),
      animationData: TherapistLogo,
      loop: true,
    });
  }, []);

  return (
    <div className="homePage">
      <Helmet>
        <title>Raahee | Home</title>
      </Helmet>
      {/* ========================================================== */}
      <div className="container" style={{ marginTop: '80px' }}>
        {/* <div className="row justify-content-between home-landing container-fluid full-width">
          <div className="col-md-6">
            <img src={home} className="img-head img-fluid" alt="fluid" />
          </div>
          <div className="col-md-5 my-auto">
            <div className="main-heading">
              <div>
                <h1 className="landing-text">
                  Curated for all your Emotional Needs
                </h1>
                <h2 className="tagline mt-4">
                  Let's find the path to a peaceful life together
                </h2>
              </div>
            </div>
            <div className="buttons mt-5 ">
              <Link
                to="/bookSession"
                className="btn btn-secondary text-capitalize mr-3 ml-2"
                style={{ boxShadow: 'none' }}
              >
                <i className="fas fa-comment-dots mr-2" />
                Book a Session
              </Link>
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
        </div> */}
        <div className="row justify-content-between home-landing">
          <div className="col-md-6">
            <img src={home} className="img-fluid" alt="fluid" />
          </div>
          <div className="col-md-5 my-auto">
            <div className="main-heading">
              <div>
                <h1 className="landing-text">
                  Curated for all your Emotional Needs
                </h1>
                <h2 className="tagline mt-4">
                  Let's find the path to a peaceful life together
                </h2>
                <div className="buttons mt-5 ">
                  <Link
                    to="/booktherapy"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary text-capitalize mr-3 ml-2"
                    style={{ boxShadow: 'none' }}
                  >
                    <i className="fas fa-comment-dots mr-2" />
                    Book a Session
                  </Link>
                  <a
                    href="http://bit.ly/RaaheeApp"
                    target="_blank"
                    rel="noreferrer"
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
        <WhatsAppWidget phoneNumber="917048935043" />
        {/* ====================================================== */}
        {/* =================================== HACKON ======================================== */}

        {/* <div id="about" className="about-us section">
          <div className="container">
            <hr className="line-landing" size="8" width="250px" color="#D4C0E2" />
            <div className="row">
              <div className="col-lg-4">
                <div className="left-text" style={{ padding: '50px' }}>
                  <h4>Our platform is specially designed to ensure your mental well being.</h4>
                </div>
              </div>
              <div className="col-lg-8 align-self-center">
                <div className="services">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="item wow fadeIn">
                        <div className="icon">
                          <img src={img1} alt="reporting" />
                        </div>
                        <div className="right-text">
                          <h4>Help your mind to relax</h4>
                          <p>Relax yourself, free your mind and channelize your emotions with us.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="item wow">
                        <div className="icon">
                          <img src={img2} alt="" />
                        </div>
                        <div className="right-text">
                          <h4>Affordable professional help</h4>
                          <p>No need to worry about searching for the right therapist, you get it all in one place</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="item wow">
                        <div className="icon">
                          <img src={img3} alt="" />
                        </div>
                        <div className="right-text">
                          <h4>Join our community</h4>
                          <p>Every emotion is valued here.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="item wow">
                        <div className="icon">
                          <img src={img3} alt="" />
                        </div>
                        <div className="right-text">
                          <h4>Participate in our workshops</h4>
                          <p>Unwind and de-stress with us.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="line-landing" size="8" width="250px" color="#D4C0E2" />
          </div>
        </div>
        */}
        { /* =================================MOBILE APPLICATION======================================== */}

        <div id="contact" className="contact-us section">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 align-self-center mr-0 pr-md-0 mt-md-3">
                <div className="section-heading ml-4 pr-md-3 ml-md-4">
                  <h2>A safe space for you</h2>
                  <p>Using our app, you can keep a track of your emotions and keep a check on your mental health.</p>
                  <div className="main-heading mb-5">
                    <div className="app-features my-lg-4 my-md-2 pl-0">
                      <p className="mb-2 color-gray">
                        <ArrowRightIcon />
                        {' '}
                        Affordable sessions with therapists
                      </p>
                      <p className="mb-2 color-gray">
                        <ArrowRightIcon />
                        {' '}
                        Extensive Library of resources
                      </p>
                      <p className="mb-2 color-gray">
                        <ArrowRightIcon />
                        {' '}
                        Meditation and venting features
                      </p>
                      <p className="mb-2 color-gray">
                        <ArrowRightIcon />
                        {' '}
                        Community as close knit as a family
                      </p>
                      <p className="mb-2 color-gray">
                        <ArrowRightIcon />
                        {' '}
                        Mood trackers and guided journaling
                      </p>
                    </div>
                  </div>
                  <a href="http://bit.ly/RaaheeApp" target="_blank" rel="noreferrer">
                    <img src={playstore} alt="Download from Google PlayStore" />
                  </a>
                </div>
              </div>
              <div className="col-lg-5 phone pl-md-0">
                <img className="phone-image img-fluid" src={phone} alt="fluid" />
              </div>
            </div>
          </div>
        </div>
        {/* ===========================MOBILE APPLICATION END================================= */}
        <br />
        <br />
        <hr className="line-landing" size="8" width="250px" color="#D4C0E2" />
        {/* ===========================THERAPY================================= */}
        <div className="d-md-flex h-md-100 align-items-center">
          <div className="col-md-6 p-0 bg-indigo h-md-100">
            <div className="text-white d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
              <div className="logoarea pt-5 pb-5">
                <div id="therapist-homepage" />
              </div>
            </div>
          </div>
          <div className="col-md-6 pr-md-4 h-md-100 consultText">
            <h2>Consult with the best psychologists at affordable prices</h2>
            <p className="sample mt-3">We have expert Mental health professionals who will help you in your mental health journey.</p>
            <div className="buttons mt-5">
              <Link
                to="/therapists"
                className="btn btn-secondary text-capitalize mr-md-3"
                style={{ boxShadow: 'none' }}
              >

                Browse Our Therapists
              </Link>
              <Link
                to="/booktherapy"
                className="btn border border-secondary text-secondary text-capitalize"
                style={{ boxShadow: 'none' }}
              >
                <i className="fas fa-comment-dots mr-2" />
                Book A Session
              </Link>
            </div>
          </div>
        </div>
        {/* ===========================THERAPY END================================= */}
        <br />
        <hr className="line-landing" size="8" width="250px" color="#D4C0E2" />
        {/* ===========================CAROUSEL================================= */}

        <Slider {...settings}>
          <div className="hackon my-5">
            <div className="row hackon-row">
              <div className="col-md-5 hackon-column">
                <img src={raaheeLogo} alt="Logo" className="logo-carousel" />
                {/* <svg
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
                </svg> */}

                <p className="hackon-column-text">RAAHEE</p>
                {/* <img src={messages} className="img-fluid mb-3" alt="fluid" /> */}
              </div>
              <div className="col-md-1" />
              <div className="col-md-5 my-auto text-left">
                <p className="display-4 hackon-text">
                  If you are a therapist, psychologist, or a mental health professional, you can partner with us.
                </p>
                <div className="hackon-center">
                  <a
                    href="https://forms.gle/Azmyyyb74CF4HTyk6"
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
              <div className="col-md-5 hackon-column">
                <img src={raaheeLogo} alt="Logo" className="logo-carousel" />

                <p className="hackon-column-text">RAAHEE</p>
                {/* <img src={messages} className="img-fluid mb-3" alt="fluid" /> */}
              </div>
              <div className="col-md-1" />
              <div className="col-md-5 my-auto text-left">
                <p className="display-4 hackon-text">
                  If you want to learn how to advocate for mental health the right way, join our Mental Health Advocate Program
                </p>
                <div className="hackon-center">
                  <a
                    href="https://forms.gle/D8JTdVT2Uqr2bMdW8"
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
                <img src={raaheeLogo} alt="Logo" className="logo-carousel" />

                <p className="hackon-column-text">RAAHEE</p>
                {/* <img src={messages} className="img-fluid mb-3" alt="fluid" /> */}
              </div>
              <div className="col-md-1" />
              <div className="col-md-5 my-auto text-left">
                <p className="display-4 hackon-text">
                  Want to know more about mental health disorders, issues and tips to have a better mental health, follow us on -
                </p>
                <div className="hackon-center">
                  <a
                    href="https://www.instagram.com/raahee.mentalhealth/"
                    type="button"
                    className="btn mt-4 hackon-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Follow
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hackon my-5">
            <div className="row hackon-row">
              <div className="col-md-5 hackon-column">
                <img src={raaheeLogo} alt="Logo" className="logo-carousel" />

                <p className="hackon-column-text">RAAHEE</p>
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
              <div className="col-md-1" />
            </div>
          </div>
        </Slider>

        {/* ============================CAROUSEL END================================ */}
        <br />
        <br />
        <br />

        {/* ===========================BLOGS================================= */}

        <br />
        <br />
        <br />
        <div className="row mb-3 justify-content-center" id="blogs">
          {allBlogs.length > 0
            ? allBlogs.slice(0, 3).map((blog) => {
              return (
                <div key={blog.id} className="col-md-4 card-deck">
                  <div className="card card-cascade narrower mb-4">
                    <div className="view view-cascade overlay">
                      <img
                        className="card-img-top"
                        src={blog.image.url}
                        alt="Card cap"
                      />
                      <i>
                        <div className="mask rgba-white-slight" />
                      </i>
                    </div>
                    <div className="card-body card-body-cascade d-flex flex-column">
                      <h5 className="pink-text pb-2 pt-1">{blog.category}</h5>
                      <h4 className="font-weight-bold card-title">
                        {blog.title}
                      </h4>
                      <p className="card-text">{blog.summary}</p>
                      <Link
                        className="btn btn-secondary mr-3 ml-2 mt-auto"
                        style={{ boxShadow: 'none' }}
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
        {allBlogs.length > 0 && (
          <div className="text-center">
            <Link type="button" className="btn btn-secondary mb-4" style={{ boxShadow: 'none' }} to="/blog">
              View More
              <i className="fas fa-arrow-right" />
            </Link>
          </div>
        )}
        {/* {======================BLOGS END=============================} */}
        <br />
        {/* <section className="endingSection">
          <div className="container1">
            <img className="wave-landing" src={wavesvg} alt="" />
            <div className="centered">
              <div className="text">Every emotion is valid.</div>
              <div className="text">Your mental health is our priority.</div>
              <button className="btn btn-secondary">
                <a
                  href="http://bit.ly/RaaheeApp"
                  style={{ textDecoration: 'none', color: '#fff' }}
                >
                  Get the App
                </a>
              </button>
            </div>
          </div>
        </section> */}

      </div>
    </div>
  );
};

export default NewHomePage;
