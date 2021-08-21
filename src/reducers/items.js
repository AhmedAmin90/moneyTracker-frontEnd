const initial = [];

const itemsReducer = (state = initial, action) => {
  if (action.type === 'ITEMS') {
    // console.log(action);
    return [...state, action.items];
  }
  return state;
};

export default itemsReducer;
