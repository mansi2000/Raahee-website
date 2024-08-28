import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import lottie from 'lottie-web';
import { Form, FormControl } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import TherapistLogo from '../../assets/therapist-Page.json';
import TherapistFilterModal from '../../components/therapistFilterModal/therapistFilterModal';
import './TherapistsPage.scss';
import TherapistCard from '../../components/TherapistCard/TherapistCard';
import ScrollUpButton from '../../components/scrollUpButton/ScrollUpButton';

const TherapistsPage = (props) => {
  const { mhps } = useSelector((state) => state.mhps);
  const [MHPs, setMHPs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredTherapist, setFilteredTherapist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setMHPs(mhps.filter((element) => element.displayName !== 'admin'));
    setLoading(false);
    lottie.loadAnimation({
      container: document.querySelector('#therapist-Logo'),
      animationData: TherapistLogo,
      loop: true,
    });
  }, []);

  useEffect(() => {
    if (count > 0) {
      setLoading(false);
    }
  }, [filteredTherapist]);

  const render = () => {
    if (filteredTherapist.length > 0) {
      return (
        filteredTherapist.filter((mhp) => {
          if (searchTerm === '') {
            return mhp;
          } if (mhp.displayName.toLowerCase().includes(searchTerm) || (!mhp.speciality || mhp.speciality.length === 0 ? (null) : (filterSpecialities(mhp.speciality.split('$'))))) {
            return mhp;
          }
          return null;
        }).map((mhp, index) => (
          <TherapistCard key={index} index={index % 3} {...mhp} {...props} />
        ))
      );
    }
    return (
      <div className="no-therapist">Loading...</div>
    );
  };

  const filterSpecialities = (speciality) => {
    const tempArray = [];
    // eslint-disable-next-line array-callback-return
    speciality.map((value) => {
      tempArray.push(value.toLowerCase().includes(searchTerm));
    });
    return tempArray.includes(true);
  };

  return (
    <div className="TherapistsPage">
      <Helmet>
        <title>Raahee | Therapists</title>
      </Helmet>
      <div className="container" style={{ paddingTop: '70px' }}>
        <div className="row justify-content-center home-landing">
          <div className="col-md-5 my-auto">
            <div className="main-heading">
              <div>
                <p
                  className="landing-text"
                  style={{ fontSize: '45px', fontWeight: '600' }}
                >
                  Feeling
                </p>
                <p className="color-text landing-text">Not Okay? </p>
                <p style={{ fontSize: '20px', fontWeight: '500', lineHeight: '2rem' }}>
                  {' '}
                  You're not alone.
                  {' '}
                  <span className="color-text">We are here, just for you,</span>
                  {' '}
                  Whenever you want, Wherever you want.
                  {' '}
                </p>
                <div className="buttons mt-1">
                  <Link to="/booktherapy" className="btn btn-secondary text-capitalize mr-3" style={{ boxShadow: 'none' }}>
                    <i className="fas fa-comment-dots mr-2" />
                    Book A Session
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-row-reverse" style={{ width: '90%', height: '90%' }}>
            <div id="therapist-Logo" className="therapist-iconSection" />
          </div>
        </div>
        {
          !loading ? (
            <>
              <div className="filter">
                <Form className="d-flex search-form">
                  <AiOutlineSearch className="search-icon" />
                  <FormControl
                    style={{ padding: '1.4rem' }}
                    type="search"
                    placeholder="Search by name or speciality"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                  />
                </Form>
                <TherapistFilterModal
                  mhps={MHPs}
                  setLoading={setLoading}
                  setCount={setCount}
                  setFilteredTherapist={setFilteredTherapist}
                  specialities={specialities}
                  setSpecialities={setSpecialities}
                />
              </div>
              <div className="therapist__row">
                {count > 0 || filteredTherapist.length > 0 ? render() : (
                  MHPs.filter((mhp) => {
                    if (searchTerm === '') {
                      return mhp;
                    } if (mhp.displayName.toLowerCase().includes(searchTerm) || filterSpecialities(mhp.speciality.split('$'))) {
                      return mhp;
                    }
                    return null;
                  }).map((mhp, index) => (
                    <TherapistCard key={index} index={index % 3} {...mhp} {...props} />
                  ))
                )}
              </div>
            </>
          )
            : (
              <div>
                <svg className="spinner" viewBox="0 0 50 50">
                  <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
                </svg>
              </div>
            )
        }
        <ScrollUpButton />
      </div>
    </div>
  );
};

export default TherapistsPage;
