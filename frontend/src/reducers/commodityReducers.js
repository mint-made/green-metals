import {
  COMMODITY_DETAILS_FAIL,
  COMMODITY_DETAILS_REQUEST,
  COMMODITY_DETAILS_SUCCESS,
} from '../constants/commodityConstants';

export const commodityDataReducer = (
  state = { commodity: { data: [] } },
  action
) => {
  switch (action.type) {
    case COMMODITY_DETAILS_REQUEST:
      return { loading: true, ...state };
    case COMMODITY_DETAILS_SUCCESS:
      return { loading: false, commodity: action.payload };
    case COMMODITY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
