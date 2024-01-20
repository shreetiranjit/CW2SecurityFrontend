// External Import
import axios from 'axios';

// Internal Import
import {
  GET_RATED_SELLERS_FOR_SELLER,
  GET_RATED_SELLERS_FOR_USER,
  DELETE_SELLER_RATING,
  RATE_SELLER,
  RATE_SELLER_LOADING,
  RATE_SELLER_ERROR
} from './types';
import { API_URL } from '../../keys';

const prefix = `${API_URL}/seller_rating`;

// Get Token of the Logged in Seller
const sellerTokenConfig = () => {
  const token = localStorage.getItem('shop-token');
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) config.headers['shop-token'] = token;
  return config;
};

// Get Token of the Logged in user
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

// Get Rated Sellers for the Logged in Seller
export const getRatedSellersForSeller = () => dispatch => {
  dispatch({ type: RATE_SELLER_LOADING });

  axios
    .get(prefix + '/seller_ratings', sellerTokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: GET_RATED_SELLERS_FOR_SELLER, payload: data });
    })
    .catch(err => {
      dispatch({
        type: RATE_SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Get Rated Sellers for the User
export const getRatedSellersForUser = () => dispatch => {
  dispatch({ type: RATE_SELLER_LOADING });
  axios
    .get(prefix + '/user_ratings', tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: GET_RATED_SELLERS_FOR_USER, payload: data });
    })
    .catch(err => {
      dispatch({
        type: RATE_SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Delete Seller Rating(for User)
export const deleteSellerRating = (id, seller) => dispatch => {
  dispatch({ type: RATE_SELLER_LOADING });

  axios
    .delete(`${prefix}/${id}`, tokenConfig())
    .then(() => {
      dispatch({ type: DELETE_SELLER_RATING, payload: { id, seller } });
    })
    .catch(err => {
      dispatch({
        type: RATE_SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Rate Seller for the User
export const rateSeller = data => dispatch => {
  dispatch({ type: RATE_SELLER_LOADING });

  axios
    .post(prefix, data, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: RATE_SELLER, payload: { data, seller: data.seller } });
    })
    .catch(err => {
      dispatch({
        type: RATE_SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};
