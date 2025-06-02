import { createStore, applyMiddleware, compose, type Store } from 'redux';
import { type Context, type MakeStore, createWrapper } from 'next-redux-wrapper';
import createThunkMiddleware from '~/middlewares/createThunkMiddleware';
import createApiMiddleware from '~/middlewares/createApiMiddleware';
import ClientConfig from '~/helpers/api/ClientConfig';
import config from '~/config';

import createRootReducer from './rootReducer';

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

interface AppStore extends Store {
  asyncReducers: any;
  injectReducer: (key: string, reducer: any) => void;
}

/**
 * Initialize redux store with middlewares and enhancers
 */
const initStore: MakeStore<any> = (context: Context) => {
  const { ctx = {} } = context as Record<string, any>;
  const clientConfig = new ClientConfig(config, ctx.req, ctx.res);
  const middlewares = [createThunkMiddleware(clientConfig), createApiMiddleware(clientConfig)];
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const store: AppStore = createStore(createRootReducer(), enhancer);

  store.asyncReducers = {};
  store.injectReducer = (key, reducer) => {
    if (store.asyncReducers[key]) return;
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createRootReducer(store.asyncReducers));
  };
  return store;
};

export const wrapper = createWrapper(initStore);
