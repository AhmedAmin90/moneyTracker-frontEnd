/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './App.css';
import * as actions from '../actions/index';
import Session from '../containers/Session';
import Header from './Header';
import * as helpers from '../helpers';

const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const errorMsg = useSelector((state) => state.errorMsg);
  const savedUserId = localStorage.getItem('userId');

  const [login, setLogin] = useState('Sign In');

  if (savedUserId) {
    return <Redirect to={`/home/${userId}`} />;
  }

  const handleClick = ({ target }) => {
    setLogin(target.innerText);
    dispatch(actions.error(''));
  };

  const loginBtn = login === 'Sign In' ? <Session sendData={helpers.sendUserData} errorMsg={errorMsg} text="Sign in - Track your expenses now !" /> : <Session sendData={helpers.createUser} errorMsg={errorMsg} text="Sign up with us - Track your expenses now !" />;
  const app = (
    <div className="App-sign">
      <Header />
      <button type="button" className="Session-btn" onClick={handleClick}>{login === 'Sign In' ? 'Sign Up' : 'Sign In'}</button>
      <div>
        {loginBtn}
      </div>
    </div>
  );
  const renderData = savedUserId === null || savedUserId === '' ? app : <Redirect to={`/home/${savedUserId}`} />;

  return (
    <div className="App">
      {renderData}
    </div>
  );
};

export default App;
