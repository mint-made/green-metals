import {
  ASSET_LIST_REQUEST,
  ASSET_LIST_SUCCESS,
  ASSET_LIST_FAIL,
} from '../constants/assetConstants';

export const assetListReducer = (state = { assets: [] }, action) => {
  switch (action.type) {
    case ASSET_LIST_REQUEST:
      return { loading: true, assets: [] };
    case ASSET_LIST_SUCCESS:
      return {
        loading: false,
        assets: action.payload,
      };
    case ASSET_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
