// External Import
import axios from 'axios';

// Internal Import
import {
  ADD_REVIEW,
  UPDATE_REVIEW,
  GET_REVIEWS,
  DELETE_REVIEW,
  LOADING,
  PRODUCT_REVIEW_ERROR
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

// Get Reviews of a product By Product Id
export const getReviews = productId => dispatch => {
  dispatch({ type: LOADING });

  axios
    .get(`${API_URL}/review/product/${productId}`)
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: GET_REVIEWS,
        payload: { reviews: data.reviews, average: data.average }
      });
    })
    .catch(err => {
      dispatch({
        type: PRODUCT_REVIEW_ERROR,
        payload: {
          message: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Add Review (for User)
export const addReview = (rating, text, productId) => dispatch => {
  dispatch({ type: LOADING });

  axios
    .post(`${API_URL}/review/product/${productId}/review`, { rating, text }, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: ADD_REVIEW,
        payload: { review: data.review, average: data.average }
      });
    })
    .catch(err => {
      dispatch({
        type: PRODUCT_REVIEW_ERROR,
        payload: {
          message: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Update Review(for user)
export const updateReview = (id, rating, text) => dispatch => {
  dispatch({ type: LOADING });

  axios
    .put(`${API_URL}/review/${id}`, { rating, text }, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: UPDATE_REVIEW,
        payload: { review: data.updatedReview, average: data.average }
      });
    })
    .catch(err => {
      dispatch({
        type: PRODUCT_REVIEW_ERROR,
        payload: {
          message: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

// Delete Review(for user)
export const deleteReview = id => dispatch => {
  dispatch({ type: LOADING });

  axios
    .delete(`${API_URL}/review/${id}`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: DELETE_REVIEW, payload: { id, average: data.average } });
    })
    .catch(err => {
      dispatch({
        type: PRODUCT_REVIEW_ERROR,
        payload: {
          message: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};
