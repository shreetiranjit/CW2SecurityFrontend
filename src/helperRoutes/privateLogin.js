// External Import
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Internal Import
import { notSellerRoute } from '../redux/actions/sellerActions';

const PrivateLogin = ({ auth, isSeller }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(notSellerRoute());
  }, []);

  return auth ? isSeller ? <Navigate to='/seller/home' /> : <Navigate to='/' /> : <Outlet />;
};

export default PrivateLogin;
