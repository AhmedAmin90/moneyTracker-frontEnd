export const login = (user) => ({
    type: 'LOGIN',
    payload: user,
  })

export const error = (message) => ({
    type: 'ERROR',
    message,
  })

export const items = (items) => ({
    type: 'ITEMS',
    items,
  })