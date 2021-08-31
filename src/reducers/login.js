const loginReducer = (state = '', action) => {
  if (action.type === 'LOGIN') {
    return action.payload.id;
  }
  return state;
};

export default loginReducer;
