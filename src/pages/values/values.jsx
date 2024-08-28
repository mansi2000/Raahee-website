import React from 'react';
import cx from 'classnames';
import { Helmet } from 'react-helmet';
import {
  Link,
} from 'react-router-dom';
import styles from './value.module.scss';
import Values from '../../components/Values/Values';

const ValuesPage = () => (
  <section className="aboutPage">
    <Helmet>
      <title>Raahee | About</title>
    </Helmet>
    <section>
      <div className={cx(styles.gradientContainer, styles.heroGradient)}>
        <div className={cx(styles.line, styles.light)} />
        <div className={cx(styles.line, styles.dark)} />
      </div>
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
        {/* <li>
            <Link className={styles.link} to="/about/Story">
              Story
            </Link>
          </li> */}
        <li>
          <Link className={styles.link} to="/about/team">
            Team
          </Link>
        </li>
      </ul>
      <div className={styles.heading}>
        <h1>About Raahee</h1>
      </div>
      <Values />
    </section>
  </section>
);

export default ValuesPage;
