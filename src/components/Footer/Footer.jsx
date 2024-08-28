import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer
      id="footer"
      className="pt-4 page-footer font-small unique-color-dark"
    >
      <div className="container">
        <div className="mx-auto mt-5 mb-4 text-center row d-flex center">
          <div className="mb-1 col-sm-12 col-md-6">
            <Link className="mb-1 navbar-brand footer-font-weight" to="/">
              RAAHEE
            </Link>
            <p>
              The first aid to your invisible wounds. Together we feel, vent and heal.
            </p>
            <br />
            <div className="pb-3 mb-4 row justify-content-center">
              <a
                className="ins-ic"
                href="https://www.instagram.com/raahee.mentalhealth/"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="mr-3 fab fa-instagram fa-lg white-text mr-md-5"
                  aria-hidden="true"
                />
              </a>
              <a
                className="dis-ic"
                href="https://discord.gg/RZyGBY7JnH"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="mr-3 fab fa-discord fa-lg white-text mr-md-5"
                  aria-hidden="true"
                />
              </a>
              <a
                className="fb-ic"
                href="https://www.facebook.com/Raahee-MentalHealth-102782041505162/"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="mr-3 fab fa-facebook-f fa-lg white-text mr-md-5"
                  aria-hidden="true"
                />
              </a>
              <a
                className="gplus-ic"
                href="mailto:admin@raahee.app"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="mr-3 fas fa-envelope fa-lg white-text mr-md-5"
                  aria-hidden="true"
                />
              </a>
              <a
                className="li-ic"
                href="https://www.linkedin.com/company/raahee"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="mr-3 fab fa-linkedin-in fa-lg white-text mr-md-5"
                  aria-hidden="true"
                />
              </a>
              <a
                className="ins-ic"
                href="https://www.youtube.com/channel/UC76EXWZGW4ewmjk_UgsfaLg"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="fab fa-youtube fa-lg white-text mr-md-5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div className="mb-1 col-sm-12 col-md-6">
            <table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <tbody>
                <tr>
                  <td width="60%"><Link className="mt-3 ml-2 row" target="_blank" to="/about">About</Link></td>
                  <td><Link className="mt-3 ml-3 row" target="_blank" to="/terms">Terms</Link></td>
                </tr>
                <tr>
                  <td><Link className="mt-3 ml-2 row" target="_blank" to="/policy">Policy</Link></td>
                  <td><a href="https://pages.razorpay.com/DonateRaahee" className="mt-3 ml-3 row" target="_blank" rel="noreferrer">Donate</a></td>
                </tr>
                <tr>
                  <td><Link className="mt-3 ml-2 row" target="_blank" to="/activities">Activities</Link></td>
                  <td><a href="https://bit.ly/WorkAtRaahee" className="mt-3 ml-3 row" target="_blank" rel="noreferrer">Career</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="py-3 text-center footer-copyright footer-font-size">
        Copyright © 2020 | Raahee
      </div>
    </footer>
  );
};

export default Footer;
