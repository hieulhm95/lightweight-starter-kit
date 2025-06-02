/**
 *@jest-environment node
 */
import nock from 'nock';
import ApiClient from './ApiClient';
import type ClientConfig from './ClientConfig';

const baseUrl = 'http://gateway.chotot.com';

nock.disableNetConnect();

describe('helpers/axiosRetry', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   */
  const clientConfig: ClientConfig = {
    config: {
      gatewayUrl: baseUrl,
      cookieConfig: {
        path: '/',
        domain: 'chotot.com',
        expires: 365,
      },
    },
    res: null,
    req: null,
  };

  it('should fetch data without errors', async () => {
    const path = '/v3/public/ad-features/categories';
    nock(baseUrl).get(path).reply(200, { data: 'OK' });

    const client = new ApiClient();
    let result;
    try {
      result = await client.with(clientConfig).get(`${path}`, {
        timeout: 500,
      });
    } catch (error) {
      throw new Error('Should not reach here');
    }
    expect(result.data).toEqual('OK');
  });

  it('should retry 403 with shouldTrial true', async () => {
    const path = '/v3/ad-features/categories';
    nock(baseUrl).post('/v1/public/auth/token', {}).reply(200, {
      access_token: 'access_token',
      refresh_token: 'refresh_token',
    });
    nock(baseUrl).get(path).reply(403); // first try
    nock(baseUrl).get(path).reply(200, { data: 'OK' }); // second try

    const client = new ApiClient();
    const refreshToken = jest.fn(client.refreshToken);
    const getCookie = jest.fn(client.getCookie);
    const setCookie = jest.fn(client.setCookie);
    client.refreshToken = refreshToken.bind(client);
    client.getCookie = getCookie.bind(client);
    client.setCookie = setCookie.bind(client);

    let result;
    try {
      result = await client.with(clientConfig).get(`${path}`, {
        timeout: 500,
      });
    } catch (error) {
      throw new Error('Should not reach here');
    }

    expect(result).toBeDefined();
    expect(refreshToken).toHaveBeenCalled();
    expect(getCookie).toHaveBeenCalledWith('refreshToken');
    expect(setCookie).toHaveBeenCalledWith([
      ['privateToken', 'access_token'],
      ['refreshToken', 'refresh_token'],
    ]);
    expect(result.data).toEqual('OK');
  });

  it('should return errors with 500', async () => {
    const path = '/v3/public/ad-features/categories';
    nock(baseUrl).get(path).reply(500, { message: 'server side error' });

    const client = new ApiClient();
    let result;
    try {
      result = await client.with(clientConfig).get(`${path}`, {
        timeout: 500,
      });
    } catch (error: any) {
      expect(result).toBeUndefined();
      expect(error.response.status).toEqual(500);
      expect(error.response.data.message).toEqual('server side error');
    }
  });

  it('should return errors with no network', async () => {
    const path = '/v3/public/ad-features/categories';
    // nock already disable network, no need interceptors

    const client = new ApiClient();
    let result;
    try {
      result = await client.with(clientConfig).get(`${path}`, {
        timeout: 500,
      });
    } catch (error: any) {
      // console.log(error);
      expect(result).toBeUndefined();
      expect(error.response).toBeUndefined();
      expect(error.message).toEqual('Không có kết nối mạng. Vui lòng kiểm tra Wi-Fi hoặc 3G.');
    }
  });
});
