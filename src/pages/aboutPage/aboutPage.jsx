import React from 'react';
import cx from 'classnames';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from 'react-router-dom';
import styles from './aboutPage.module.scss';
import Mission from '../../components/Mission/Mission';
import Values from '../../components/Values/Values';
import Story from '../../components/Story/Story';
import Team from '../../components/Team/Team';
// import moving from '../../assets/moving.png';

const AboutPage = ({ match }) => (
  <section className="aboutPage">
    <Helmet>
      <title>Raahee | About</title>
    </Helmet>
    <section>
      <div className={cx(styles.gradientContainer, styles.heroGradient)}>
        <div className={cx(styles.line, styles.light)} />
        <div className={cx(styles.line, styles.dark)} />
      </div>
      <Router>
        <ul className={cx(styles.navLinks)}>
          <li>
            <Link className={styles.link} to="/about/">
              Mission
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/about/values">
              Values
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/about/story">
              Story
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/about/team">
              Team
            </Link>
          </li>
        </ul>
        <div className={styles.heading}>
          <h1>About Raahee</h1>
        </div>
        <Switch>
          <Route exact path={`${match.path}`} component={Mission} />
          {/* <Route exact path="/about/" component={Mission}>
            <Redirect to="/about/mission" />
          </Route> */}
          <Route path={`${match.path}/Values`} component={Values} />
          <Route path={`${match.path}/Story`} component={Story} />
          <Route path={`${match.path}/Team`} component={Team} />
        </Switch>
      </Router>
    </section>

    {/* <div className="container">
      <hr className="line-landing" size="8" width="250px" color="#D4C0E2" />
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
    </div> */}
  </section>
);

export default AboutPage;
