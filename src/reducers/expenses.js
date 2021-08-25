const initial = [];

const expensesReducer = (state = initial, action) => {
  if (action.type === 'EXPENSES') {
    return [action.exps];
  }
  return state;
};

export default expensesReducer;
