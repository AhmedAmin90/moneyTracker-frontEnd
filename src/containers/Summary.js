import React from 'react';
import PropTypes from 'prop-types';
import './Summary.css';

const Summary = ({ total = 0 }) => {
  const currentDate = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`).toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className="Summary">
      <div className="Summary-date">
        <i className="fas fa-chevron-left" />
        <p>{currentDate}</p>
        <i className="fas fa-chevron-right" />
      </div>
      <div className="Summary-percentage-circle">
        <p>{total}</p>
        <small>(USD)</small>
      </div>
      <p className="Summary-total-exp">Total Expenses(USD)</p>
    </div>
  );
};

Summary.defaultProps = {
  total: 0,
};

Summary.propTypes = {
  total: PropTypes.number,
};

export default Summary;
