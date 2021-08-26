/* eslint-disable import/no-cycle , react/prop-types */
/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { sendExpenseData, setTotal } from '../helpers';
import './Filter.css';

const Filter = ({ testData }) => {
  let userId = useSelector((state) => state.userId);
  let itemsList = useSelector((state) => state.items);
  if (testData) {
    userId = testData.user.id;
    itemsList = testData.items;
  }
  const [value, setValue] = useState({
    item: itemsList[0].name,
    expense: 0,
  });
  const [itemId, setItemId] = useState('');
  const input = useRef();

  useEffect(() => {

      const selectedItem =  itemsList.find((item) => item.name === value.item);
      setItemId(selectedItem.id);
  });

  const handleChange = (e) => {
    setValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const sendData = async () => {
    await sendExpenseData(value.expense, itemId);
    input.current.value = '';
    setTotal(userId);
  };

  return (
    <div className="Filter" data-testid="filter-component">
      <form className="Filter-form">
        <p>Select the item: </p>
        <select name="item" onChange={handleChange} data-testid="filter-select">
          {itemsList.map((item) => (
            <option key={item.name} value={item.name}>{item.name}</option>
          ))}
        </select>
        <p>Enter the amount: </p>
        <input data-testid="filter-input" className="Filter-form-number-input" ref={input} type="number" min="0" name="expense" onChange={handleChange} placeholder="0" />
      </form>
      <button type="button" className="Add-expense-btn" onClick={sendData}>Add New Expense</button>
    </div>
  );
};

export default Filter;
