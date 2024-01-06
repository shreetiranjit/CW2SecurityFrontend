// External Import
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Internal Import
import Footer from './components/footer';
import Navbar from './components/navbar';
import MyRoutes from './myroutes';
import { getUser } from './redux/actions/authActions';
import { notSellerRoute, getCurrentSeller } from './redux/actions/sellerActions';
import { getWishlist } from './redux/actions/wishlistActions';
import { getCart } from './redux/actions/cartActions';
import { getNotifications } from './redux/actions/chatActions';

const App = () => {
  const dispatch = useDispatch();
  const User = useSelector(state => state.Auth);
  const Seller = useSelector(state => state.Seller);
  const Cart = useSelector(state => state.Cart);
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    dispatch(notSellerRoute());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUser());
    dispatch(getWishlist());
    dispatch(getCart(User.isAuthenticated, Cart.products));

    if (User.isAuthenticated) {
      dispatch(getNotifications(false));
      startInterval(false);
    } else {
      clearInterval(intervalId);
    }
  }, [dispatch, User.isAuthenticated]);
  useEffect(() => {
    dispatch(getCurrentSeller());

    if (Seller.isAuthenticated) {
      dispatch(getNotifications(true));
      startInterval(true);
    } else {
      clearInterval(intervalId);
    }
  }, [dispatch, Seller.isAuthenticated]);

  function startInterval(isShop) {
    setIntervalId(
      setInterval(() => {
        dispatch(getNotifications(isShop));
      }, 30000)
    );
  }

  return (
    <Router>
      <Navbar />
      <div
        className='container main-container'
        style={{ paddingTop: Seller.inSellerRoute ? '90px' : '120px' }}
      >
        {<MyRoutes />}
      </div>
      <Footer />
    </Router>
  );
};

export default App;
