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
  ASSET_DETAILS_REQUEST,
  ASSET_DETAILS_FAIL,
  ASSET_DETAILS_SUCCESS,
  ASSET_UPDATE_REQUEST,
  ASSET_UPDATE_FAIL,
  ASSET_UPDATE_SUCCESS,
} from '../constants/assetConstants';

export const listAssets =
  (keyword = '', metal = '', assetRefArray = []) =>
  async (dispatch) => {
    try {
      dispatch({ type: ASSET_LIST_REQUEST });

      const assetRefString = assetRefArray.join('-');

      const { data } = await axios.get(
        `/api/assets?keyword=${keyword}&metal=${metal}&assetRefs=${assetRefString}`
      );

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

export const listAssetDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ASSET_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/assets/${id}`);

    dispatch({
      type: ASSET_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ASSET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAsset = (asset) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ASSET_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/assets/${asset._id}`, asset, config);

    dispatch({
      type: ASSET_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ASSET_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
