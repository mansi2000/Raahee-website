import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { useLocation, useParams } from 'react-router-dom';
import './bookingPage.scss';
import Info from '../../components/bookingPage/Info';
import Order from '../../components/bookingPage/Order';
import Coupons from '../../components/bookingPage/Coupons';
import { fetchMhpById } from '../../api';

const BookingPage = () => {
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState({ couponCode: '', couponValue: 0 });
  const [data, setData] = useState({ fees: 0, therapistCoupons: [] });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { mhpID } = useParams();
  const therapistID = mhpID.split('-').splice(-1);
  // const history = useHistory();
  useEffect(() => {
    fetchMhpById(therapistID).then((mhpD) => {
      const { fees, therapist_coupons: therapistCoupons } = mhpD.data[0];
      setData({ fees, therapistCoupons });
      setLoading(false);
    });
  }, []);

  if (location.state === undefined || location.state === null || location.state === '') {
    // history.push('/');
    console.log('Hi');
  }

  return (
    <>
      {!loading ? (
        <div className="bookingPage">
          <h3 className="bookingPage__heading">Confirm your Booking for</h3>
          <div className="bookingPage__content">
            <div className="left">
              <Info />
              <Coupons therapistCoupons={data.therapistCoupons} setDiscount={setDiscount} couponApplied={couponApplied} setCouponApplied={setCouponApplied} />
            </div>
            <div className="right">
              <Order therapyFees={data.fees} discount={discount} couponApplied={couponApplied} />
            </div>
          </div>
        </div>
      ) : (
        <Box sx={{ color: 'grey.500', display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress color="secondary" />
        </Box>
      )}
    </>
  );
};

export default BookingPage;
