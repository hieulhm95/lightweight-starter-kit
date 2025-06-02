import type { Reducer } from 'redux';
import {
  GET_CONFIG,
  GET_CONFIG_FAIL,
  GET_CONFIG_SUCCESS,
  GET_MAPPING,
  GET_MAPPING_FAIL,
  GET_MAPPING_SUCCESS,
} from '~/helpers/api/adFeatureActions';
import type { ApiResultAction } from '~/types';

const initialState = {
  loaded: false,
  loading: true,
  mapping: null,
  config: null,
  error: null,
};

/**
 *
 */
const reducer: Reducer<any, ApiResultAction> = (state = initialState, action = { type: '' }) => {
  switch (action.type) {
    case GET_CONFIG:
    case GET_MAPPING:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: null,
      };
    case GET_CONFIG_SUCCESS:
      return {
        ...state,
        config: action.result,
        loaded: true,
        loading: false,
        error: null,
      };
    case GET_MAPPING_SUCCESS:
      return {
        ...state,
        mapping: action.result,
        loaded: true,
        loading: false,
        error: null,
      };
    case GET_CONFIG_FAIL:
    case GET_MAPPING_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action?.error?.message,
      };
    default:
      return state;
  }
};

export default reducer;
