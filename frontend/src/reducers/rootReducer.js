import { combineReducers } from 'redux';

import {
  companyListReducer,
  companyDetailsReducer,
  companyDeleteReducer,
  companyCreateReducer,
  companyUpdateReducer,
} from './companyReducer';
import { compareReducer } from './compareReducer';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './userReducers';
import {
  assetListReducer,
  assetDeleteReducer,
  assetCreateReducer,
  assetDetailsReducer,
  assetUpdateReducer,
} from './assetReducers';
import { currencyListReducer } from './currencyReducer';

export const rootReducer = combineReducers({
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
});
