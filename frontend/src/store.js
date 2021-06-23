import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  companyListReducer,
  companyDetailsReducer,
} from './reducers/companyReducer';
import { compareReducer } from './reducers/compareReducer';
import { userLoginReducer } from './reducers/userReducers';

const reducer = combineReducers({
  companyList: companyListReducer,
  companyDetails: companyDetailsReducer,
  compare: compareReducer,
  userLogin: userLoginReducer,
});

const compareListFromStorage = localStorage.getItem('compareList')
  ? JSON.parse(localStorage.getItem('compareList'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  compare: {
    compareList: compareListFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
