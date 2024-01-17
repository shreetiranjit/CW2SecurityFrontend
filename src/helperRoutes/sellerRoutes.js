// External Import
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Internal Import
import { sellerRoute } from '../redux/actions/sellerActions';

const SellerRoute = ({ isAuth }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sellerRoute());
  }, []);

  return isAuth ? <Outlet /> : <Navigate to='/seller/login' />;
};

export default SellerRoute;
