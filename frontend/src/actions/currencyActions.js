import axios from 'axios';
import {
  CURRENCY_CHANGE,
  CURRENCY_LIST_FAIL,
  CURRENCY_LIST_REQUEST,
  CURRENCY_LIST_SUCCESS,
} from '../constants/currencyConstants';

export const getCurrency = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CURRENCY_LIST_REQUEST });

    const { data } = await axios.get(`/api/currency`);

    dispatch({
      type: CURRENCY_LIST_SUCCESS,
      payload: data.usd,
    });
    localStorage.setItem(
      'currencyList',
      JSON.stringify(getState().currencyList.currency)
    );
  } catch (error) {
    dispatch({
      type: CURRENCY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changeCurrency = (currency) => async (dispatch, getState) => {
  dispatch({ type: CURRENCY_CHANGE, payload: currency });

  localStorage.setItem(
    'currencyList',
    JSON.stringify(getState().currencyList.currency)
  );
};
