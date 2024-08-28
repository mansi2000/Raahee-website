import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams /* useHistory */ } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import WorkExp from '../../components/WorkExp/WorkExp';
// import NavbarScroll from '../../components/navscroll/navscroll';
import Feedback from '../../components/Feedback/Feedback';
import { fetchMhpById } from '../../api';
import { getMhpFeedbacks } from '../../actions/mhpFeedbacks';
import MhpTestimonials from '../../components/EventTesti/MhpTestimonials';
import './TherapistInfo.scss';
import ScrollUpButton from '../../components/scrollUpButton/ScrollUpButton';
import Calendar from '../../components/calendar/calendar';

function TherapistInfo() {
  const { mhpID } = useParams();
  const therapistID = mhpID.split('-').splice(-1);
  const [mhpIdentifier, setMhpIdentifier] = useState();
  const [therapist, setTherapist] = useState({});
  const [therapistFees, setTherapistFees] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [coupons, setCoupons] = useState([]);
  const dispatch = useDispatch();
  const [languages, setLanguages] = useState('');
  // const { mhpFeedbacks } = useSelector((state) => state.mhpFeedbacks);
  // const therapistProfile = JSON.parse(localStorage.getItem('therapistDetails'));
  // const history = useHistory();

  useEffect(() => {
    fetchMhpById(therapistID).then((mhpD) => {
      console.log('This is mhp data', mhpD.data[0]);
      const { fees: _, ...data } = mhpD.data[0];
      setTherapistFees(_);
      const props = data;
      localStorage.setItem('therapistDetails', JSON.stringify({ props }));
      setTherapist(data);
      setLanguages(data.languages?.split('$').join(', '));
      setLoading(false);
      setMhpIdentifier(data.id);
      dispatch(getMhpFeedbacks(data.id));
    });
  }, []);

  function copy() {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
  }

  return (
    <>
      {!loading ? (
        <div className="TherapistInfo">
          <div className="container">
            <div className="intro">
              <div style={{ padding: '0 15px' }}>
                <div className="introContainer">
                  <img id="therapistImage" src={therapist.image?.url} alt="" />
                  <ul className="therapistInfoContent">
                    <li>
                      <h4><span>{therapist.displayName}</span></h4>
                    </li>
                    <li>
                      <p className="text-muted">
                        (
                        {therapist.kindOfProfessional}
                        )
                      </p>
                    </li>
                    <li>
                      <i className="fa fas fa-rupee mr-2" />
                      {therapistFees}
                      <p className="grayColor" style={{ fontSize: '14px' }}>
                        {therapist.experience && (
                          <span>
                            Experience :&nbsp;
                            {therapist.experience}
                            {' '}
                            years
                          </span>
                        )}
                      </p>
                    </li>
                    <li>
                      {therapist.degrees && (
                        <span className="grayColor">
                          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '5px' }}>
                            <path d="M12.7439 1.39444C12.2703 1.08486 11.7168 0.919983 11.1511 0.919983C10.5853 0.919983 10.0318 1.08486 9.55826 1.39444L3.26389 5.50919C3.17435 5.56765 3.10264 5.64964 3.05663 5.74618C3.01063 5.84271 2.9921 5.95005 3.00308 6.05642C3.00142 6.075 3.00064 6.09365 3.00075 6.11231V10.7696C3.00075 10.924 3.06208 11.0721 3.17126 11.1813C3.28044 11.2905 3.42851 11.3518 3.58291 11.3518C3.73731 11.3518 3.88539 11.2905 3.99457 11.1813C4.10374 11.0721 4.16508 10.924 4.16508 10.7696V7.095L5.32941 7.88326V12.168C5.32941 12.3077 5.37948 12.4416 5.46913 12.5464L5.47146 12.5499L5.47844 12.558L5.50173 12.5837L5.58091 12.6698C5.6496 12.742 5.74857 12.8421 5.87665 12.9609C6.1328 13.1973 6.50888 13.5093 6.99324 13.8225C7.95963 14.4454 9.37895 15.08 11.1511 15.08C12.9232 15.08 14.3413 14.4454 15.3089 13.8225C15.7932 13.5093 16.1693 13.1973 16.4255 12.9609C16.5557 12.8404 16.6807 12.7146 16.8004 12.5837L16.8237 12.558L16.8307 12.5499L16.833 12.5476L16.8342 12.5452C16.9234 12.4402 16.9725 12.307 16.9727 12.1692V7.88209L19.0452 6.47907C19.1288 6.42966 19.1971 6.35798 19.2423 6.27204C19.2875 6.1861 19.308 6.08928 19.3014 5.99238C19.3006 5.89628 19.2761 5.80187 19.23 5.71755C19.1839 5.63324 19.1176 5.56165 19.0371 5.50919L12.7439 1.39444ZM15.8084 8.66918V11.9375C15.4634 12.2772 15.0846 12.5807 14.6778 12.8433C13.8395 13.3824 12.6391 13.9145 11.1511 13.9145C9.66305 13.9145 8.46146 13.3824 7.62431 12.8433C7.21746 12.5804 6.83862 12.2765 6.49374 11.9363V8.67034L9.51984 10.7184C10.0014 11.0443 10.5696 11.2184 11.1511 11.2184C11.7325 11.2184 12.3007 11.0443 12.7823 10.7184L15.8084 8.66918ZM5.91157 12.168L5.46913 12.5452L5.91157 12.1668V12.168ZM10.1951 2.36899C10.4793 2.18314 10.8115 2.08416 11.1511 2.08416C11.4906 2.08416 11.8228 2.18314 12.107 2.36899L17.6678 5.99588L12.1303 9.75434C11.8412 9.95005 11.5001 10.0547 11.1511 10.0547C10.802 10.0547 10.4609 9.95005 10.1719 9.75434L4.63314 6.00519L10.1963 2.36899H10.1951Z" fill="#AA66CC" />
                          </svg>
                          {therapist.degrees}
                        </span>
                      )}
                    </li>
                    <li>
                      {languages ? (
                        <span className="grayColor">
                          <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '5px' }}>
                            <g clipPath="url(#clip0_207_84)">
                              <path d="M17.0797 4.81502C17.3465 4.81502 17.6023 4.92098 17.7909 5.10958C17.9795 5.29819 18.0854 5.55399 18.0854 5.82072V13.8663C18.0854 14.133 17.9795 14.3888 17.7909 14.5774C17.6023 14.766 17.3465 14.872 17.0797 14.872H7.43914C6.90573 14.8721 6.39421 15.0841 6.01709 15.4613L4.0057 17.4727V5.82072C4.0057 5.55399 4.11165 5.29819 4.30026 5.10958C4.48886 4.92098 4.74466 4.81502 5.01139 4.81502H17.0797ZM5.01139 3.80933C4.47794 3.80933 3.96633 4.02124 3.58912 4.39845C3.21191 4.77566 3 5.28726 3 5.82072L3 18.6866C3.00002 18.7861 3.02956 18.8833 3.08488 18.966C3.1402 19.0487 3.21881 19.1132 3.31076 19.1512C3.40271 19.1892 3.50387 19.1991 3.60144 19.1796C3.69901 19.1601 3.7886 19.112 3.85886 19.0416L6.72811 16.1723C6.91668 15.9837 7.17244 15.8777 7.43914 15.8777H17.0797C17.6132 15.8777 18.1248 15.6658 18.502 15.2886C18.8792 14.9113 19.0911 14.3997 19.0911 13.8663V5.82072C19.0911 5.28726 18.8792 4.77566 18.502 4.39845C18.1248 4.02124 17.6132 3.80933 17.0797 3.80933H5.01139Z" fill="#AA66CC" />
                              <path d="M8.02799 9.84359C8.02799 10.1103 7.92204 10.3661 7.73343 10.5547C7.54483 10.7433 7.28902 10.8493 7.0223 10.8493C6.75557 10.8493 6.49977 10.7433 6.31116 10.5547C6.12256 10.3661 6.0166 10.1103 6.0166 9.84359C6.0166 9.57686 6.12256 9.32106 6.31116 9.13245C6.49977 8.94385 6.75557 8.83789 7.0223 8.83789C7.28902 8.83789 7.54483 8.94385 7.73343 9.13245C7.92204 9.32106 8.02799 9.57686 8.02799 9.84359ZM12.0508 9.84359C12.0508 10.1103 11.9448 10.3661 11.7562 10.5547C11.5676 10.7433 11.3118 10.8493 11.0451 10.8493C10.7784 10.8493 10.5226 10.7433 10.3339 10.5547C10.1453 10.3661 10.0394 10.1103 10.0394 9.84359C10.0394 9.57686 10.1453 9.32106 10.3339 9.13245C10.5226 8.94385 10.7784 8.83789 11.0451 8.83789C11.3118 8.83789 11.5676 8.94385 11.7562 9.13245C11.9448 9.32106 12.0508 9.57686 12.0508 9.84359ZM16.0736 9.84359C16.0736 10.1103 15.9676 10.3661 15.779 10.5547C15.5904 10.7433 15.3346 10.8493 15.0679 10.8493C14.8011 10.8493 14.5453 10.7433 14.3567 10.5547C14.1681 10.3661 14.0622 10.1103 14.0622 9.84359C14.0622 9.57686 14.1681 9.32106 14.3567 9.13245C14.5453 8.94385 14.8011 8.83789 15.0679 8.83789C15.3346 8.83789 15.5904 8.94385 15.779 9.13245C15.9676 9.32106 16.0736 9.57686 16.0736 9.84359Z" fill="#AA66CC" />
                            </g>
                            <defs>
                              <clipPath id="clip0_207_84">
                                <rect width="22.0911" height="18.38" fill="white" transform="translate(0 0.809326)" />
                              </clipPath>
                            </defs>
                          </svg>
                          Speaks in&nbsp;
                          {languages}
                        </span>
                      ) : null}
                    </li>
                    <li>
                      <button className="buttonOnIntro" onClick={copy} id="shareProfile">
                        {!copied ? 'Share Profile ' : 'Copied! '}
                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.97937 7.62501C2.45314 7.6236 2.90899 7.44374 3.25608 7.12126L6.64691 9.0588C6.5333 9.50276 6.58338 9.97278 6.78799 10.3828C6.9926 10.7929 7.33805 11.1155 7.7611 11.2917C8.18415 11.4678 8.65649 11.4857 9.09166 11.3421C9.52682 11.1985 9.89571 10.9029 10.1308 10.5095C10.3658 10.1162 10.4514 9.65127 10.3717 9.19999C10.292 8.74871 10.0525 8.34123 9.69689 8.05213C9.34133 7.76303 8.89354 7.61166 8.4355 7.62574C7.97746 7.63981 7.5398 7.81838 7.20266 8.12876L3.81183 6.19122C3.84758 6.0558 3.86708 5.91551 3.87033 5.77522L7.20158 3.87126C7.52234 4.1631 7.93371 4.33574 8.36667 4.36023C8.79964 4.38472 9.22785 4.25957 9.57948 4.00577C9.9311 3.75196 10.1847 3.38495 10.2979 2.96631C10.411 2.54767 10.3767 2.10286 10.2007 1.70651C10.0247 1.31016 9.71781 0.986384 9.33142 0.789501C8.94504 0.592617 8.5027 0.534604 8.07861 0.625195C7.65452 0.715785 7.27449 0.949466 7.00227 1.28704C6.73005 1.62461 6.5822 2.04552 6.58354 2.47918C6.5857 2.63518 6.60683 2.79064 6.64691 2.94122L3.56808 4.70001C3.38953 4.42379 3.1422 4.19878 2.85038 4.04707C2.55856 3.89537 2.23229 3.82219 1.90363 3.83473C1.57497 3.84727 1.25523 3.94509 0.975816 4.11859C0.696404 4.29209 0.466935 4.5353 0.309955 4.82432C0.152976 5.11334 0.0738858 5.43822 0.0804566 5.76706C0.0870274 6.09589 0.179033 6.41736 0.347433 6.69987C0.515833 6.98239 0.754834 7.21624 1.04095 7.37844C1.32708 7.54064 1.65047 7.62561 1.97937 7.62501Z" fill="white" />
                        </svg>
                      </button>
                      {/* <button className="buttonOnIntro" onClick={() => history.push(`/therapists/${mhpID}/schedule`)}>
                        Book Appointment
                      </button> */}
                    </li>
                  </ul>
                  <Calendar schedules={therapist.mhp_schedules} />
                </div>
                {/* <NavbarScroll feedbacks={mhpFeedbacks} /> */}
                <div className="therapist__info">
                  <div id="about">
                    <h4>
                      About
                      {' '}
                      {therapist.displayName}
                      {
                        therapist.pronoun
                          ? (
                            <>
                              {' '}
                              (
                              {therapist.pronoun}
                              )
                            </>
                          ) : ''
                      }
                    </h4>
                    <p className="mt-2 mb-2">{therapist.bio}</p>
                    {therapist.speciality && therapist.speciality.length > 0 && (
                      <div className="special">
                        <h4>
                          Specializations:
                        </h4>
                        <ul className="specialList">
                          {therapist.speciality ? therapist.speciality.split('$').map((domain, i) => (
                            <li key={i} className="specialisations">
                              &nbsp;
                              <span>
                                {domain}
                              </span>
                            </li>
                          )) : null}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div id="work-experience">
                    {therapist.mhp_work_exps && therapist.mhp_work_exps.length > 0 && (
                      <h4>
                        Work Experience
                      </h4>
                    )}
                    <ul>
                      {therapist.mhp_work_exps ? therapist.mhp_work_exps.map((exp, i) => (
                        <li key={i}>
                          <span>
                            <WorkExp key={i} experience={exp} />
                          </span>
                        </li>
                      )) : null}
                    </ul>
                  </div>
                </div>
              </div>
              <div id="addReview" className="col-md-12" style={{ padding: '0' }}>
                <Feedback id={mhpIdentifier} item="mhp" />
              </div>
              <MhpTestimonials />
            </div>
          </div>
        </div>
      ) : (
        <Box sx={{ color: 'grey.500', display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      <ScrollUpButton />
    </>
  );
}

export default TherapistInfo;
