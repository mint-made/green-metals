import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  companyListReducer,
  companyDetailsReducer,
  companyDeleteReducer,
  companyCreateReducer,
  companyUpdateReducer,
} from './reducers/companyReducer';
import { compareReducer } from './reducers/compareReducer';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  assetListReducer,
  assetDeleteReducer,
  assetCreateReducer,
  assetDetailsReducer,
  assetUpdateReducer,
} from './reducers/assetReducers';
import { currencyListReducer } from './reducers/currencyReducer';
import { commodityDataReducer } from './reducers/commodityReducers';

const reducer = combineReducers({
  currencyList: currencyListReducer,
  companyList: companyListReducer,
  companyDetails: companyDetailsReducer,
  companyDelete: companyDeleteReducer,
  companyCreate: companyCreateReducer,
  companyUpdate: companyUpdateReducer,
  compare: compareReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  assetList: assetListReducer,
  assetDelete: assetDeleteReducer,
  assetCreate: assetCreateReducer,
  assetDetails: assetDetailsReducer,
  assetUpdate: assetUpdateReducer,
  commodityData: commodityDataReducer,
});

const compareListFromStorage = localStorage.getItem('compareList')
  ? JSON.parse(localStorage.getItem('compareList'))
  : [];

const currencyListFromStorage = localStorage.getItem('currencyList')
  ? JSON.parse(localStorage.getItem('currencyList'))
  : {};

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
  currencyList: {
    currency: currencyListFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
