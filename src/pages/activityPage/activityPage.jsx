import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import nandini from '../../assets/Nandini.png';
import vanshika from '../../assets/Vanshika.jpeg';
import avatar from '../../assets/avatar.png';
import eshita from '../../assets/Eshita.jpeg';
import removebg from '../../assets/activity-removebg.png';
import removebuddy from '../../assets/activity-removebuddy.png';
import './activityPage.scss';

const ActivityPage = () => {
  return (
    <div className="activityPage">
      <Helmet>
        <title>Raahee | Activities</title>
      </Helmet>
      <div className="container fluid">
        <div className="row positivity first-para">
          <div className="col-md-6 my-auto" id="positivity-text">
            <h2 className="emotionalH text-left">EMOTIONAL HYGIENE</h2>
            <p className="tagline mt-4">
              Emotional hygiene is being mindful of our psychological or mental health and adopting brief daily
              habits to monitor and address psychological wounds when we sustain them. For example, when we
              get a wound, we are taught that we must disinfect and treat it so that it will heal, likewise if we are
              devastated or wounded mentally or emotionally, we should treat it well.
            </p>
          </div>
          <div className="col-md-6 my-auto">
            <img src={removebuddy} alt="" className="img-fluid mb-3 img-head" width="500" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="card my-5">
          <h2 className="emotionalH">
            Art O
            <u className="emotionalU">f Nurturing Posi</u>
            tivity
          </h2>
          <div className="row positivity">
            <div className="col-md-7 my-auto">
              <img src={removebg} alt="" className="img-fluid mb-3" />
            </div>

            <div className="col-md-5 my-auto" id="positivity-text">
              <p className="tagline mt-4 second-para">
                Raahee app brings in a lot
                of features which can help you cope up with your inner problems like
                <br />
                <br />
                Anonymously sharing your
                thoughts
                <br />
                Sharing the things you cannot share with anyone
                <br />
                Vent out your emotions
                <br />
                Tell us your
                worries
                <br />
                <br />
                Raahee thinks you are not alone💜
              </p>
            </div>
          </div>
        </div>
        <div className="card my-5">
          <h2 className="emotionalH mb-4">
            Let
            {' '}
            <u className="emotionalU">Your Mind S</u>
            peak
          </h2>
          <div className="row container1">
            <div className="card1">
              <div className="circle1">
                <h2 className="worry">
                  WORRY
                  <br />
                  {' '}
                  TREE
                </h2>
              </div>
              <div className="content1">
                <p>Worries haunt only till they aren't reflected upon.</p>
                <Link className="read-more" to="/worryTree">
                  Read More
                </Link>
              </div>
            </div>
            {/* <div className="card1">
              <div className="circle1">
                <h2 className="amsg">ANONYMOUS MESSAGE</h2>
              </div>
              <div className="content1">
                <p>
                  Share your deepest aches with the universe. Yes it hears you!
                </p>
                <Link className="read-more" to="/anonymousMessage">
                  Read More
                </Link>
              </div>
            </div> */}
            <div className="card1">
              <div className="circle1">
                <h2 className="vent">
                  VENT IT
                  <br />
                  {' '}
                  OUT
                </h2>
              </div>
              <div className="content1">
                <p>
                  Thoughts can be exhausting. Better to say what troubles you.
                  {' '}
                </p>
                <Link className="read-more" to="/meditation">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* ======================= */}
        <div className="card my-5">
          <h2 className="emotionalH">
            TES
            <u className="emotionalU">TIMONI</u>
            ALS
          </h2>
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            {/*  Carousel  */}
            <div className="carousel-inner">
              <div className="item carousel-item active">
                <div className="img-box">
                  <img src={eshita} alt="" />
                </div>
                <p className="testimonial">
                  The workshop was thoroughly thought over and very well
                  organised. The activities and the insights given were also
                  very comforting and were worth self introspection. Absolutely
                  loved the "Anonymous Messenger" game💙 looking forward to see
                  this project go big!
                </p>
                <p className="overview">
                  <b>Eshita Malhotra</b>
                  , Raahee Buddy
                </p>
              </div>
              <div className="item carousel-item">
                <div className="img-box">
                  <img src={nandini} alt="" />
                </div>
                <p className="testimonial">
                  The workshop conducted by the team rahee was absolutely down
                  to earth and relatable. Their presentation had so many
                  interactive and cool animations. The activity conducted by
                  them helped us connect to our emotions which I believe in
                  needed in the times that we are living in. It was a job well
                  done.
                </p>
                <p className="overview">
                  <b>Nandini Ginodia</b>
                  , CiscoThingQbator
                </p>
              </div>
              <div className="item carousel-item">
                <div className="img-box">
                  <img src={vanshika} alt="" />
                </div>
                <p className="testimonial">
                  A very interactive and interesting workshop with amazing
                  animations and activities. It was great seeing all the
                  positive replies from other Raahees on the website. I have
                  used the website a few times recently too and the replies are
                  always better than the last time. Thankyou team Raahee for
                  taking this initiative. You have all done a wonderful job.
                  Looking forward to seeing new stuff on the site. Overall, it
                  was a worthwhile experience. 💫✨
                </p>
                <p className="overview">
                  <b>Vanshika</b>
                  , CiscoThingQbator
                </p>
              </div>
              <div className="item carousel-item">
                <div className="img-box">
                  <img src={avatar} alt="" />
                </div>
                <p className="testimonial">
                  Raahee is curated with souls who are doing a fantastic work in
                  a world full of selfishness. I personally have been going
                  through mental complications lately and did attend few
                  workshops too but 'Raahee Buddy' gave me some hope. I really
                  loved the concept of creating an online support group and
                  enjoyed the workshop throughout. Starting from conversation
                  then the activity and uptil the chat. I am very sure Raahee
                  will be hope and will be change for people who are looking for
                  support.
                </p>
                <p className="overview">
                  <b>Arun</b>
                  , Manager of Makerspace, CiscoThingQbator
                </p>
              </div>
            </div>
          </div>
          {/*  Carousel Controls  */}
          <a
            className="carousel-control left carousel-control-prev"
            href="#myCarousel"
            data-slide="prev"
          >
            <i className="fa fa-angle-left" />
          </a>
          <a
            className="carousel-control right carousel-control-next"
            href="#myCarousel"
            data-slide="next"
          >
            <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
