import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root-reducer';

/**
 * Development Redux store
 * @param  {object} initialState    Initial state of the Redux store
 * @return {object}                 Redux store
 */
export default function configureStore (initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, logger))
  );
}
