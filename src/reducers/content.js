const contentReducer = (state = 2, action) => {
  if (action.type === 'CONTENT') {
    return action.id;
  }
  return state;
};

export default contentReducer;
