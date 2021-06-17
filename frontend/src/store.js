import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  companyListReducer,
  companyDetailsReducer,
} from './reducers/companyReducer';
import { compareReducer } from './reducers/compareReducer';

const reducer = combineReducers({
  companyList: companyListReducer,
  companyDetails: companyDetailsReducer,
  compare: compareReducer,
});

const compareListFromStorage = localStorage.getItem('compareList')
  ? JSON.parse(localStorage.getItem('compareList'))
  : [];

const initialState = {
  compare: {
    compareList: compareListFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
