const itemIdReducer = (state = 0, action) => {
  if (action.type === 'ITEMID') {
    return action.id;
  }
  return state;
};

export default itemIdReducer;
