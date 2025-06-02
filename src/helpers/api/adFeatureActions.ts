/**
 * Organize API actions into features classification
 */
import type { ApiActionCreator } from '~/types';
import ApiClient from './ApiClient';
import type ClientConfig from './ClientConfig';

// convention: METHOD_FEATURE_DATA[|_SUCCESS|_FAIL]
export const GET_CONFIG = 'adFeature/CONFIG';
export const GET_CONFIG_SUCCESS = 'adFeature/CONFIG_SUCCESS';
export const GET_CONFIG_FAIL = 'adFeature/CONFIG_FAIL';

export const GET_MAPPING = 'adFeature/MAPPING';
export const GET_MAPPING_SUCCESS = 'adFeature/MAPPING_SUCCESS';
export const GET_MAPPING_FAIL = 'adFeature/MAPPING_FAIL';

export const GET_SAFETIP = 'adFeature/SAFETIP';
export const GET_SAFETIP_SUCCESS = 'adFeature/SAFETIP_SUCCESS';
export const GET_SAFETIP_FAIL = 'adFeature/SAFETIP_FAIL';

// share one instance across different fetch
const apiClient = new ApiClient();

/**
 * NOTE: Add description and jsdoc to guide action creator usage
 */
export const loadConfig: ApiActionCreator = (query) => /* prepare params & data here */ ({
  types: [GET_CONFIG, GET_CONFIG_SUCCESS, GET_CONFIG_FAIL],
  promise: async (config: ClientConfig) =>
    apiClient.with(config).get('/v3/public/ad-features/categories', {
      params: query,
      // headers: { 'x-workgroup': 'buyer' },
      // data: {foo: 'bar'},
      timeout: 2000,
    }),
});

export const loadAllMapping: ApiActionCreator = () => ({
  types: [GET_MAPPING, GET_MAPPING_SUCCESS, GET_MAPPING_FAIL],
  promise: async (config: ClientConfig) =>
    apiClient.with(config).get('/v1/public/ad-features/mappings', {}),
});

/**
 * Load safe tips
 */
export const loadSafeTips: ApiActionCreator = () => ({
  types: [GET_SAFETIP, GET_SAFETIP_SUCCESS, GET_SAFETIP_FAIL],
  promise: async (config: ClientConfig) =>
    apiClient.with(config).get('/v1/public/chapy-pro/conf', {
      params: { app_id: 'web' },
      headers: {
        'ct-platform': 'web',
      },
      timeout: 0,
      data: undefined,
    }),
});
