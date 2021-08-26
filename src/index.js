/* eslint-disable */
/* eslint-disable  import/no-cycle , react/jsx-indent , react/display-name */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers/index';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Single from './containers/Single';
import AddItems from './containers/AddItems';
import AddExpenses from './containers/AddExpenses';
import { getData, setTotal } from './helpers';
import * as actions from './actions/index';

const store = createStore(allReducers,
  /* eslint-disable-next-line */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
const userId = localStorage.getItem('userId');
window.onload = async () => {
  if (userId === null || userId === "") {
    return <Redirect to="/" />;
  }
  else {
    store.dispatch(actions.login({ id: userId }));
    await getData(userId);
    await setTotal(userId)
    return <Redirect to={`/home/${userId}`} />;
  }

};

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/home/:id" render={(routeProps) => <Home userData={routeProps} />} />
        <Route exact path="/addExpenses" render={() => <AddExpenses />} />
        <Route exact path="/addItems" render={() => <AddItems userId={userId} />} />
        <Route exact path="/items/:itemName" render={(routeProps) => <Single itemData={routeProps} />} />
      </Switch>
    </BrowserRouter>
   </Provider>),
  document.getElementById('root') || document.createElement('div'), // for testing
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
