import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';
import { RiEdit2Fill } from 'react-icons/ri';
import { IoExitSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import EditTerms from '../../components/EditTerms/editTerms';
import { ReactComponent as Logo } from '../../assets/therapyTerms.svg';
import ProtectedRouteAdmin from '../../components/ProtectedRoute/ProtectedRouteAdmin';
import './therapyTerms.scss';

const navlinks = [
  {
    id: 'mainTerms',
    name: 'Terms',
    url: '',
    edit: 'edit/',
  },
  {
    id: 'cancellationPolicy',
    name: 'Cancellation Policy',
    url: 'cancellation',
    edit: 'edit/cancellation',
  },
  {
    id: 'confidentiality',
    name: 'Confidentiality',
    url: 'confidentiality',
    edit: 'edit/confidentiality',
  },
];
const TherapyTerms = () => {
  const [id, setId] = useState(null);
  const [data, setData] = useState({});
  const { path } = useRouteMatch();
  const [selected, setSelected] = useState('mainTerms');
  const [toggleButton, setToggleButton] = useState(0);
  const user = JSON.parse(localStorage.getItem('profile'))?.user;
  const { therapyTerms } = useSelector((state) => state.therapyTerms);

  useEffect(() => {
    setId(therapyTerms[0].id);
    if (selected === 'mainTerms') {
      setData(therapyTerms[0].mainTerms);
    } else if (selected === 'cancellationPolicy') {
      setData(therapyTerms[0].cancellationPolicy);
    } else if (selected === 'confidentiality') {
      setData(therapyTerms[0].confidentiality);
    }
  }, [selected, toggleButton]);

  return (
    <div className="container">
      <Helmet>
        <title>Raahee | Therapy: Terms&amp;Conditions</title>
      </Helmet>
      <section className="therapyTerms">
        <div className="row therapyTerms-header">
          <div className="col-md-8">
            <p className="therapyTerms-header-topic">Therapy</p>
            <h1 className="therapyTerms-header-subheading">Terms &amp; Conditions</h1>
          </div>
          <div className="col-md-4 therapyTerms-header-side">
            <div className="therapyTerms-header-side-image">
              <Logo />
            </div>
            <div className="therapyTerms-header-side-toggle">
              {user && user.email === process.env.REACT_APP_ADMIN_EMAIL
                && (
                  <Link to={toggleButton ? `${path}` : `${path}/edit`}>
                    <button onClick={() => setToggleButton(!toggleButton)}>
                      {toggleButton ? <IoExitSharp /> : <RiEdit2Fill />}
                    </button>
                  </Link>
                )}
            </div>
          </div>
        </div>
        <div className="therapyTerms-links">
          {
            navlinks.map((item, i) => {
              return (
                <div key={i} className="TermLinks">
                  <Link to={toggleButton ? `${path}/${item.edit}` : `${path}/${item.url}`}>
                    <button onClick={() => setSelected(item.id)} className={selected === item.id ? 'active' : ''}>{item.name}</button>
                  </Link>
                </div>
              );
            })
          }
        </div>
      </section>
      <div className="therapyMain-content">
        <Switch>
          <ProtectedRouteAdmin
            path={`${path}/edit`}
            component={EditTerms}
            setToggleButton={setToggleButton}
            toggleButton={toggleButton}
            data={data}
            selected={selected}
            id={id}
          />
          <Route
            exact
            path={`${path}`}
            render={() => (
              <div>
                {' '}
                {ReactHtmlParser(data)}
              </div>
            )}
          />
          <Route
            exact
            path={`${path}/cancellation`}
            render={() => (
              <div>
                {' '}
                {ReactHtmlParser(data)}
              </div>
            )}
          />
          <Route
            exact
            path={`${path}/confidentiality`}
            render={() => (
              <div>
                {' '}
                {ReactHtmlParser(data)}
              </div>
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default TherapyTerms;
