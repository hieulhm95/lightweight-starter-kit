import type { Middleware, AnyAction } from 'redux';
import type { ApiAction } from '~/types';
import type ClientConfig from '~/helpers/api/ClientConfig';

/**
 * API Middleware to handle api request side effects and provide consistent api response states
 * This middleware expect an action with the shape of:
 * ```
 * {
 *   types: [LOADING, SUCCESS, FAIL],
 *   promise: (clientConfig) => apiPromise,
 * };
 * ```
 * @param client
 * @returns api middleware
 */
function createApiMiddleware(client: ClientConfig): Middleware {
  // currying the middleware function to bind clientConfig
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  return () => (next) => (action: AnyAction | ApiAction) => {
    const { promise, types, ...rest } = action as ApiAction;
    if (typeof promise !== 'function') {
      return next(action as AnyAction);
    }
    if (types.length !== 3) {
      throw new Error('API Middleware expect 3 action types: [REQUEST, SUCCESS, FAIL]');
    }

    const [REQUEST, SUCCESS, FAIL] = types;
    next({ type: REQUEST, ...rest });
    const actionPromise = promise(client);
    return actionPromise
      .then((result) => next({ result, type: SUCCESS, ...rest }))
      .catch((error) => next({ error, type: FAIL, ...rest }));
  };
}

export default createApiMiddleware;
