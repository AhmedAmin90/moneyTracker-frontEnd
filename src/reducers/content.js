const contentReducer = (state = 2 , action) => {
    if (action.type === 'CONTENT') {
      console.log(action);
      return action.id
    }
    return state;
  };
  
  export default contentReducer;