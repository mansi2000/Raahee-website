import React, { useEffect, useState } from 'react';
import welcome from '../../assets/coupon.svg';

const Coupon = ({ coupon, setDiscount, couponApplied, setCouponApplied, setCouponWarning }) => {
  // const mhp = JSON.parse(localStorage.getItem('therapistDetails')).props;
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  useEffect(() => {
    if (couponApplied.couponCode !== coupon.couponCode) {
      setIsCouponApplied(false);
    }
  }, [couponApplied]);

  const applyCoupon = () => {
    setIsCouponApplied(true);
    setDiscount(coupon.couponValue);
    setCouponApplied({ couponCode: coupon.couponCode, couponValue: coupon.couponValue });
    setCouponWarning('');
  };

  return (
    <div>
      <div className="coupon__desc">
        <div className="coupon__code">
          <div className="applyOffer__coupon">
            <img src={welcome} alt="" />
            <div className="text">
              {coupon.couponCode}
            </div>
          </div>
          <div className="coupon__details">
            <p style={{ fontWeight: 'bold' }}>
              Get
              {' '}
              {coupon.couponValue}
              % OFF
            </p>
            <p>for any session</p>
            <p>Applicable for 1 session</p>
            <p style={{ color: '#39B150', fontWeight: 'bold' }}>
              You save
              {' '}
              ₹
              {(coupon.couponValue).toFixed(0)}
            </p>
          </div>
        </div>
        {!isCouponApplied ? (
          <button className="btn btn--primary text-capitalize text-white" onClick={() => applyCoupon()}>
            Apply
          </button>
        ) : (
          <button className="btn btn--primary text-capitalize text-white">
            Applied
          </button>
        )}
      </div>
      <hr />
    </div>
  );
};
export default Coupon;
