// External Import
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Internal Import
import { notSellerRoute } from '../redux/actions/sellerActions';

const PrivateRoute = ({ auth, isSeller }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(notSellerRoute());
  }, []);

  return auth ? <Outlet /> : isSeller ? <Navigate to='/seller/login' /> : <Navigate to='/auth' />;
};

export default PrivateRoute;
