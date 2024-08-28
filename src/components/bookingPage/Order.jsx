import React from 'react';
import { useDispatch } from 'react-redux';
import { withSnackbar } from 'notistack';
import { useHistory, useParams } from 'react-router-dom';
import { getMhps } from '../../actions/mhps';
import { scheduleAppointment } from '../../actions/therapySchedule';
import { updateProfile, sendEmail } from '../../api';
import raaheeLogo from '../../assets/Main-logo.png';
import './Order.scss';

function Order({ therapyFees, discount, couponApplied, enqueueSnackbar }) {
  const { mhpID } = useParams();
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('profile'));
  const user = userData.jwt;
  const mhp = JSON.parse(localStorage.getItem('therapistDetails')).props;
  const bookedSlot = JSON.parse(localStorage.getItem('bookedSlot'));
  const history = useHistory();
  const amountPostDiscount = bookedSlot.sessionType === 'Consultation Call' ? 0 : therapyFees - discount;
  const taxes = bookedSlot.sessionType === 'Consultation Call' ? 0 : Math.floor(amountPostDiscount * 0.0236 * 1.18) + 1;
  const amountToPay = bookedSlot.sessionType === 'Consultation Call' ? 0 : (amountPostDiscount + taxes).toFixed(0);

  const sendInviteMails = () => {
    const emailDataUser = {
      email: userData.user.email,
      subject: 'Appointment for Raahee Session',
      content: `Hello ${userData.user.displayName},<br>Your appointment with ${mhp.displayName} has been successfully scheduled. Kindly visit this <a href="https://raahee.in/profile">link</a> for further details.<br><br>Regards,<br>Raahee`,
    };
    sendEmail(emailDataUser)
      .then(() => {
        enqueueSnackbar(
          'Appointment Successful! Check your email for further details.',
          {
            variant: 'success',
            autoHideDuration: 4000,
          },
        );
        console.log('E-mail sent to user');
      })
      .catch((error) => {
        console.log(error);
      });
    // original link for mhp has to be added
    const emailDataMHP = {
      email: mhp.email,
      subject: 'Appointment for Raahee Session',
      content: `Hello ${mhp.name},<br>You have new appointments for Raahee sessions. Kindly visit this <a href="https://testmhp.netlify.app/appointments">link</a> for further details.<br><br>Regards,<br>Raahee`,
    };
    sendEmail(emailDataMHP)
      .then(() => {
        console.log('E-mail sent to therapist');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bookAppointment = () => {
    dispatch(scheduleAppointment(bookedSlot.id, false))
      .then(() => {
        dispatch(getMhps());
      });
  };

  const bookFreeConsultation = () => {
    bookAppointment();
    sendInviteMails();
    updateProfile({ usedCoupons: user.usedCoupons ? user.usedCoupons + '$' + couponApplied.couponCode : couponApplied.couponCode, usedTherapistFreeConsultations: user.usedTherapistFreeConsultations + '$' + mhp.id })
      .then((userData) => {
        const loggedInUser = JSON.parse(localStorage.getItem('profile'));
        loggedInUser.user = userData.data;
        localStorage.setItem('profile', JSON.stringify(loggedInUser));
      });
    history.replace(`/therapists/${mhpID}/success`);
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    if (user) {
      const res = await loadScript(
        'https://checkout.razorpay.com/v1/checkout.js',
      );

      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${JSON.parse(localStorage.getItem('profile')).jwt}` },
        body: JSON.stringify({ amount: `${amountToPay}` }),
      };

      const data = await fetch(
        'https://raahee-server.eastus.cloudapp.azure.com/razorpay',
        requestOptions,
      ).then((t) => t.json());
      console.log(data);

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        currency: data.currency,
        amount: (amountToPay * 100).toString(),
        name: 'Raahee Appointment',
        description:
          "Let's get your appointment scheduled with our trusted Mental Health Professionals!",
        image: raaheeLogo,
        order_id: data.id,
        handler: (response) => {
          console.log(response.razorpay_payment_id);
          bookAppointment();
          sendInviteMails();
          updateProfile({ usedCoupons: user.usedCoupons ? user.usedCoupons + '$' + couponApplied.couponCode : couponApplied.couponCode })
            .then((userData) => {
              const loggedInUser = JSON.parse(localStorage.getItem('profile'));
              loggedInUser.user = userData.data;
              localStorage.setItem('profile', JSON.stringify(loggedInUser));
            });
          history.replace(`/therapists/${mhpID}/success`);
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#aa66cc',
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on('payment.failed', (response) => {
        history.push(`/therapists/${mhpID}/failure`);
        console.log(response.error);
      });
    }
  }

  return (
    <div className="order">
      <hr />
      <h5>Order Summary</h5>
      <div className="order__row">
        <p>Total</p>
        <p>
          ₹
          {bookedSlot.sessionType === 'Consultation Call' ? 0 : therapyFees}
        </p>
      </div>
      <div className="order__row">
        <p>Gateway Charges</p>
        <p>
          ₹
          {taxes}
        </p>
      </div>
      {discount !== 0
        && (
          <div className="order__row discount">
            <h6>Total Discount</h6>
            <h6>
              -₹
              {discount}
            </h6>
          </div>
        )}
      <div className="order__row">
        <h6>Total Payable</h6>
        <h6>
          ₹
          {amountToPay}
        </h6>
      </div>
      {discount !== 0
        && (
          <div className="discount">
            <h6>
              Yay! You saved ₹
              {discount}
              🎉
            </h6>
          </div>
        )}
      <hr />
      {bookedSlot.sessionType === 'Consultation Call' ? (
        <button className="order__pay btn btn--primary text-capitalize text-white" onClick={bookFreeConsultation}>
          Book Appointment
        </button>
      ) : (
        <button className="order__pay btn btn--primary text-capitalize text-white" onClick={displayRazorpay}>
          Proceed to pay
        </button>
      )}
    </div>
  );
}

export default withSnackbar(Order);
