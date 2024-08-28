import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@material-ui/core';
import { updateProfile } from '../../api';
import './confirmDetailsPage.scss';

export default function ConfirmDetailsPage() {
  const user = JSON.parse(localStorage.getItem('profile')).user;
  const { mhpID } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [isFirstFormPage, setIsFirstFormPage] = useState(true);
  const [isFirstFilled, setIsFirstFilled] = useState(true);
  const [isSecondFilled, setIsSecondFilled] = useState(true);
  const [firstFormData, setFirstFormData] = useState({
    displayName: user.displayName,
    age: user.age ? user.age : '',
    pronoun: user.pronoun ? user.pronoun : '',
    address: user.address ? user.address : '',
    eContact1Name: user.eContact1Name ? user.eContact1Name : '',
    eContact1Relation: user.eContact1Relation ? user.eContact1Relation : '',
    eContact1Phone: user.eContact1Phone ? user.eContact1Phone : '',
    eContact2Name: user.eContact2Name ? user.eContact2Name : '',
    eContact2Relation: user.eContact2Relation ? user.eContact2Relation : '',
    eContact2Phone: user.eContact2Phone ? user.eContact2Phone : '',
  });

  const [secondFormData, setSecondFormData] = useState({
    isSuicidal: user.isSuicidal ? user.isSuicidal : '',
    isSelfHarming: user.isSelfHarming ? user.isSelfHarming : '',
    consultedBefore: user.consultedBefore ? user.consultedBefore : user.consultedBefore,
    primaryConcern: user.primaryConcern ? user.primaryConcern.split('$') : '',
    primaryConcernText: user.primaryConcernText ? user.primaryConcernText : '',
  });
  const [primaryConcernTextField, setPrimaryConcernTextField] = useState(false);

  function handleChangeFirstForm(e) {
    const name = e.target.name;
    let { value } = e.target;
    if (name.includes('Phone')) {
      value = value.replace(/\D/g, '');
    }
    setFirstFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleTextFieldChange(e) {
    const { name, value } = e.target;
    if (value === 'other' && name === 'primaryConcern') {
      handleChangeSecondForm(e);
      setPrimaryConcernTextField(!primaryConcernTextField);
    } else {
      setSecondFormData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  }

  function handleChangeSecondForm(e) {
    const { name, value } = e.target;

    if (name === 'primaryConcern') {
      let valArr = [...secondFormData.primaryConcern];

      if (secondFormData.primaryConcern.includes(value)) {
        valArr = valArr.filter((item) => {
          return item !== value;
        });
      } else {
        valArr.push(value);
      }

      setSecondFormData((prev) => {
        return {
          ...prev,
          [name]: valArr,
        };
      });
    } else {
      setSecondFormData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  }

  function canProceedFirstForm() {
    if (firstFormData.displayName === '' || firstFormData.age === '' || firstFormData.pronoun === '' || firstFormData.address === '' || firstFormData.eContact1Name === '' || firstFormData.eContact1Phone === '' || firstFormData.eContact1Relation === '') {
      setIsFirstFilled(false);
    } else if (firstFormData.displayName === firstFormData.eContact1Name || firstFormData.displayName === firstFormData.eContact2Name || firstFormData.eContact1Phone === firstFormData.eContact2Phone) {
      setIsFirstFilled(false);
    } else {
      updateProfile(firstFormData).then((userData) => {
        const loggedInUser = JSON.parse(localStorage.getItem('profile'));
        loggedInUser.user = userData.data;
        localStorage.setItem('profile', JSON.stringify(loggedInUser));
      });
      setIsFirstFormPage(!isFirstFormPage);
    }
  }

  function canProceedSecondForm() {
    if (secondFormData.isSuicidal === '' || secondFormData.isSelfHarming === '' || secondFormData.consultedBefore === '' || secondFormData.primaryConcern.length === 0) {
      setIsSecondFilled(false);
    } else {
      setLoading(true);
      updateProfile({
        isSuicidal: secondFormData.isSuicidal,
        isSelfHarming: secondFormData.isSelfHarming,
        consultedBefore: secondFormData.consultedBefore,
        primaryConcern: secondFormData.primaryConcern?.join('$'),
        primaryConcernTextField: secondFormData.primaryConcernText,
      }).then((userData) => {
        setLoading(false);
        const loggedInUser = JSON.parse(localStorage.getItem('profile'));
        loggedInUser.user = userData.data;
        localStorage.setItem('profile', JSON.stringify(loggedInUser));
      })
        .then(() => {
          history.replace(`/therapists/${mhpID}/schedule`);
        });
    }
  }

  return (
    <div className="confirmDetails container">
      <div className="heading">
        {isFirstFormPage ? 'Please confirm your details' : 'You are at the Final Step'}
      </div>
      <div>
        <div className="grid">
          <div className="center">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.27052 1.35968C9.6911 0.929274 10.1935 0.587275 10.7481 0.353778C11.3027 0.120282 11.8984 0 12.5002 0C13.102 0 13.6977 0.120282 14.2523 0.353778C14.807 0.587275 15.3093 0.929274 15.7299 1.35968L16.7018 2.35655L18.0924 2.33937C18.6943 2.33224 19.2917 2.44555 19.8492 2.67263C20.4067 2.89971 20.9132 3.23597 21.3389 3.66165C21.7645 4.08732 22.1008 4.59381 22.3279 5.15134C22.555 5.70886 22.6683 6.30616 22.6611 6.90812L22.6455 8.29874L23.6393 9.27062C24.0697 9.6912 24.4117 10.1936 24.6452 10.7482C24.8787 11.3028 24.999 11.8985 24.999 12.5003C24.999 13.1021 24.8787 13.6978 24.6452 14.2524C24.4117 14.807 24.0697 15.3094 23.6393 15.73L22.644 16.7019L22.6611 18.0925C22.6683 18.6944 22.555 19.2917 22.3279 19.8493C22.1008 20.4068 21.7645 20.9133 21.3389 21.339C20.9132 21.7646 20.4067 22.1009 19.8492 22.328C19.2917 22.5551 18.6943 22.6684 18.0924 22.6612L16.7018 22.6456L15.7299 23.6394C15.3093 24.0698 14.807 24.4118 14.2523 24.6453C13.6977 24.8788 13.102 24.999 12.5002 24.999C11.8984 24.999 11.3027 24.8788 10.7481 24.6453C10.1935 24.4118 9.6911 24.0698 9.27052 23.6394L8.29865 22.6441L6.90802 22.6612C6.30607 22.6684 5.70877 22.5551 5.15124 22.328C4.59372 22.1009 4.08722 21.7646 3.66155 21.339C3.23588 20.9133 2.89961 20.4068 2.67253 19.8493C2.44545 19.2917 2.33215 18.6944 2.33927 18.0925L2.3549 16.7019L1.36115 15.73C0.930739 15.3094 0.58874 14.807 0.355243 14.2524C0.121747 13.6978 0.00146484 13.1021 0.00146484 12.5003C0.00146484 11.8985 0.121747 11.3028 0.355243 10.7482C0.58874 10.1936 0.930739 9.6912 1.36115 9.27062L2.35646 8.29874L2.33927 6.90812C2.33215 6.30616 2.44545 5.70886 2.67253 5.15134C2.89961 4.59381 3.23588 4.08732 3.66155 3.66165C4.08722 3.23597 4.59372 2.89971 5.15124 2.67263C5.70877 2.44555 6.30607 2.33224 6.90802 2.33937L8.29865 2.35499L9.27052 1.36124V1.35968ZM10.9408 17.1878C10.9408 17.393 10.9812 17.5962 11.0598 17.7857C11.1383 17.9753 11.2534 18.1476 11.3985 18.2927C11.5436 18.4377 11.7158 18.5528 11.9054 18.6314C12.095 18.7099 12.2981 18.7503 12.5033 18.7503C12.7085 18.7503 12.9117 18.7099 13.1013 18.6314C13.2908 18.5528 13.4631 18.4377 13.6082 18.2927C13.7533 18.1476 13.8684 17.9753 13.9469 17.7857C14.0254 17.5962 14.0658 17.393 14.0658 17.1878C14.0658 16.7734 13.9012 16.376 13.6082 16.083C13.3152 15.7899 12.9177 15.6253 12.5033 15.6253C12.0889 15.6253 11.6915 15.7899 11.3985 16.083C11.1055 16.376 10.9408 16.7734 10.9408 17.1878ZM13.444 14.0206C13.5065 13.1862 13.7533 12.7472 14.7658 12.0519C15.819 11.3097 16.4065 10.3487 16.4065 8.94874C16.4065 6.87843 14.969 5.46905 12.8721 5.46905C11.2783 5.46905 10.0721 6.2378 9.59083 7.48468C9.44499 7.82522 9.37156 8.19237 9.37521 8.56281C9.37521 9.17687 9.6924 9.5628 10.2268 9.5628C10.6518 9.5628 10.9377 9.33312 11.108 8.76593C11.3549 7.84093 11.9283 7.33624 12.7861 7.33624C13.7393 7.33624 14.3955 8.03312 14.3955 9.02999C14.3955 9.90968 14.0705 10.4128 13.1111 11.1003C12.144 11.7769 11.6643 12.5284 11.6643 13.6628V13.8362C11.6643 14.505 11.9893 15.0003 12.5783 15.0003C13.1033 15.0003 13.3658 14.6253 13.444 14.0206Z" fill="#AA66CC" />
            </svg>
          </div>
          <div className="info-div">
            <span className="sub-heading">
              Why do we need this info?
            </span>
            <div>
              We would never contact the emergency contact of yours without your permission, the contact would be used for emergency purposes, as guided by
              <span style={{ color: '#AA66CC' }}>
                &nbsp;NIMHANS
              </span>
              .
            </div>
          </div>
        </div>
        {isFirstFormPage
          ? (
            <form className="form">
              <label className="label">
                Full Name
              </label>
              <br />
              <input type="text" placeholder="John Doe" className="input" name="displayName" value={firstFormData.displayName} onChange={handleChangeFirstForm} />
              {(!isFirstFilled && firstFormData.displayName.length === 0) && <p>Please fill this</p>}
              <div className="two-col-grid">
                <div>
                  <label className="label">
                    Age
                  </label>
                  <input type="number" placeholder="21" className="input" name="age" value={firstFormData.age} onChange={handleChangeFirstForm} />
                  {(!isFirstFilled && firstFormData.age.length === 0) && <p>Please fill this</p>}
                </div>
                <div>
                  <label className="label">
                    Pronouns
                  </label>
                  <input type="text" placeholder="She/Her" className="input" name="pronoun" value={firstFormData.pronoun} onChange={handleChangeFirstForm} />
                  {(!isFirstFilled && firstFormData.pronoun.length === 0) && <p>Please fill this</p>}
                </div>
              </div>
              <label className="label">
                Your Address
              </label>
              <input type="text" placeholder="Address" className="input" name="address" value={firstFormData.address} onChange={handleChangeFirstForm} />
              {(!isFirstFilled && firstFormData.address.length === 0) && <p>Please fill this</p>}
              <div className="emergency">
                Emergency Contact 1
              </div>
              <label className="label">
                Full Name
              </label>
              <br />
              <input type="text" placeholder="John Doe" className="input" name="eContact1Name" value={firstFormData.eContact1Name} onChange={handleChangeFirstForm} />
              {(!isFirstFilled && firstFormData.eContact1Name.length === 0) && <p>Please fill this</p>}
              {(!isFirstFilled && firstFormData.eContact1Name === firstFormData.displayName) && <p>Name cannot be same as client name</p>}
              <div className="two-col-grid">
                <div>
                  <label className="label">
                    Relationship with you
                  </label>
                  <input type="text" placeholder="Father" className="input" name="eContact1Relation" value={firstFormData.eContact1Relation} onChange={handleChangeFirstForm} />
                  {(!isFirstFilled && firstFormData.eContact1Relation.length === 0) && <p>Please fill this</p>}
                </div>
                <div>
                  <label className="label">
                    Contact
                  </label>
                  <input type="tel" placeholder="" className="input" name="eContact1Phone" value={firstFormData.eContact1Phone} onChange={handleChangeFirstForm} />
                  {(!isFirstFilled && firstFormData.eContact1Phone === firstFormData.eContact2Phone) && <p>Please fill different phone numbers</p>}
                </div>
              </div>
              <div className="emergency">
                Emergency Contact 2 (Optional)
              </div>
              <label className="label">
                Full Name
              </label>
              <input type="text" placeholder="John Doe" className="input" name="eContact2Name" value={firstFormData.eContact2Name} onChange={handleChangeFirstForm} />
              {(!isFirstFilled && firstFormData.eContact2Name === firstFormData.displayName) && <p>Name cannot be same as client name</p>}
              <div className="two-col-grid">
                <div>
                  <label className="label">
                    Relationship with you
                  </label>
                  <input type="text" placeholder="Father" className="input" name="eContact2Relation" value={firstFormData.eContact2Relation} onChange={handleChangeFirstForm} />
                </div>
                <div>
                  <label className="label">
                    Contact
                  </label>
                  <input type="tel" placeholder="" className="input" name="eContact2Phone" value={firstFormData.eContact2Phone} onChange={handleChangeFirstForm} />
                </div>
              </div>
              <div className="center grid">
                <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.8617 0.119222L18.8096 2.78587C19.6993 3.08294 20.3008 3.9002 20.3057 4.81608L20.3563 12.7679C20.372 15.1785 19.4931 17.5164 17.8838 19.3482C17.1436 20.1889 16.1949 20.9111 14.9833 21.5569L10.711 23.8407C10.5772 23.9112 10.4301 23.9476 10.2818 23.9488C10.1336 23.9499 9.98529 23.9147 9.85268 23.8454L5.54058 21.6144C4.31578 20.9792 3.35861 20.2676 2.61119 19.4386C0.975315 17.6256 0.0663612 15.2983 0.0506896 12.8841L2.89499e-05 4.9382C-0.00476378 4.02114 0.585936 3.19802 1.47078 2.8892L9.38856 0.127442C9.85871 -0.0392969 10.3831 -0.0428196 10.8617 0.119222ZM14.6624 8.64391C14.3068 8.30221 13.7342 8.30456 13.3834 8.65096L9.34975 12.6269L7.6982 11.0393C7.34257 10.6976 6.77116 10.7011 6.41915 11.0475C6.06835 11.3939 6.07197 11.9505 6.42759 12.2922L8.72168 14.4997C8.90009 14.6712 9.13155 14.7557 9.36301 14.7534C9.59446 14.7522 9.82472 14.6653 10.0007 14.4915L14.6697 9.88858C15.0205 9.54219 15.0168 8.98561 14.6624 8.64391Z" fill="#66B876" />
                </svg>
                <span style={{ marginLeft: '10px' }}>
                  Your information will be kept confidential & will only be shared to a professional.
                </span>
              </div>
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div className="continue-btn" onClick={canProceedFirstForm}>
                Continue
              </div>
            </form>
          )
          : (
            <form className="form">
              <label className="label">
                Are you having suicidal thoughts, or have had it in the past, anytime?
              </label>
              <br />
              <div className="yes-no-div">
                <div>
                  <input type="radio" name="isSuicidal" value="Yes" checked={secondFormData.isSuicidal === 'Yes'} onChange={handleChangeSecondForm} />
                  <label htmlFor="Yes"> Yes</label>
                </div>
                <div>
                  <input type="radio" name="isSuicidal" value="No" checked={secondFormData.isSuicidal === 'No'} onChange={handleChangeSecondForm} />
                  <label htmlFor="No"> No</label>
                </div>
              </div>
              {(!isSecondFilled && secondFormData.isSuicidal.length === 0) && <p>Please fill this</p>}

              <label className="label">
                Have you ever tried self harm?
              </label>
              <br />
              <div className="yes-no-div">
                <div>
                  <input type="radio" name="isSelfHarming" value="Yes" checked={secondFormData.isSelfHarming === 'Yes'} onChange={handleChangeSecondForm} />
                  <label htmlFor="Yes"> Yes</label>
                </div>
                <div>
                  <input type="radio" name="isSelfHarming" value="No" checked={secondFormData.isSelfHarming === 'No'} onChange={handleChangeSecondForm} />
                  <label htmlFor="No"> No</label>
                </div>
              </div>
              {(!isSecondFilled && secondFormData.isSelfHarming.length === 0) && <p>Please fill this</p>}

              <label className="label">
                Have you ever consulted a counselor/ therapist/ psychiatrist before?
              </label>
              <br />
              <div className="yes-no-div">
                <div>
                  <input type="radio" name="consultedBefore" value="Yes" checked={secondFormData.consultedBefore === 'Yes'} onChange={handleChangeSecondForm} />
                  <label htmlFor="Yes"> Yes</label>
                </div>
                <div>
                  <input type="radio" name="consultedBefore" value="No" checked={secondFormData.consultedBefore === 'No'} onChange={handleChangeSecondForm} />
                  <label htmlFor="No"> No</label>
                </div>
              </div>
              {(!isSecondFilled && secondFormData.consultedBefore.length === 0) && <p>Please fill this</p>}

              <label className="label concern-label">
                Select your primary concern for seeking professional help?
              </label>
              <br />
              <div className="primary-concern-div">
                <input type="checkbox" name="primaryConcern" value="extreme-distress" checked={secondFormData.primaryConcern.includes('extreme-distress')} onChange={handleChangeSecondForm} />
                <label>Extreme Distress</label>
                <br />
                <input type="checkbox" name="primaryConcern" value="anxiety" checked={secondFormData.primaryConcern.includes('anxiety')} onChange={handleChangeSecondForm} />
                <label>Anxiety</label>
                <br />
                <input type="checkbox" name="primaryConcern" value="relationship-issues" checked={secondFormData.primaryConcern.includes('relationship-issues')} onChange={handleChangeSecondForm} />
                <label>Relationship issues</label>
                <br />
                <input type="checkbox" name="primaryConcern" value="low-moods" checked={secondFormData.primaryConcern.includes('low-moods')} onChange={handleChangeSecondForm} />
                <label>Low Moods/ Loss of Interest</label>
                <br />
                {/* <input type="checkbox" name="primaryConcern" value="other" checked={secondFormData.primaryConcern.includes('other')} onChange={handleChangeSecondForm} /> */}
                <input type="checkbox" name="primaryConcern" value="other" checked={secondFormData.primaryConcern.includes('other')} onChange={handleTextFieldChange} />
                <label>Other</label>
                <br />
                {primaryConcernTextField && (
                  <textarea type="text" name="primaryConcernText" placeholder="other concern" value={secondFormData.primaryConcernText} onChange={handleTextFieldChange} />
                )}
              </div>

              {(!isSecondFilled && secondFormData.primaryConcern.length === 0) && <p>Please fill this</p>}

              <div className="center grid">
                <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.8617 0.119222L18.8096 2.78587C19.6993 3.08294 20.3008 3.9002 20.3057 4.81608L20.3563 12.7679C20.372 15.1785 19.4931 17.5164 17.8838 19.3482C17.1436 20.1889 16.1949 20.9111 14.9833 21.5569L10.711 23.8407C10.5772 23.9112 10.4301 23.9476 10.2818 23.9488C10.1336 23.9499 9.98529 23.9147 9.85268 23.8454L5.54058 21.6144C4.31578 20.9792 3.35861 20.2676 2.61119 19.4386C0.975315 17.6256 0.0663612 15.2983 0.0506896 12.8841L2.89499e-05 4.9382C-0.00476378 4.02114 0.585936 3.19802 1.47078 2.8892L9.38856 0.127442C9.85871 -0.0392969 10.3831 -0.0428196 10.8617 0.119222ZM14.6624 8.64391C14.3068 8.30221 13.7342 8.30456 13.3834 8.65096L9.34975 12.6269L7.6982 11.0393C7.34257 10.6976 6.77116 10.7011 6.41915 11.0475C6.06835 11.3939 6.07197 11.9505 6.42759 12.2922L8.72168 14.4997C8.90009 14.6712 9.13155 14.7557 9.36301 14.7534C9.59446 14.7522 9.82472 14.6653 10.0007 14.4915L14.6697 9.88858C15.0205 9.54219 15.0168 8.98561 14.6624 8.64391Z" fill="#66B876" />
                </svg>
                <span style={{ marginLeft: '10px' }}>
                  Your information will be kept confidential & will only be shared to a professional.
                </span>
              </div>
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div className="continue-btn" onClick={() => canProceedSecondForm()}>
                Continue
                {loading && (
                  <Box>
                    <CircularProgress color="#ffffff" />
                  </Box>
                )}
              </div>
            </form>
          )}
      </div>
    </div>
  );
}
