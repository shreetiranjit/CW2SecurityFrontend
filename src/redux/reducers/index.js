// External Import
import { combineReducers } from 'redux';

// Internal Import
import { Auth } from './authReducer';
import { Seller } from './sellerReducer';
import { Product } from './productReducer';
import { Error } from './errorReducer';
import { Cart } from './cartReducer';
import { Wishlist } from './wishlistReducer';
import { RateSeller } from './sellerRatingReducer';
import { ProductReview } from './productReviewReducer';
import { Search } from './searchReducer';
import { Address } from './addressReducer';
import { Order } from './orderReducer';
import { Chat } from './chatReducer';

function lastAction(state = null, action) {
  return action.type;
}

// Combine All Reducers into One
const reducers = combineReducers({
  Auth,
  Seller,
  Error,
  Product,
  Cart,
  Wishlist,
  RateSeller,
  ProductReview,
  Search,
  Address,
  Order,
  Chat,
  lastAction
});

export default reducers;
