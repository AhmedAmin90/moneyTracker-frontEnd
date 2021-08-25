const totalReducer = (state = 0, action) => {
  if (action.type === 'TOTAL') {
    return action.num;
  }
  return state;
};

export default totalReducer;
