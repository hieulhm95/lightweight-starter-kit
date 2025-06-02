import axios, { type AxiosResponse, type RawAxiosRequestHeaders } from 'axios';
import Cookies from 'js-cookie'; // client
import cookie from 'cookie'; // server
import type { ApiResult } from '~/types';
import type ClientConfig from './ClientConfig';
import type { Request, Response } from './ClientConfig';

type Method = 'delete' | 'get' | 'patch' | 'post' | 'put';

type RequestMethod = (
  /** the path part of full API URL, base part is from config */
  path: string,
  /** request config object */
  requestConfig?: {
    /** params or query object */
    params?: any;
    /** headers object to be set */
    headers?: RawAxiosRequestHeaders;

    /** data or body object */
    data?: any;
    /** timeout in milliseconds */
    timeout?: number;
  },
  /** [true] Whether the request be retried once */
  shouldTrial?: boolean,
  /** [true] Whether the data is sent as JSON */
  isJson?: boolean
) => Promise<ApiResult>;

type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
};

/**
 * API client for each API end point
 */
class ApiClient {
  config: any;

  req: Request | null = null;

  res: Response | null = null;

  get: RequestMethod = createApiMethod('get');

  post: RequestMethod = createApiMethod('post');

  put: RequestMethod = createApiMethod('put');

  patch: RequestMethod = createApiMethod('patch');

  delete: RequestMethod = createApiMethod('delete');

  gatewayUrl = '';

  /**
   * Inject client config to this client. If config already set and
   * rootUrl is unchanged, reuse existing one
   *
   * @param  {ClientConfig} client
   * @return {ApiClient} this
   */
  with(client: ClientConfig): this {
    const {
      config,
      config: { gatewayUrl = '' },
      req,
      res,
    } = client;

    // apply config
    this.req = req;
    this.res = res;
    this.config = config;
    this.gatewayUrl = gatewayUrl as string;

    return this;
  }

  async refreshToken() {
    const { gatewayUrl } = this;
    return axios<any, AxiosResponse<RefreshTokenResponse>>('/v1/public/auth/token', {
      method: 'post',
      baseURL: gatewayUrl,
      data: {
        refresh_token: this.getCookie('refreshToken'),
      },
    }).then(({ data }) => {
      // console.log('refreshToken success', data.refresh_token);
      this.setCookie([
        ['privateToken', data.access_token],
        ['refreshToken', data.refresh_token],
      ]);
      return data;
    });
  }

  getCookie(key: string) {
    if (this.req) {
      // server side
      return this.req.cookies[key];
    }

    // client side
    return Cookies.get(key);
  }

  /**
   * Isomorphic set cookie
   * The param is a two-dimensional array of key-value pairs
   * E.g. [['key1', 'value1'], ['key2', 'value2']]
   * @param {string[][]} keyValuePairs
   */
  setCookie(keyValuePairs: string[][]) {
    const { config } = this;
    const cookieDomain = config.cookieConfig.domain;
    const cookieMaxAge = config.cookieConfig.expires || 30;
    if (this.res) {
      // server side
      const cookieOption = {
        path: '/',
        domain: cookieDomain,
        httpOnly: false,
        maxAge: cookieMaxAge * 86400, // seconds
      };
      if (!this.res.headersSent) {
        const cookieValue = keyValuePairs.map(([key, value]) =>
          cookie.serialize(key, value, cookieOption)
        );
        this.res.setHeader('Set-Cookie', cookieValue);
      }
    } else {
      // client side
      const cookieOption = {
        expires: cookieMaxAge,
        path: '/',
        domain: cookieDomain,
      };
      keyValuePairs.forEach(([key, value]) => {
        Cookies.set(key, value, cookieOption);
      });
    }
  }

  getAuthorizationHeader() {
    const accessToken = this.getCookie('privateToken');
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }
}

function createApiMethod(method: Method = 'get') {
  const requestMethod: RequestMethod = async function requestMethod(
    this: ApiClient,
    path,
    requestConfig = { timeout: 0 },
    shouldTrial = true,
    isJson = true
  ) {
    const { gatewayUrl, config } = this;
    const { params, headers, data: reqData, timeout, ...axiosConfig } = requestConfig;

    return new Promise((resolve, reject) => {
      let payload = reqData;
      // convert json to query string
      if (!isJson && typeof reqData === 'object') {
        payload = Object.keys(reqData)
          .filter((key) => reqData[key])
          .map((key) => `${key}=${reqData[key]}`)
          .join('&');
      }

      axios(path, {
        baseURL: gatewayUrl,
        method,
        timeout: timeout ?? config.requestTimeout,
        data: payload,
        params,
        headers,
        ...axiosConfig,
      })
        .then((response) => {
          const { data } = response;
          // console.log('ApiClient success response');

          let result: ApiResult = {};
          if (Array.isArray(data)) {
            result = Object.assign(result, {
              data,
            });
          } else {
            result = Object.assign(result, data);
          }

          resolve(result);
        })
        .catch((error) => {
          const status = error?.response?.status;

          if (shouldTrial && (status === 401 || status === 403)) {
            // TODO: rewrite this with interceptors and retry
            this.refreshToken().then(
              (result) => {
                if (headers?.Authorization) {
                  headers.Authorization = 'Bearer ' + result.access_token;
                }
                // retry
                this[method](path, { params, headers, data: reqData }, false).then(
                  (finalResult) => {
                    resolve(finalResult);
                  },
                  (finalError) => {
                    reject(finalError);
                  }
                );
              },
              (refreshTokenError) => {
                reject(refreshTokenError);
              }
            );
          } else if (!error.response) {
            reject(new Error('Không có kết nối mạng. Vui lòng kiểm tra Wi-Fi hoặc 3G.'));
          } else {
            reject(error);
          }
        });
    });
  };
  return requestMethod;
}
export default ApiClient;
