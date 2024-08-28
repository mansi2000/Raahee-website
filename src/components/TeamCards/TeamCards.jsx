import React from 'react';
import { Container } from 'reactstrap';
import './TeamCards.scss';

const TeamCards = () => {
  return (
    <Container className="teamcard">
      <p className="teamcard__heading">Amplify your capabilities in our benevolent workspace</p>
      <div className="teamcard__about">
        <p className="teamcard__about__info">
          <span className="teamcard__about__text">30+</span>
          <span className="teamcard__about__subtext">Employees</span>
        </p>
        <p className="teamcard__about__info">
          <span className="teamcard__about__text">500+</span>
          <span className="teamcard__about__subtext">Satisfied Customers</span>
        </p>
        <p className="teamcard__about__info">
          <span className="teamcard__about__text">20+</span>
          <span className="teamcard__about__subtext">Therapists</span>
        </p>
      </div>
    </Container>
  );
};

export default TeamCards;
