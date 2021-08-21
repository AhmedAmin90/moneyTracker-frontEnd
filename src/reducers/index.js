import { combineReducers } from 'redux';
import loginReducer from './login';
import errorReducer from './error';
import itemsReducer from './items';
import contentReducer from './content';

const allReducers = combineReducers({
  userId: loginReducer,
  errorMsg: errorReducer,
  items: itemsReducer,
  contentId: contentReducer,
});

export default allReducers;
