import type { ApiActionCreator } from '~/types';
import ApiClient from './ApiClient';
import type ClientConfig from './ClientConfig';

export const GET_CHAPY_CONFIG = 'chapyConfig/GET_CHAPY_CONFIG';
export const GET_CHAPY_CONFIG_SUCCESS = 'chapyConfig/GET_CHAPY_CONFIG_SUCCESS';
export const GET_CHAPY_CONFIG_FAIL = 'chapyConfig/GET_CHAPY_CONFIG_FAIL';

const apiClient = new ApiClient();

/**
 * Load chapy config
 */
export const loadChapyConfig: ApiActionCreator = () => ({
  types: [GET_CHAPY_CONFIG, GET_CHAPY_CONFIG_SUCCESS, GET_CHAPY_CONFIG_FAIL],
  promise: async (config: ClientConfig) =>
    apiClient.with(config).get('/v1/public/chapy-pro/conf', {
      timeout: 1000,
    }),
});
