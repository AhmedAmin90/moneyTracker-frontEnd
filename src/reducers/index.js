import { combineReducers } from 'redux';
import loginReducer from './login';
import errorReducer from './error';
import itemsReducer from './items';
import contentReducer from './content';
import loadingReducer from './Loading';

const allReducers = combineReducers({
  userId: loginReducer,
  errorMsg: errorReducer,
  items: itemsReducer,
  contentId: contentReducer,
  isLoading: loadingReducer,
});

export default allReducers;
