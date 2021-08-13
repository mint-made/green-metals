import {
  CURRENCY_LIST_FAIL,
  CURRENCY_LIST_REQUEST,
  CURRENCY_LIST_SUCCESS,
} from '../constants/currencyConstants';

export const currencyListReducer = (state = { currency: {} }, action) => {
  switch (action.type) {
    case CURRENCY_LIST_REQUEST:
      return { loading: true, ...state };
    case CURRENCY_LIST_SUCCESS:
      return { loading: false, currency: action.payload };
    case CURRENCY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
