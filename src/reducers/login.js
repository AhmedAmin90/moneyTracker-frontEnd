const loginReducer = (state = '', action) => {
    if (action.type === 'LOGIN') {
      console.log(action);
      return action.payload.id
    }
    return state;
  };
  
  export default loginReducer;