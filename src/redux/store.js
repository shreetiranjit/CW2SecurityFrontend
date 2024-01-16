// External Import
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

// Internal Import
import reducers from './reducers';
import {
  GET_WISHLIST,
  ADD_WISHLIST,
  REMOVE_WISHLIST,
  ADD_CART,
  REMOVE_ALL_CART_ITEM,
  REMOVE_CART_ITEM,
  GET_CART,
  INCREASE_CART_ITEM,
  DECREASE_CART_ITEM,
  SELECT_CART_ITEM,
  DONT_SELECT_CART_ITEM
} from './actions/types';
import { API_URL } from '../keys';

const initialState = {};
const middleware = [thunk];

// Initialize Store with reducers and middleware
const Store = createStore(reducers, initialState, compose(applyMiddleware(...middleware)));

// Get Token from Local Storage
const tokenConfig = () => {
  const token = localStorage.getItem('user-token');
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) config.headers['user-token'] = token;
  return config;
};

// Subscribe to store changes
Store.subscribe(() => {
  const {
    Wishlist: { products },
    lastAction,
    Auth,
    Cart
  } = Store.getState();
  localStorage.setItem('Cart', JSON.stringify(Cart.products));

  if (!Auth.isAuthenticated && lastAction === GET_CART) {
    localStorage.setItem('Cart', JSON.stringify(Cart.products));
  }

  if (Auth.isAuthenticated) {
    localStorage.setItem('Wishlist', JSON.stringify(products));
    if (
      lastAction === ADD_WISHLIST ||
      lastAction === REMOVE_WISHLIST ||
      lastAction === GET_WISHLIST
    ) {
      axios.post(`${API_URL}/wishlist/update`, { products }, tokenConfig());
    }
    if (
      lastAction === ADD_CART ||
      lastAction === REMOVE_ALL_CART_ITEM ||
      lastAction === REMOVE_CART_ITEM ||
      lastAction === INCREASE_CART_ITEM ||
      lastAction === DECREASE_CART_ITEM ||
      lastAction === SELECT_CART_ITEM ||
      lastAction === DONT_SELECT_CART_ITEM
    ) {
      axios.post(`${API_URL}/cart/update`, { products: Cart.products }, tokenConfig());
    }
  }
});

// Export Store
export default Store;
