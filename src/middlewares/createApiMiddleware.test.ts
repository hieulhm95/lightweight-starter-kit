/* eslint-disable @typescript-eslint/promise-function-async */
import createApiMiddleware from './createApiMiddleware';

// Create function is refered from https://redux.js.org/recipes/writing-tests/#middleware
const create = (config?: any) => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();
  const apiMiddleware = createApiMiddleware(config);
  const invoke = (action) => apiMiddleware(store)(next)(action);
  return { store, next, invoke };
};

it('passes through actions without promise property', () => {
  const { next, invoke } = create();
  const action = { type: 'TEST' };
  invoke(action);
  expect(next).toHaveBeenCalledWith(action);
});

it('throws errors at action with insufficient action.types', () => {
  const { invoke } = create();
  const action = {
    types: ['SUCCESS', 'FAIL'],
    promise: jest.fn(),
  };
  try {
    invoke(action);
  } catch (error: any) {
    expect(error.message).toMatch('3 action types');
  }
});

it('calls the action.promise with success', () => {
  const { next, invoke } = create({ rootUrl: 'http://localhost:8080' });
  const action = {
    types: ['REQUEST', 'SUCCESS', 'FAIL'],
    promise: jest.fn(
      (config) =>
        new Promise((resolve) => {
          resolve({ data: '123', ...config });
        })
    ),
  };
  const middlewarePromise = invoke(action);
  expect(next).toHaveBeenCalledWith({ type: 'REQUEST' });

  return middlewarePromise.then(() => {
    expect(next).toHaveBeenCalledWith({
      type: 'SUCCESS',
      result: { data: '123', rootUrl: 'http://localhost:8080' },
    });
  });
});

it('calls the action.promise with errors', () => {
  const { next, invoke } = create({ rootUrl: 'http://localhost:8080' });
  const action = {
    types: ['REQUEST', 'SUCCESS', 'FAIL'],
    promise: jest.fn(
      () =>
        new Promise((resolve, reject) => {
          reject(new Error('api errors'));
        })
    ),
    extra: 'some data',
  };
  const middlewarePromise = invoke(action);
  expect(next).toHaveBeenCalledWith({ type: 'REQUEST', extra: 'some data' });

  return middlewarePromise.then(() => {
    expect(next).toHaveBeenCalledWith({
      type: 'FAIL',
      error: new Error('api errors'),
      extra: 'some data',
    });
  });
});
