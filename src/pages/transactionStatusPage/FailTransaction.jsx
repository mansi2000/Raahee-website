import React from 'react';
import './FailTransaction.scss';
import Support from '../../assets/supportIcon.svg';
import failedTransaction from '../../assets/transaction__failure.png';

function FailTransaction() {
  const user = JSON.parse(localStorage.getItem('profile')).user;

  return (
    <div className="failed__transaction">
      <img className="payment__image" src={failedTransaction} alt="failed transaction" />
      <div className="title__payment">
        <span>Your session was not booked.</span>
        <p>
          Don't worry
          {' '}
          {user.displayName.split(' ')[0]}
          . If money is deducted, it would be refunded in 3-5 business days
        </p>
        <p>
          Try booking once again or contact us for help
        </p>
      </div>
      <button className="support__button btn btn--primary text-capitalize text-white">
        <img src={Support} alt="support img" />
        Contact Raahee Support
      </button>
    </div>
  );
}

export default FailTransaction;
