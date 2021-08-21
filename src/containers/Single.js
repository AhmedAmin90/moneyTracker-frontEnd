/* eslint-disable react/prop-types , no-return-assign , consistent-return */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Measurment from './Measurment';
import Summary from './Summary';
import './Single.css';

const Single = ({ itemData, testData }) => {
  const { itemName } = itemData.match.params;

  let userId = useSelector((state) => state.userId);
  if (testData) {
    userId = testData.user.id;
  }

  // For Adding new Measurment:
  const [expense, setExpense] = useState(0);
  const handleChange = (e) => {
    setExpense(e.target.value);
  };
  const [expenses, setExpenses] = useState([]);
  const [itemId, setItemId] = useState('');
  const [total, setTotal] = useState(0);
  let sum = 0;
  useEffect(() => {
    const getData = async () => {
      if (!userId) {
        return <Redirect to="/" />;
      }

      try {
        const res = await axios.get(`https://pacific-mountain-97932.herokuapp.com/users/${userId}`);
        const userItems = await res.data.items;
        const expRes = await axios.get('https://pacific-mountain-97932.herokuapp.com/api/v1/expenses');
        const expData = await expRes.data;
        const selectedItem = userItems.find((item) => item.name === itemName);
        const expArray = expData.filter((exp) => exp.item_id === itemId);
        setExpenses(expArray);
        setItemId(selectedItem.id);
        const sumAll = expenses.map((exp) => sum += exp.expense);
        setTotal(sumAll[sumAll.length - 1]);
      } catch (err) {
        if (axios.isCancel(err)) {
          return 'axios request cancelled';
        }
        throw err;
      }
    };
    if (!testData) {
      getData();
    }
  });

  if (!userId) {
    return <Redirect to="/" />;
  }

  // For sending new Measurment to database:
  const sendData = () => {
    fetch('https://pacific-mountain-97932.herokuapp.com/api/v1/expenses', {
      method: 'post',
      body: JSON.stringify({ expense: parseFloat(expense), item_id: itemId }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
  };

  const handleRemoveExpense = (id) => {
    fetch(`https://pacific-mountain-97932.herokuapp.com/api/v1/expenses/${id}`, {
      method: 'DELETE',
    });
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
        {testData ? testData.expenses.map((exp) => (
          <Measurment
            key={exp.id}
            id={exp.id}
            expense={exp}
            removeExpense={handleRemoveExpense}
          />
        ))
          : expenses.map((exp) => (
            <Measurment
              key={exp.id}
              id={exp.id}
              expense={exp}
              removeExpense={handleRemoveExpense}
            />
          ))}
      </div>
      <div className="Single-footer">
        <Link to={`/home/${userId}`}> Back to Your Dashboard</Link>
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
