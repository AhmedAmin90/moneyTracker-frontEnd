const errorReducer = (state = '', action) => {
    if (action.type === 'ERROR') {
      console.log(action.message);
      return action.message
    }
    return state;
  };
  
  export default errorReducer;