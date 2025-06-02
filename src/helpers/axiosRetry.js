import axios from 'axios';

/**
 * axios retry side effect, this module can be imported in every use:
 * `import axios from '~/helpers/axiosRetry'`,
 * or once in application entry module:
 * `import '~/helpers/axiosRetry'`
 *
 *
 * (c) phantomk 2018
 * This logic is adapted from https://github.com/phantomk/axios-retry-tiny
 *
 *
 * TODO: TypeScript
 */

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  const { config } = err;

  // If config does not exist or the retry option is not set, reject
  if (!config) return Promise.reject(err);

  // set default retry times (no retry)
  if (!config.retry) config.retry = 0;

  // get error code or status
  const errCode = err.code || (err.response && err.response.status);
  // check retryCode
  if (config.retryCode && config.retryCode.length > 0 && !config.retryCode.includes(errCode)) {
    console.log('errCode', errCode);
    return Promise.reject(err);
  }

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) return Promise.reject(err);

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  const backoff = new Promise((resolve) => {
    setTimeout(resolve, config.retryDelay || 50);
  });

  // Return the promise in which recalls axios to retry the request
  return backoff.then(() => {
    // run retryBeforeFn before request
    if (config.retryBeforeFn) config.retryBeforeFn(err);
    return axiosInstance(config);
  });
});

export default axiosInstance;
