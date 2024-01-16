// External Import
import _ from 'lodash';

// Internal Import
import {
  CREATE_ORDER,
  GET_ORDERS,
  ORDER_ERROR,
  ORDER_LOADING,
  ORDER_CANCEL_REQUEST
} from '../actions/types';

// Initial State for Order
const initialState = {
  orders: {},
  error: null,
  loading: false
};

export function Order(state = initialState, action) {
  let groupedOrders = {};
  switch (action.type) {
    case CREATE_ORDER:
      groupedOrders = _.groupBy([action.payload], order => order.groupId);

      return {
        ...state,
        orders: { ...groupedOrders, ...state.orders },
        loading: false,
        error: null
      };
    case GET_ORDERS:
      groupedOrders = _.groupBy(action.payload, order => order.groupId);
      return {
        ...state,
        orders: groupedOrders,
        loading: false,
        error: null
      };
    case ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: { msg: action.payload.msg, status: action.payload.status }
      };
    case ORDER_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ORDER_CANCEL_REQUEST:
      let tempOrders = { ...state.orders };
      tempOrders[action.payload.groupId] = action.payload.order;

      return {
        ...state,
        orders: tempOrders,
        loading: false,
        error: null
      };
    default:
      return state;
  }
}
