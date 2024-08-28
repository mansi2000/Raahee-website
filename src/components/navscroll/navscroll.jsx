import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-scroll';
import './navscroll.scss';

const NavbarScroll = ({ feedbacks }) => {
  const data = [
    {
      id: 1,
      value: 'About',
      to: 'about',
    },
    {
      id: 2,
      value: 'Work Experience',
      to: 'work-experience',
    },
    {
      id: 3,
      value: 'Reviews',
      to: `${feedbacks.length > 0 ? 'testi' : 'addReview'}`,
    },
  ];
  return (
    <>
      <Nav className="sticky mb-3">
        {
          data.map((navItem, idx) => (
            <Nav.Item
              className="sticky__tabs px-4"
              key={idx}
            >
              <Link
                activeClass="active"
                to={navItem.to}
                spy
                smooth
                offset={-160}
                duration={0}
              >
                {navItem.value}
              </Link>
            </Nav.Item>
          ))
        }
      </Nav>
    </>
  );
};

export default NavbarScroll;
