/**
 * TODO: typescript
 * @jest-environment node
 */
import nock from 'nock';
import axiosRetry from './axiosRetry';

const url = 'http://gateway.chotot.com';

describe('helpers/axiosRetry', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * @type {import('axios').AxiosRequestConfig}
   */
  const axiosConfig = {
    url,
    method: 'get',
    timeout: 2000,
    retry: 3,
    retryDelay: 100,
    retryCode: ['ECONNABORTED', 'ETIMEDOUT', 'ENOTFOUND', 'ENETUNREACH'],
    // retryBeforeFn: (e) => {
    //   console.log(
    //     `retry #${e.config.__retryCount}: ${e.config.url} : errCode: ${
    //       e.code || (e.response && e.response.status)
    //     }`
    //   );
    // },
  };

  it('should not retry if response 200', async () => {
    const scope = nock(url).get('/').reply(200, 'OK');
    const response = await axiosRetry(axiosConfig);
    expect(response.status).toEqual(200);
    expect(response.data).toEqual('OK');

    scope.done();
  });

  it('should not retry by default (no retry config)', async () => {
    const scope = nock(url).get('/').times(1).reply(500);
    try {
      await axiosRetry({ url });
    } catch (error) {
      const { config } = error;
      expect(error.response.status).toEqual(500);
      expect(config.__retryCount).toEqual(0);
    }
    scope.done();
  });

  it('should retry 3 times with 404', async () => {
    const scope = nock(url).get('/').times(3).reply(404);
    try {
      axiosConfig.retryCode = ['ERR_BAD_REQUEST'];
      await axiosRetry(axiosConfig);
    } catch (error) {
      const { config } = error;
      expect(config.__retryCount).toEqual(3);
      expect(config.retryDelay).toEqual(100);
    }
    scope.done();
  });

  it('should retry 3 times with 500', async () => {
    const scope = nock(url).get('/').times(4).reply(500);
    try {
      axiosConfig.retryCode = ['ERR_BAD_RESPONSE'];
      await axiosRetry(axiosConfig);
    } catch (error) {
      const { config } = error;
      expect(config.__retryCount).toEqual(3);
      expect(config.retryDelay).toEqual(100);
    }
    scope.done();
  });

  it('should retry 3 times with ECONNABORTED time out', async () => {
    const scope = nock(url).get('/').times(4).replyWithError({ code: 'ECONNABORTED' });
    try {
      axiosConfig.retryCode = ['ECONNABORTED'];
      await axiosRetry(axiosConfig);
    } catch (error) {
      const { config } = error;
      expect(config.__retryCount).toEqual(3);
      expect(config.retryDelay).toEqual(100);
    }
    scope.done();
  });

  it('should retry 2 times with ETIMEDOUT', async () => {
    const scope = nock(url).get('/').times(3).replyWithError({ code: 'ETIMEDOUT' });
    try {
      axiosConfig.retry = 2;
      axiosConfig.retryCode = ['ETIMEDOUT'];
      await axiosRetry(axiosConfig);
    } catch (error) {
      const { config } = error;
      expect(config.__retryCount).toEqual(2);
      expect(config.retryDelay).toEqual(100);
    }
    scope.done();
  });

  it('should retry 2 times with ENOTFOUND', async () => {
    const scope = nock(url).get('/').times(3).replyWithError({ code: 'ENOTFOUND' });
    try {
      axiosConfig.retry = 2;
      axiosConfig.retryCode = ['ENOTFOUND'];
      await axiosRetry(axiosConfig);
    } catch (error) {
      const { config } = error;
      expect(config.__retryCount).toEqual(2);
      expect(config.retryDelay).toEqual(100);
    }
    scope.done();
  });

  it('should retry 2 times with ENETUNREACH', async () => {
    const scope = nock(url).get('/').times(3).replyWithError({ code: 'ENETUNREACH' });
    try {
      axiosConfig.retry = 2;
      axiosConfig.retryCode = ['ENETUNREACH'];
      await axiosRetry(axiosConfig);
    } catch (error) {
      const { config } = error;
      expect(config.__retryCount).toEqual(2);
      expect(config.retryDelay).toEqual(100);
    }
    scope.done();
  });

  it('should retry 2 times with no retryCode Option', async () => {
    const scope = nock(url).get('/').times(3).replyWithError({ code: 'ETIMEDOUT' });
    try {
      axiosConfig.retry = 2;
      axiosConfig.retryCode = undefined;
      await axiosRetry(axiosConfig);
    } catch (error) {
      const { config } = error;
      expect(config.__retryCount).toEqual(2);
      expect(config.retryDelay).toEqual(100);
    }
    scope.done();
  });
});
