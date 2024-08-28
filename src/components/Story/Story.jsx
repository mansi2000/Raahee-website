/* eslint linebreak-style: ["error", "windows"]  */
import React from 'react';
import './Story.scss';
import flag from '../../assets/flag.png';
import face from '../../assets/face.png';
import glasses from '../../assets/glasses.png';
import rocket from '../../assets/rocket.png';
import globe from '../../assets/globe.png';
import champagne from '../../assets/champagne.png';
import whistle from '../../assets/whistle.png';
import incubator from '../../assets/incubator.jpg';
import nasscom from '../../assets/nasscom.jpg';

const Story = () => {
  const data = [
    {
      image: flag,
      date: 'June 2020',
      content: 'Kshitija, Shubhangi and Mansi founded Raahee',
    },
    {
      image: face,
      date: 'July 2020',
      content: 'Launched the website, won hassle free solution in Cisco tqb',
    },
    {
      image: rocket,
      date: 'March. 2021',
      content: 'Runners up in Microsoft Azure Imagine cup',
    },
    {
      image: glasses,
      date: 'April. 2021',
      content: 'Onboarded 10 MHPs',
    },
    {
      image: globe,
      date: 'May 2021',
      content: 'Gave first therapy session',
    },
    {
      image: champagne,
      date: 'July 2021',
      content: 'First 500+ app downloads',
    },
    {
      image: whistle,
      date: 'Aug. 2021',
      content:
        'Completed 150 therapy sessions',
    },
  ];
  return (
    <section className="story">
      <div className="contentWrapper">
        <h3>Our Journey So Far</h3>
        <div className="steps">
          {data.map((step) => {
            const { image, date, content } = step;
            return (
              <div className="step">
                <div className="image">
                  <div className="circle" />
                  <img src={image} alt="illustration" className="illus" />
                </div>
                <div className="content">
                  <h4>{date}</h4>
                  <p>{content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
      </div>
    </section>
  );
};

export default Story;
