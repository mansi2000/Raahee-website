import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import DiscountIcon from '../../assets/DiscountIcon.svg';
import Coupon from '../discountCoupons/coupon';
import './Coupons.scss';

function Coupons({ therapistCoupons, setDiscount, couponApplied, setCouponApplied }) {
  const user = JSON.parse(localStorage.getItem('profile')).user;
  // const mhp = JSON.parse(localStorage.getItem('therapistDetails')).props;
  const [couponCode, setCouponCode] = useState('');
  const [couponWarning, setCouponWarning] = useState('');
  const couponsList = [
    // {
    //   couponCode: 'WELCOME20',
    //   couponValue: 20,
    // },
    // {
    //   couponCode: 'RAAHEE30',
    //   couponValue: 30,
    // },
    // {
    //   couponCode: 'MHEALTH15',
    //   couponValue: 15,
    // },
  ];

  const removeCoupon = () => {
    setDiscount(0);
    setCouponApplied({ couponCode: '', couponValue: 0 });
  };

  const applyCustomCoupon = () => {
    if (couponCode !== '') {
      console.log('these are coupons', therapistCoupons);
      const couponToBeApplied = therapistCoupons.find((coupon) => coupon.couponCode === couponCode);
      // console.log(couponToBeApplied.allowedClients);
      const isClientAllowed = couponToBeApplied.allowedClients.split('$').find((c) => c === user.email);
      // const isCouponAvailable = user.coupons_available.find((coupon) => coupon.couponCode === couponCode);
      if ((couponToBeApplied !== undefined && isClientAllowed !== undefined) || (couponToBeApplied !== undefined && couponToBeApplied.allowedClients.length === 0)) {
        if (user.usedCoupons?.split('$').includes(couponCode)) {
          setCouponWarning('Offer valid only once per user');
        }
        setCouponApplied({ couponCode: couponToBeApplied.couponCode, couponValue: couponToBeApplied.couponValue });
        setDiscount(couponToBeApplied.couponValue);
        setCouponWarning('');
      } else {
        setCouponWarning('Invalid Coupon Code');
      }
    }
    setCouponCode('');
  };

  return (
    <div className="applyOffer">
      <div className="applyOffer__header">
        <div className="applyOffer__text">
          <img id="discount" src={DiscountIcon} alt="discount" />
          <div className="applyOffer__availibility">
            <p id="text">Apply Offers</p>
            <p id="avb">
              {couponsList.length}
              {' '}
              available
            </p>
          </div>
        </div>
        {couponApplied.couponValue === 0 ? (
          <div className="applyOffer__couponWarning">
            <div className="applyOffer__customCoupon">
              <input placeholder="Apply Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
              <button className="btn btn--primary text-capitalize text-white" onClick={applyCustomCoupon}>
                Apply
              </button>
            </div>
            <p>{couponWarning}</p>
          </div>
        ) : (
          <div className="applyOffer__couponApplied">
            <img id="discount" src={DiscountIcon} alt="discount" />
            <p>
              {couponApplied.couponCode}
              {' '}
              offer applied
            </p>
            <CloseIcon onClick={() => removeCoupon()} />
          </div>
        )}
      </div>
      <hr />
      {couponsList.map((coupon, i) => (
        <Coupon key={i} coupon={coupon} setDiscount={setDiscount} couponApplied={couponApplied} setCouponApplied={setCouponApplied} setCouponWarning={setCouponWarning} />
      ))}
    </div>
  );
}

export default Coupons;
