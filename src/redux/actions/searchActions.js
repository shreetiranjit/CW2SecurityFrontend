// External Import
import axios from 'axios';

// Internal Import
import { SEARCH_PRODUCT, SEARCH_PRODUCT_LOADING, GET_PRODUCTS_BY_CATEGORY } from './types';
import { categories, subCategories } from '../../data/category';
import { API_URL } from '../../keys';

const prefix = `${API_URL}/product/search/`;

// Search Products
export const searchProduct = query => dispatch => {
  dispatch({ type: SEARCH_PRODUCT_LOADING });

  axios
    .get(prefix + query)
    .then(res => res.data)
    .then(data => {
      let searchedBrands = new Set();
      let brandsOfResults = new Set();
      let sellerSet = new Set();
      let categoriesSet = new Set();
      let products = [];

      products = data.products;

      data.brands.forEach(item => {
        searchedBrands.add(item.brand);
      });

      data.products.forEach(item => {
        categoriesSet.add(item.category);
        categoriesSet.add(item.subCategory);
        brandsOfResults.add(item.brand);
        sellerSet.add(item.shop.companyName);
      });

      if (data.products.length < 1) {
        products = data.brands;
      }

      dispatch({
        type: SEARCH_PRODUCT,
        payload: {
          Categories: [...categoriesSet],
          SearchedBrands: [...searchedBrands],
          BrandsOfResults: [...brandsOfResults],
          Sellers: [...sellerSet],
          products,
          query
        }
      });
    });
};

// Get Products By Category
export const getProductsByCategory = category => dispatch => {
  dispatch({ type: SEARCH_PRODUCT_LOADING });

  axios
    .get(`${API_URL}/product/category/` + category)
    .then(res => res.data)
    .then(data => {
      let brandsOfResults = new Set();
      let sellerSet = new Set();
      let categoriesSet = new Set();
      let products = data;

      data.forEach(item => {
        categoriesSet.add(item.category);
        categoriesSet.add(item.subCategory);
        brandsOfResults.add(item.brand);
        sellerSet.add(item.shop.companyName);
      });

      dispatch({
        type: GET_PRODUCTS_BY_CATEGORY,
        payload: {
          Categories: subCategories[categories.indexOf(category)],
          BrandsOfResults: [...brandsOfResults],
          Sellers: [...sellerSet],
          products
        }
      });
    });
};
