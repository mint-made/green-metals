import axios from 'axios';
import {
  COMPARE_ADD_COMPANY,
  COMPARE_REMOVE_COMPANY,
} from '../constants/compareConstants';

export const addToCompareList = (id) => async (dispatch, getState) => {
  console.log('addtocompare action - ', 'id:', id);
  const { data } = await axios.get(`/api/companies/${id}`);
  console.log('data', data);
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
};
