import React from 'react';
import Slider from 'react-slick';
import './Team.scss';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
import img1 from '../../assets/Teamslider/1.png';
import img2 from '../../assets/Teamslider/2.jpeg';
import img3 from '../../assets/Teamslider/3.jpeg';
import TeamCards from '../TeamCards/TeamCards';

const Team = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    cssEase: 'linear',
  };

  return (
    <section className="team">
      <section className="firstSection">
        <div className="contentWrapper">
          <div className="left">
            <div className="image image-1" />
            <div className="image image-2" />
            <div className="image image-3" />
            <div className="logo" />
          </div>
          <div className="content">
            <h3>Life At Raahee</h3>
            <p>
              Being a Mental health startup, we ensure the mental health of all our fellow interns too.
              Raahee is not just a startup, it's a family. Everyone who is part of our team is treated as an equal.
              Team meetings aren't stressful here. One can openly share ideas however bad they are. No one is judged or scolded,
              instead they are corrected and helped in growing as a whole.
              <br />
              <br />
              Raahee ensures that there is a balance between work and play. Team bonding activities, musical nights,
              discord evenings not only promote creativity but also make raahee a place where work doesn't seems like work!!
              “Fun Friday” activity and gaming session is just the cherry on top.
              <br />
              <br />
              Working with us will make you learn a lot of skills with loads of fun. You will not regret joining us!!
            </p>
          </div>
        </div>
      </section>
      <section className="secondSection">
        <TeamCards />
      </section>
      {/* <section className="secondSection">
        <div className="contentWrapper">
          <h3>Join Our diverse group of builders</h3>
          <div className="mobileOnly">
          </div>
        </div>
      </section> */}
      <section className="thirdSection">
        <Slider {...settings}>
          <img src={img1} alt="sliderImg" />
          <img src={img2} alt="sliderImg" />
          <img src={img3} alt="sliderImg" />
        </Slider>
        <a
          href="https://www.instagram.com/raahee.mentalhealth"
          target="_blank"
          rel="noreferrer"
          className="link"
          data-v-568953f8=""
        >
          Follow us on Instagram
        </a>
      </section>
    </section>
  );
};

export default Team;
