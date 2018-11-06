import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { syncTranslationWithStore } from 'react-redux-i18n';
import reducers from './reducers';
import { persistState, getState } from './utils';
import { PRODUCTION } from '../constants';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
});


export default function configureStore() {
  const availableMiddlewares = {
    shared: [thunk],
    development: [loggerMiddleware],
    production: [],
    test: []
  };

  const middlewares = [
    ...availableMiddlewares.shared,
    ...availableMiddlewares[process.env.NODE_ENV]
  ];

  const composeEnhancers = (
    // eslint-disable-next-line
    process.env.NODE_ENV !== PRODUCTION && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose;
  const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middlewares))(createStore);
  const reducer = combineReducers(reducers);
  const store = createStoreWithMiddleware(reducer, getState());

  syncTranslationWithStore(store);

  store.subscribe(() => persistState(store.getState()));

  return store;
}

