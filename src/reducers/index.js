import { combineReducers } from 'redux';
import loginReducer from './login';
import errorReducer from './error';
import itemsReducer from './items';
const allReducers = combineReducers({
    userId: loginReducer,
    loginError: errorReducer,
    items: itemsReducer
});

export default allReducers;