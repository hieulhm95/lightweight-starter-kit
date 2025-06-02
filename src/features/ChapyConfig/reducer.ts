import type { Reducer } from 'redux';
import type { ApiResultAction } from '~/types';
import { GET_CHAPY_CONFIG_SUCCESS } from '../../helpers/api/chapyConfigActions';

const defaultState = {
  loaded: false,
};

const configPage: Reducer<any, ApiResultAction> = (state = defaultState, action = { type: '' }) => {
  switch (action.type) {
    case GET_CHAPY_CONFIG_SUCCESS:
      return {
        ...state,
        loaded: true,
      };
    default:
      return state;
  }
};

export default configPage;
