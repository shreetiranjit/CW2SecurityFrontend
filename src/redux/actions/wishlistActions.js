// External Import
import axios from 'axios';

// Internal Import
import {
  ADD_WISHLIST,
  GET_WISHLIST,
  REMOVE_ALL_WISHLIST,
  REMOVE_WISHLIST,
  LOADING,
  WISHLIST_ERROR
} from './types';
import { API_URL } from '../../keys';

// Get User Token from local Storage
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

// Get Wishlist of the User
export const getWishlist = () => dispatch => {
  dispatch({ type: LOADING });

  axios
    .get(`${API_URL}/wishlist`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: GET_WISHLIST, payload: data });
    })
    .catch(err => {
      dispatch({
        type: WISHLIST_ERROR,
        payload: {
          message: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Add Product to the Wishlist
export const addItem = product => {
  return { type: ADD_WISHLIST, payload: product };
};

// Remove Product from the Wishlist
export const removeItem = id => {
  return { type: REMOVE_WISHLIST, payload: id };
};

// Remove All Product from the Wishlist
export const removeAllItems = () => dispatch => {
  dispatch({ type: LOADING });
  axios
    .delete(`${API_URL}/wishlist/remove_all`, tokenConfig())
    .then(() => dispatch({ type: REMOVE_ALL_WISHLIST }))
    .catch(err => {
      dispatch({
        type: WISHLIST_ERROR,
        payload: {
          message: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};
