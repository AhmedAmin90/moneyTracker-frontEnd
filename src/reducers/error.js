const errorReducer = (state = '', action) => {
    if (action.type === 'ERROR') {
      console.log(action);
      return action.message
    }
    return state;
  };
  
  export default errorReducer;