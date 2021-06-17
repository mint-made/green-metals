import {
  COMPARE_ADD_COMPANY,
  COMPARE_REMOVE_COMPANY,
} from '../constants/compareConstants';

export const compareReducer = (state = { compareList: [] }, action) => {
  switch (action.type) {
    case COMPARE_ADD_COMPANY:
      const company = action.payload;

      console.log('state: ', state, 'action', action);
      const existsCompany = state.compareList.find(
        (x) => x._id === company._id
      );

      if (existsCompany) {
        return {
          ...state,
          compareList: state.compareList.map((x) =>
            x._id === existsCompany._id ? company : x
          ),
        };
      } else {
        return {
          ...state,
          compareList: [...state.compareList, company],
        };
      }

    case COMPARE_REMOVE_COMPANY:
      return {
        ...state,
        compareList: state.compareList.filter((x) => x._id !== action.payload),
      };

    default:
      return state;
  }
};
