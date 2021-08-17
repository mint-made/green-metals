import axios from 'axios';
import {
  COMPARE_ADD_COMPANY,
  COMPARE_REMOVE_COMPANY,
} from '../constants/compareConstants';

export const addToCompareList = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/companies/${id}`);

  dispatch({
    type: COMPARE_ADD_COMPANY,
    payload: {
      _id: data._id,
      name: data.name,
      issuedShares: data.issuedShares,
      primaryCommodity: data.primaryCommodity,
      website: data.website,
      logo: data.logo,
      assets: data.assets,
      trading: data.trading,
      mcap: data.mcap,
    },
  });

  localStorage.setItem(
    'compareList',
    JSON.stringify(getState().compare.compareList)
  );
};

export const removeFromCompareList = (id) => async (dispatch, getState) => {
  dispatch({
    type: COMPARE_REMOVE_COMPANY,
    payload: id,
  });

  localStorage.setItem(
    'compareList',
    JSON.stringify(getState().compare.compareList)
  );
};
