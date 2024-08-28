/* eslint linebreak-style: ["error", "windows"]  */
import React from 'react';
import g1 from '../../assets/g1.png';
import g2 from '../../assets/g2.png';
import g3 from '../../assets/g3.svg';
import Vect from '../../assets/Vect.png';
import './Mission.scss';

const Mission = () => (
  <section className="mission">
    <div className="container" style={{ marginTop: '0' }}>
      <div className="row justify-content-between home-landing">
        <div className="col-md-4">
          <img src={g1} className="img-fluid" alt="fluid" />
        </div>
        <div className="col-md-7 my-auto">
          <div className="box-1">
            <p className="title-3">OUR MISSION</p>
            <p className="text-1">
              We at Raahee, aim to provide a safe and therapeutic space for people,
              where they can get their mental and emotional needs met.
              They can use our platform to vent, feel, heal and become better versions of themselves.
            </p>
          </div>
        </div>
      </div>
      <img src={Vect} alt="..." className="vect" />
    </div>
    {/* *************************************************** */}
    <div className="container" style={{ marginTop: '0rem' }}>
      <div className="row justify-content-between home-landing">
        <div className="col-md-7 my-auto">
          <div className="box-1">
            <p className="title">WE BELIEVE</p>
            {/* <p className="para">
              Trust + Control = how modern teams should work.
            </p> */}
            <p className="text-1">
              Contrary to the popular belief, we believe that strength lies in calling
              out for help and being there for the people who ask for it. We think that
              therapy is for anyone and everyone and everybody should be able to avail it.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <img src={g2} className="img-fluid" alt="fluid" />
        </div>
      </div>
      <img src={Vect} alt="..." className="vect" />
    </div>
    {/* ***************************************************************************** */}
    <div className="container" style={{ marginTop: '0rem' }}>
      <div className="row justify-content-between home-landing">
        <div className="col-md-4 image-dots">
          <img src={g3} className="img-fluid" alt="fluid" />
        </div>
        <div className="col-md-7 my-auto">
          <div className="box-1">
            <p className="title">OUR SOLUTION</p>
            {/* <p className="para">
              An end-to-end platform instead of a complex stack of tools
            </p> */}
            <p className="text-1">
              We're trying to bring a wave of change in the way we perceive our emotions and problems.
              The comfort around seeking help and talking about one's feelings should be made available to all.
              We are connecting people with therapists by taking affordability and availability into consideration.
              We're listening to the ones who need to talk and talking to the ones in need of a guiding light.
              and hence start a conversation that empowers people to come forward and seek help.
              Thereby, provide a safe space and build an amazing open community that leads India with not only better skills but better minds.
            </p>
          </div>
        </div>
      </div>
      <img src={Vect} alt="..." className="vect" />
    </div>
  </section>
);

export default Mission;
