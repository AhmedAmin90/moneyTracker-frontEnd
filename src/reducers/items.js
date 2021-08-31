const initial = [];

const itemsReducer = (state = initial, action) => {
  if (action.type === 'ITEMS') {
    return [...state, action.items];
  }
  return state;
};

export default itemsReducer;
