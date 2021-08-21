export const login = (user) => ({
  type: 'LOGIN',
  payload: user,
});

export const error = (message) => ({
  type: 'ERROR',
  message,
});

export const items = (items) => ({
  type: 'ITEMS',
  items,
});

export const content = (id) => ({
  type: 'CONTENT',
  id,
});

export const loading = (message) => ({
  type: 'LOADING',
  message,
});
