import { createStore, Store, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../Reducer/reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose;

export type RootState = ReturnType<typeof reducer>;
const store: Store<RootState> = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
