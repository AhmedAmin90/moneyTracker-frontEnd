/* eslint-disable import/no-cycle , react/jsx-indent */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers/index';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Single from './containers/Single';

const store = createStore(allReducers,
  /* eslint-disable-next-line */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/home/:id" render={(routeProps) => <Home userData={routeProps} />} />
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
