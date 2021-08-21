const loadingReducer = (state = '', action) => {
  if (action.type === 'LOADING') {
    return action.message;
  }
  return state;
};

export default loadingReducer;
