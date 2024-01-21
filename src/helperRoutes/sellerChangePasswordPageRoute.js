// External Import
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Internal Import
import { notSellerRoute } from '../redux/actions/sellerActions';

const SellerChangePasswordPageRoute = ({ isResetPasswordSuccess, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(notSellerRoute());
  }, []);

  return isResetPasswordSuccess || isResetPasswordSuccess === null ? (
    <Outlet />
  ) : (
    <Navigate to='/seller/login' />
  );
};

export default SellerChangePasswordPageRoute;
