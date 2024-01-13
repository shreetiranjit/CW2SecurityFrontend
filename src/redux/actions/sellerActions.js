// External Import
import axios from 'axios';

// Internal Import
import {
  SELLER_REGISTER,
  SELLER_LOGIN,
  SELLER_LOADING,
  SELLER_LOGOUT,
  SELLER_ERROR,
  GET_CURRENT_SELLER,
  SELLER_RESET_PASSWORD_ERROR,
  SELLER_CHANGE_PASSWORD,
  SELLER_CHECK_PASSWORD_TOKEN,
  SELLER_SEND_FORGOT_PASSWORD_EMAIL,
  SELLER_RESET_PASSWORD_TOKEN_ERROR,
  NOT_SELLER_ROUTE,
  SELLER_ROUTE,
  LOADING,
  UPDATE_SELLER,
  GET_ALL_SELLER_PRODUCTS,
  SELLER_DELETE_PRODUCT,
  SELLER_UPDATE_PRODUCT,
  GET_SELLER_ORDERS,
  DENY_ORDER_CANCEL_REQUEST,
  CANCEL_ORDER,
  CHANGE_ORDER_STATUS
} from './types';
import { logoutUser } from './authActions';
import { API_URL } from '../../keys';

// Token Config
const tokenConfig = () => {
  const token = localStorage.getItem('shop-token');
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) config.headers['shop-token'] = token;
  return config;
};

// Seller Registration
export const sellerRegister = data => dispatch => {
  dispatch({ type: SELLER_LOADING });

  axios
    .post(`${API_URL}/shop/create`, data)
    .then(res => res.data)
    .then(data => {
      dispatch(logoutUser());
      dispatch({ type: SELLER_REGISTER, payload: data });
    })
    .catch(err => {
      dispatch({
        type: SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Seller Login
export const sellerLogin = (email, password) => dispatch => {
  dispatch({ type: SELLER_LOADING });

  axios
    .post(`${API_URL}/shop/login`, { email, password })
    .then(res => res.data)
    .then(data => {
      dispatch(logoutUser());
      dispatch({ type: SELLER_LOGIN, payload: data });
    })
    .catch(err => {
      dispatch({
        type: SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Send Forgot Password Email
export const sendForgotPasswordEmail = (email, origin) => dispatch => {
  dispatch({ type: LOADING });
  axios
    .post(`${API_URL}/shop/sendEmail`, {
      email,
      origin
    })
    .then(() => {
      dispatch({ type: SELLER_SEND_FORGOT_PASSWORD_EMAIL });
    })
    .catch(err => {
      dispatch({
        type: SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Confirm Password Token Send to the Email
export const confirmPasswordResetToken = (email, shopToken) => dispatch => {
  dispatch({ type: LOADING });

  axios
    .post(`${API_URL}/shop/checkToken`, {
      email,
      shopToken
    })
    .then(() => {
      dispatch({ type: SELLER_CHECK_PASSWORD_TOKEN });
    })
    .catch(err => {
      dispatch({ type: SELLER_RESET_PASSWORD_TOKEN_ERROR });
    });
};

// Reset Password
export const resetPassword = (newPassword, confirmPassword, email, token) => dispatch => {
  dispatch({ type: LOADING });

  axios
    .post(
      `${API_URL}/shop/changePassword`,
      { newPassword, confirmPassword, email },
      { headers: { 'password-token': token } }
    )
    .then(() => {
      dispatch({ type: SELLER_CHANGE_PASSWORD });
    })
    .catch(err => {
      dispatch({ type: SELLER_RESET_PASSWORD_ERROR });
    });
};

// Get Current Seller
export const getCurrentSeller = () => dispatch => {
  axios
    .get(`${API_URL}/shop/current`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: GET_CURRENT_SELLER, payload: { shop: data } });
    })
    .catch(err => {
      dispatch({
        type: SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Update Seller Profile
export const sellerUpdateProfile = (data, sellerId) => dispatch => {
  dispatch({ type: SELLER_LOADING });

  axios
    .put(`${API_URL}/shop/update/${sellerId}`, data, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: UPDATE_SELLER, payload: data });
    })
    .catch(err => {
      dispatch({
        type: SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Update Seller Product
export const updateProduct = (id, data) => dispatch => {
  dispatch({ type: SELLER_LOADING });

  axios
    .put(`${API_URL}/product/${id}`, data, {
      headers: {
        'shop-token': localStorage.getItem('shop-token'),
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: SELLER_UPDATE_PRODUCT,
        payload: { id, updatedProduct: data }
      });
    })
    .catch(err => {
      dispatch({
        type: SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Get All Product of the Seller
export const getAllSellerProducts = () => dispatch => {
  dispatch({ type: SELLER_LOADING });

  axios
    .get(`${API_URL}/product/products/all`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: GET_ALL_SELLER_PRODUCTS, payload: data });
    })
    .catch(err => {
      dispatch({
        type: SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Delete Product of the Seller
export const deleteProduct = id => dispatch => {
  dispatch({ type: SELLER_LOADING });

  axios
    .delete(`${API_URL}/product/${id}`, tokenConfig())
    .then(() => {
      dispatch({ type: SELLER_DELETE_PRODUCT, payload: id });
    })
    .catch(err => {
      dispatch({
        type: SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Change Order Status for the Seller
export const changeOrderStatus = (groupId, status) => dispatch => {
  dispatch({ type: SELLER_LOADING });

  axios
    .post(`${API_URL}/order/change-status`, { groupId, status }, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: CHANGE_ORDER_STATUS,
        payload: { groupId, newOrders: data }
      });
    })
    .catch(err => {
      dispatch({
        type: SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Cancel Order by the Seller
export const cancelOrder = groupId => dispatch => {
  dispatch({ type: SELLER_LOADING });

  axios
    .post(`${API_URL}/order/refund`, { groupId }, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: CANCEL_ORDER, payload: { groupId, newOrders: data } });
    })
    .catch(err => {
      dispatch({
        type: SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Deny Order Cancel Request by the Seller
export const denyOrderCancelRequest = groupId => dispatch => {
  dispatch({ type: SELLER_LOADING });

  axios
    .post(`${API_URL}/order/cancel-request/deny`, { groupId }, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: DENY_ORDER_CANCEL_REQUEST,
        payload: { groupId, newOrders: data }
      });
    })
    .catch(err => {
      dispatch({
        type: SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Get Seller Orders
export const getSellerOrders = () => dispatch => {
  dispatch({ type: SELLER_LOADING });

  axios
    .get(`${API_URL}/order/seller-orders`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: GET_SELLER_ORDERS, payload: data });
    })
    .catch(err => {
      dispatch({
        type: SELLER_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Seller
export const sellerRoute = () => {
  return { type: SELLER_ROUTE };
};

// Not Seller
export const notSellerRoute = () => {
  return { type: NOT_SELLER_ROUTE };
};

// Seller Logout
export const sellerLogout = () => {
  return { type: SELLER_LOGOUT };
};

// Loading Action
export const loading = () => {
  return { type: SELLER_LOADING };
};
