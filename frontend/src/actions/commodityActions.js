import axios from 'axios';
import {
  COMMODITY_DETAILS_FAIL,
  COMMODITY_DETAILS_REQUEST,
  COMMODITY_DETAILS_SUCCESS,
} from '../constants/commodityConstants';

export const listCommodityData =
  (commodityName) => async (dispatch, getState) => {
    try {
      dispatch({ type: COMMODITY_DETAILS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      let config;
      if (userInfo) {
        config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
      }

      const { data } = await axios.get(
        `/api/commodity/${commodityName}`,
        config
      );
      dispatch({
        type: COMMODITY_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COMMODITY_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
