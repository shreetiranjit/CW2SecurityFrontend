// External Import
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Internal Import
import { notSellerRoute } from '../redux/actions/sellerActions';

const PasswordResetRoute = ({ isPasswordReset, isAuthenticated }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(notSellerRoute());
  }, []);

  return !isPasswordReset || isAuthenticated ? <Navigate to='/auth' /> : <Outlet />;
};

export default PasswordResetRoute;
