import {
  CURRENCY_CHANGE,
  CURRENCY_LIST_FAIL,
  CURRENCY_LIST_REQUEST,
  CURRENCY_LIST_SUCCESS,
} from '../constants/currencyConstants';

export const currencyListReducer = (
  state = { currency: { usd: {} } },
  action
) => {
  switch (action.type) {
    case CURRENCY_LIST_REQUEST:
      return { loading: true, ...state };
    case CURRENCY_LIST_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        currency: { selected: state.currency.selected, usd: action.payload },
      };
    case CURRENCY_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CURRENCY_CHANGE:
      console.log(state);
      return {
        loading: false,
        currency: { ...state.currency, selected: action.payload },
      };
    default:
      return state;
  }
};
