import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Session.css';
import LoginForm from './LoginForm';

const Session = ({ sendData, text, errorMsg }) => {
  const [input, setIntpu] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setIntpu({ ...input, [e.target.name]: e.target.value });
  };

  const handleSendData = (e) => {
    sendData(e, input.username, input.password);
  };

  return (
    <LoginForm
      text={text}
      errorMsg={errorMsg}
      handleChange={handleChange}
      sendData={handleSendData}
    />
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
