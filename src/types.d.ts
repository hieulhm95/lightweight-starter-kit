/**
 * This module is for defining reusable types & interfaces in this project.
 * It can be imported with root path (\~)
 * For example: `{import('~/types').ApiResult`
 *
 */

// extends AxiosRequestConfig types
import 'axios';
import type ClientConfig from '~/helpers/api/ClientConfig';

declare module 'axios' {
  export interface AxiosRequestConfig {
    retry?: number;
    retryDelay?: number;
    retryCode?: (number | string)[];
    retryBeforeFn?: () => void;
  }
}

/**
 * ApiClient's request result
 */
export type ApiResult = {
  /**
   * Response headers
   */
  headers?: Record<string, unknown>;
  /**
   * Response data (body)
   */
  data?: Record<string, unknown>;
};

/**
 * Action object for API middleware
 */
export type ApiAction = {
  /**
   * Other payload from ApiAction
   */
  [key: string]: unknown;
  /**
   * Type IDs for subsequence middleware or final reducer
   * Includes: [LOADING, SUCCESS, FAIL]
   */
  types: [string, string, string];
  /**
   * The callback to execute the request and return the API request Promise
   */
  promise: (config: ClientConfig) => Promise<ApiResult>;
};

/**
 * API Action Creator
 */
export type ApiActionCreator = (...args: Record<string, unknown>[]) => ApiAction;

/**
 * ApiResultAction received by reducer when ApiAction is dispatched
 */
export type ApiResultAction = {
  /**
   * Other payload from ApiAction
   */
  [key: string]: unknown;
  /**
   * The SUCCESS type or FAIL type from ApiAction
   */
  type: string;
  /**
   * API response data if SUCCESS
   */
  result?: Record<string, unknown>;
  /**
   * Error if FAIL
   */
  error?: Record<string, unknown>;
};
