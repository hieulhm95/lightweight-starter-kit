import createThunkMiddleware from './createThunkMiddleware';

const create = (extra?: any) => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();
  const thunk = createThunkMiddleware(extra);
  const invoke = (action) => thunk(store)(next)(action);
  return { store, next, invoke };
};

it('passes through non-function action', () => {
  const { next, invoke } = create();
  const action = { type: 'TEST' };
  invoke(action);
  expect(next).toHaveBeenCalledWith(action);
});

it('calls the function', () => {
  const { invoke } = create();
  const fn = jest.fn();
  invoke(fn);
  expect(fn).toHaveBeenCalled();
});

it('passes dispatch and getState', () => {
  const { store, invoke } = create();
  invoke((dispatch, getState) => {
    dispatch('TEST DISPATCH');
    getState();
  });
  expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH');
  expect(store.getState).toHaveBeenCalled();
});

it('calls the function with extra argument when created', () => {
  const extra = { rootUrl: 'http://localhost:8080' };
  const { store, invoke } = create(extra);
  invoke((dispatch, getState, extraArgs) => {
    expect(extraArgs).toBe(extra);
    dispatch('TEST DISPATCH');
    getState();
  });
  expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH');
  expect(store.getState).toHaveBeenCalled();
});
