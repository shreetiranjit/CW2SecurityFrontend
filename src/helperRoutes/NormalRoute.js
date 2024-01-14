// External Import
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Internal Import
import { notSellerRoute } from '../redux/actions/sellerActions';

const NormalRoute = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(notSellerRoute());
  }, []);

  return <Outlet />;
};

export default NormalRoute;
