import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducers/rootReducer';

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
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
