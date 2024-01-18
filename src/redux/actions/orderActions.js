// External Import
import axios from 'axios';

// Internal Import
import {
  CREATE_ORDER,
  GET_ORDERS,
  ORDER_ERROR,
  ORDER_LOADING,
  ORDER_CANCEL_REQUEST
} from './types';
import { API_URL } from '../../keys';

const PREFIX = `${API_URL}/order`;

// Get User Token From the Local Storage
const userTokenConfig = () => {
  const token = localStorage.getItem('user-token');
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) config.headers['user-token'] = token;
  return config;
};

// Create Order
export const createOrder = data => dispatch => {
  dispatch({ type: ORDER_LOADING });

  axios
    .post(PREFIX, data, userTokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: CREATE_ORDER, payload: data });
    })
    .catch(err => {
      dispatch({
        type: ORDER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Get Orders of the User
export const getOrders = () => dispatch => {
  dispatch({ type: ORDER_LOADING });

  axios
    .get(`${PREFIX}/user-orders`, userTokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: GET_ORDERS, payload: data });
    })
    .catch(err => {
      dispatch({
        type: ORDER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Create Order Cancel Request For the User
export const orderCancelRequest = groupId => dispatch => {
  dispatch({ type: ORDER_LOADING });

  axios
    .post(`${PREFIX}/cancel-request`, { groupId }, userTokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: ORDER_CANCEL_REQUEST,
        payload: { order: data, groupId }
      });
    })
    .catch(err => {
      dispatch({
        type: ORDER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};
