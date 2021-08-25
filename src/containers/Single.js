/* eslint-disable import/no-cycle , react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { sendExpenseData, getExpenses, removeItemById } from '../helpers';
import Measurment from './Measurment';
import Summary from './Summary';
import './Single.css';

const Single = ({ itemData, testData }) => {
  const { itemName } = itemData.match.params;
  let savedUserId = localStorage.getItem('userId');
  const savedItemName = itemName || localStorage.getItem('itemName');
  let userId = useSelector((state) => state.userId);
  const itemId = useSelector((state) => state.itemId);
  const total = useSelector((state) => state.total);
  let expenses = useSelector((state) => state.expenses[0]) || [];
  if (testData) {
    savedUserId = testData.savedUserId;
    userId = testData.user.id;
    expenses = testData.expenses;
  }

  const [expense, setExpense] = useState(0);
  const handleChange = (e) => {
    setExpense(e.target.value);
  };

  if (!savedUserId) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    if (!testData) {
      localStorage.setItem('itemName', itemName);
      getExpenses(savedUserId, savedItemName);
    }
  }, []);

  const sendData = () => {
    sendExpenseData(expense, itemId);
    getExpenses(savedUserId, savedItemName);
  };

  const handleRemoveExpense = (id) => {
    removeItemById(id);
    getExpenses(savedUserId, savedItemName);
  };

  return (

    <div className="Single">
      <div>
        <Summary total={total} />
      </div>
      <div data-testid="single-form" className="Single-form">
        <form className="Filter-form">
          <h1 className="Home-add-item">Add Another expense: </h1>
          <input type="number" name="expense" min="0" onChange={handleChange} placeholder="0" />
        </form>

        <button type="button" className="Add-expense-btn" onClick={sendData}>Add New Expense</button>
      </div>

      <div>
        <h1 className="Home-add-item">{itemName}</h1>
        {expenses.map((exp) => (
          <Measurment
            key={exp.id}
            id={exp.id}
            expense={exp}
            removeExpense={handleRemoveExpense}
          />
        ))}
      </div>
      <div className="Single-footer">
        <Link to={`/home/${userId}`}>  Back to Your Dashboard</Link>
      </div>
    </div>

  );
};

Single.defaultProps = {
  itemData: {
    history: {},
    location: {},
    match: { params: { itemName: '' } },
  },
};

Single.propTypes = {
  itemData: PropTypes.instanceOf(Object),
};

export default Single;
