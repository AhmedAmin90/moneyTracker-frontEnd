const initial = [];

const expensesReducer = (state = initial, action) => {
  if (action.type === 'EXPENSES') {
    console.log(action);
    return [action.exps];
  }
  return state;
};

export default expensesReducer;
