// External Import
import axios from 'axios';

// Internal Import
import { CREATE_PRODUCT, PRODUCT_ERROR, PRODUCT_LOADING, GET_PRODUCT_BY_ID } from './types';
import { API_URL } from '../../keys';

// Add New Product
export const createProduct = data => dispatch => {
  dispatch({ type: PRODUCT_LOADING });

  axios
    .post(`${API_URL}/product/new`, data, {
      headers: {
        'shop-token': localStorage.getItem('shop-token'),
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => res.data)
    .then(data => {
      dispatch({ type: CREATE_PRODUCT, payload: data });
    })
    .catch(err => {
      dispatch({
        type: PRODUCT_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};

export const productLoading = () => {
  return { type: PRODUCT_LOADING };
};

export const getProductById = id => dispatch => {
  dispatch({ type: PRODUCT_LOADING });

  axios
    .get(`${API_URL}/product/${id}`)
    .then(res => {
      return res.data;
    })
    .then(data => {
      console.log(data);
      dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: {
          Product: data.Product,
          wishlistCount: data.wishlistCount
        }
      });
    })
    .catch(err => {
      dispatch({
        type: PRODUCT_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status
        }
      });
    });
};
