import React from 'react';
import { Helmet } from 'react-helmet';
import home from '../../assets/landing.png';
import incubator from '../../assets/incubator.jpg';
import nasscom from '../../assets/nasscom.jpg';
import profileimage from '../../assets/profileimage.png';
import img1 from '../../assets/img1.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';
// import img4 from '../../assets/img4.png';
import phone from '../../assets/phone.jpg';
import wavesvg from '../../assets/wavesvg.png';
import moving from '../../assets/moving.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './landingPage.scss';

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
const LandingPage = () => {
  return (
    <div className="landingPage">
      <Helmet>
        <title>Raahee</title>
      </Helmet>
      {/* ========================================================== */}
      <div className="container-fluid" style={{ marginTop: '80px' }}>
        <div className="row justify-content-between home-landing" style={{ backgroundColor: '#BCA0DC' }}>
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
              </div>
            </div>
          </div>
        </div>
        {/* ============================================================ */}
        <div>
          <div className="container">
            {/* <br />
            <br />
            <br />
            <br /> */}
            <p className="f-heading">Features</p>
          </div>
          <img className="f-img" alt="" src={moving} />
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <p className="f-head">Relax</p>
                <p className="f-body" style={{ textAlign: 'left' }}>
                  Participate in our stress relieving activities, calming workshops & meditation sessions to calm your mind.
                </p>
              </div>
              <div className="col-md-4">
                <p className="f-head" style={{ textAlign: 'center' }}>Release</p>
                <p className="f-body">
                  Unfold your emotions in our worry tree, send out or recieve an anonymous message from the universe or vent it out in our community section.
                </p>
              </div>
              <div className="col-md-4">
                <p className="f-head" style={{ textAlign: 'right' }}>Resolve</p>
                <p className="side f-body" style={{ textAlign: 'right' }}>
                  Professional help is just a click away with us. Go to the therapists section and book a session with a therapist.
                </p>
              </div>
            </div>
            <hr className="line-landing" size="8" width="250px" color="#D4C0E2" />
          </div>
        </div>
        {/* ============================================================ */}
        <div className="container">
          <div
            className="row justify-content-between "
            style={{ marginBottom: '7rem', backgroundColor: '#ffffff' }}
          >
            <div className="col-md-12 col-lg-7 app-left">
              <img
                src={incubator}
                className="img-fluid app-circle ml-lg-5 mt-lg-5 ml-md-0"
                alt="fluid"
              />
            </div>
            <div className="col-lg-4 col-md-12 my-auto">
              <div className="main-heading mb-5">
                <div>
                  <img
                    src={nasscom}
                    className="img-fluid app-circle mt-lg-5 img-nascom"
                    alt="fluid"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className="line-landing" size="8" width="250px" color="#D4C0E2" />
        </div>
        {/* ===================================last second section======================================== */}
        <div id="about" className="about-us section">
          <div className="container">
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
        { /* =================================section======================================== */}
        <div className="container">
          <br />
          <br />
          <br />
          <p className="a-head">Milestones</p>

          <div className="row">
            <div className="col-md-4">
              <div className="a-card card">
                <div className="card-body">
                  <div className="a-c-try">
                    <p className="a-c-head">10+</p>
                    <p className="a-c-body">Therapists</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="a-card card">
                <div className="card-body">
                  <div className="a-c-try">
                    <p className="a-c-head">700+</p>
                    <p className="a-c-body">Active Users</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="a-card card">
                <div className="card-body">
                  <div className="a-c-try">
                    <p className="a-c-head">50+</p>
                    <p className="a-c-body">Successful Events</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <hr className="line-landing" size="8" width="250px" color="#D4C0E2" />
        </div>
        { /* =================================section======================================== */}
        <div className="d-md-flex h-md-100 align-items-center">
          <div className="col-md-6 p-0 bg-indigo h-md-100">
            <div className="text-white d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
              <div className="logoarea pt-5 pb-5">
                <img className="img-fluid" src={profileimage} alt="fluid" />
              </div>
            </div>
          </div>
          <div className="col-md-6 p-0 bg-white h-md-100 consultText">
            <h2>Consult with the best phychologists at affordable prices</h2>
            <p className="sample">We have number of Mental health professionals who'll help you in your mental health journey.</p>
          </div>
          <hr className="line-landing" size="8" width="250px" color="#D4C0E2" />
        </div>
        {/* ============================================================ */}
        <div id="contact" className="contact-us section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 align-self-center">
                <div className="section-heading">
                  <h2>A safe space for you</h2>
                  <p>Using our app, you can keep a track of your emotions and keep a check on your mental health.</p>
                </div>
              </div>
              <div className="col-lg-6 phone">
                <img className="phone-image img-fluid" src={phone} alt="fluid" />
              </div>
            </div>
            <hr className="line-landing" size="8" width="250px" color="#D4C0E2" />
          </div>
        </div>
        {/* ============================================================== */}
        <section className="endingSection">
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
        </section>
      </div>
    </div>
  );
};
export default LandingPage;
