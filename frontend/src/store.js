import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

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

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

//***************************** */
sagaMiddleware.run(rootSaga);

export default store;
