// External Import
import axios from 'axios';

// Internal Import
import {
  CREATE_ADDRESS,
  GET_ADDRESSES,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  ADDRESS_ERROR,
  ADDRESS_LOADING,
  SELECT_ADDRESS,
  CREATE_BILLING_ADDRESS,
  SELECT_BILLING_ADDRESS,
  DELETE_BILLING_ADDRESS,
  UPDATE_BILLING_ADDRESS
} from './types';
import { API_URL } from '../../keys';

// Get User Token From the Local Storage
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

// Create New User Address
export const createAddress = (data, isBillingAddress) => dispatch => {
  dispatch({ type: ADDRESS_LOADING });

  const addressObject = {
    ...data,
    addressType: isBillingAddress ? 'billing' : 'delivery'
  };

  axios
    .post(`${API_URL}/address`, addressObject, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: isBillingAddress ? CREATE_BILLING_ADDRESS : CREATE_ADDRESS,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: ADDRESS_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Get All Addresses of the User
export const getAddresses = () => dispatch => {
  dispatch({ type: ADDRESS_LOADING });

  axios
    .get(`${API_URL}/address`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: GET_ADDRESSES,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: ADDRESS_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Update Existing Address
export const updateAddress = (id, data, isBillingAddress) => dispatch => {
  dispatch({ type: ADDRESS_LOADING });

  axios
    .put(`${API_URL}/address/${id}`, data, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: isBillingAddress ? UPDATE_BILLING_ADDRESS : UPDATE_ADDRESS,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: ADDRESS_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Delete Address of the User
export const deleteAddress = (id, isBillingAddress) => dispatch => {
  dispatch({ type: ADDRESS_LOADING });

  axios
    .delete(`${API_URL}/address/${id}`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: isBillingAddress ? DELETE_BILLING_ADDRESS : DELETE_ADDRESS,
        payload: id
      });
    })
    .catch(err => {
      dispatch({
        type: ADDRESS_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Select Address of the User
export const selectAddress = address => {
  return { type: SELECT_ADDRESS, payload: address };
};

// Select Billing Address of the User
export const selectBillingAddress = address => {
  return { type: SELECT_BILLING_ADDRESS, payload: address };
};
