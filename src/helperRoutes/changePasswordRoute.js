// External Import
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Internal Import
import { notSellerRoute } from '../redux/actions/sellerActions';

const ChangePasswordRoute = ({
  isPasswordReset,
  confirmationCode,
  confirmationSuccess,
  emailOrUsername,
  isAuthenticated
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(notSellerRoute());
  }, []);

  return !isPasswordReset ||
    !confirmationSuccess ||
    isAuthenticated ||
    emailOrUsername === null ||
    confirmationCode === null ? (
    <Navigate to='/auth' />
  ) : (
    <Outlet />
  );
};

export default ChangePasswordRoute;
