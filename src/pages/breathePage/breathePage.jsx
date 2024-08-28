import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import './breathePage.scss';

const BreathePage = (props) => {
  const [stop, setStop] = useState(false);
  const [text, setText] = useState('Breathe In!');
  const [wrapperClass, setWrapperClass] = useState('wrapper grow');

  const totalTime = 7500;
  const breatheTime = (totalTime / 5) * 2;
  const holdTime = totalTime / 5;

  useEffect(() => {
    breathAnimation();
    const stopTimer = setTimeout(() => {
      setStop(true);
    }, 7.5 * 4 * 1000);
    const intervalTimer = setInterval(() => breathAnimation(), totalTime);
    props.setShowHeaderAndFooter(false);

    return function cleanup() {
      props.setShowHeaderAndFooter(true);
      clearTimeout(stopTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  const handleStop = () => { setStop(true); };

  function breathAnimation() {
    setText('Breathe In!');
    setWrapperClass('wrapper grow');
    setTimeout(() => {
      setText('Hold');
      setTimeout(() => {
        setText('Breathe Out!');
        setWrapperClass('wrapper shrink');
      }, holdTime);
    }, breatheTime);
  }

  return (
    <div className="breathePage">
      <Helmet>
        <title>Raahee | Meditaiton Breathe</title>
      </Helmet>
      {stop ? <Redirect to="/" /> : null}
      <div className={wrapperClass}>
        <div className="circle" />

        <p style={{ color: 'white' }}>{text}</p>

        <div className="gradient-circle" />
      </div>
      <br />
      <button
        type="button"
        className="btn text-dark tempting-azure-gradient px-5"
        onClick={handleStop}
        style={{ marginBottom: '10vh' }}
      >
        Stop
      </button>
    </div>
  );
};

export default BreathePage;
