const initial = []

const itemsReducer = (state = initial, action) => {
    if (action.type === 'ITEMS') {
        console.log(action);
        return [...state, action.items]
      }
    else if (action.type === 'LOGOUT') {
      console.log(action)
      return initial
    }
    return state;
  };


  
  export default itemsReducer;