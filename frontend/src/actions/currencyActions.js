import axios from 'axios';
import {
  CURRENCY_LIST_FAIL,
  CURRENCY_LIST_REQUEST,
  CURRENCY_LIST_SUCCESS,
} from '../constants/currencyConstants';

export const getCurrency = () => async (dispatch) => {
  try {
    dispatch({ type: CURRENCY_LIST_REQUEST });

    const { data } = await axios.get(`/api/currency`);

    dispatch({
      type: CURRENCY_LIST_SUCCESS,
      payload: data,
    });
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
