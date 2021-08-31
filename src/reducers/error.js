const errorReducer = (state = '', action) => {
  if (action.type === 'ERROR') {
    return action.message;
  }
  return state;
};

export default errorReducer;
