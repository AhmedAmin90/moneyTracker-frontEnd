import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './Session.css';

const Session = ({ sendData, text, errorMsg }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSendData = (e) => {
    sendData(e, username, password);
  };
  const loading = useSelector((state) => state.isLoading);
  const loadingDiv = loading === 'Loading' ? 'loader-wheel' : '';
  return (
    <div className="Login-forms">
      <form className="Login-form">
        <h3 className="Home-add-item ">{text}</h3>
        <p className="error-msg">{errorMsg}</p>
        <div className={loadingDiv} />
        <input className="login-form-username" type="text" onChange={(e) => setUserName(e.target.value)} value={username} name="username" placeholder="username" />
        <input className="login-form-password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" placeholder="password" />
        <button type="button" data-testid="submit-btn" onClick={handleSendData}>Submit</button>
      </form>
    </div>
  );
};

Session.defaultProps = {
  text: '',
  errorMsg: '',
  sendData: () => {},
};

Session.propTypes = {
  text: PropTypes.string,
  errorMsg: PropTypes.string,
  sendData: PropTypes.func,
};

export default Session;
