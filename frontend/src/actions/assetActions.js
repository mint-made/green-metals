import axios from 'axios';

import {
  ASSET_LIST_SUCCESS,
  ASSET_LIST_REQUEST,
  ASSET_LIST_FAIL,
  ASSET_DELETE_REQUEST,
  ASSET_DELETE_SUCCESS,
  ASSET_DELETE_FAIL,
  ASSET_CREATE_REQUEST,
  ASSET_CREATE_SUCCESS,
  ASSET_CREATE_FAIL,
} from '../constants/assetConstants';

export const listAssets = () => async (dispatch) => {
  try {
    dispatch({ type: ASSET_LIST_REQUEST });

    const { data } = await axios.get(`/api/assets`);

    dispatch({
      type: ASSET_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ASSET_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAsset = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ASSET_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/assets/${id}`, config);

    dispatch({
      type: ASSET_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ASSET_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createAsset = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ASSET_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/assets', {}, config);

    dispatch({
      type: ASSET_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ASSET_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
