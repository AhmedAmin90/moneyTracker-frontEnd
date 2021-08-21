/* eslint-disable react/prop-types ,  consistent-return */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Filter.css';

const Filter = ({ testData }) => {
  let userId = useSelector((state) => state.userId);
  let itemsList = useSelector((state) => state.items);
  if (testData) {
    userId = testData.user.id;
    itemsList = testData.items;
  }
  // const [axiosRes, setAxiosRes] = useState('');
  const [value, setValue] = useState({
    item: itemsList[0].name,
    expense: 0,
  });
  const [itemId, setItemId] = useState('');
  const input = useRef();

  useEffect(() => {
    // if (!testData) {
    //   const cancelToken = axios.CancelToken;
    //   var source = cancelToken.source();
    //   setAxiosRes('axios request created');
    // }
    const getItemID = async () => {
      const res = await axios.get(`https://pacific-mountain-97932.herokuapp.com/users/${userId}`);
      const userItems = await res.data.items;
      // console.log(res.data);
      const selectedItem = userItems.find((item) => item.name === value.item);
      setItemId(selectedItem.id);
    };

    if (!testData) {
      getItemID();
      // return () => {
      //   source.cancel('axios request cancelled');
      // };
    }
  });

  const handleChange = (e) => {
    setValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const sendData = async () => {
    await fetch('https://pacific-mountain-97932.herokuapp.com/api/v1/expenses', {
      method: 'post',
      body: JSON.stringify({ expense: value.expense, item_id: itemId }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    input.current.value = '';
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
