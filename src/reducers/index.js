import { combineReducers } from 'redux';
import loginReducer from './login';
import errorReducer from './error';
import itemsReducer from './items';
import contentReducer from './content';
import loadingReducer from './Loading';
import expensesReducer from './expenses';
import itemIdReducer from './itemId';
import totalReducer from './total';

const allReducers = combineReducers({
  userId: loginReducer,
  errorMsg: errorReducer,
  items: itemsReducer,
  contentId: contentReducer,
  isLoading: loadingReducer,
  expenses: expensesReducer,
  itemId: itemIdReducer,
  total: totalReducer,
});

export default allReducers;
