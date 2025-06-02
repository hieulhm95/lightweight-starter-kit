import { type AnyAction, type Action, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import adFeaturesReducer from '~/features/AdFeatures/reducer';
import chapyConfigReducer from '~/features/ChapyConfig/reducer';

export default function createRootReducer(asyncReducers?: any) {
  const combinedReducer = combineReducers<any, Action>({
    chapyConfig: chapyConfigReducer,
    adFeatures: adFeaturesReducer,
    ...asyncReducers,
  });

  return (state: any, action: AnyAction) => {
    if (action?.type === HYDRATE) {
      // take state in from server's NEXT_DATA
      return {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
    } else {
      return combinedReducer(state, action);
    }
  };
}
