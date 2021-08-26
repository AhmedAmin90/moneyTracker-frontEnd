/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createNewItem } from '../helpers';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Summary from './Summary';

const AddItems = () => {
  const total = useSelector((state) => state.total);
  const errorMsg = useSelector((state) => state.errorMsg);
  const savedUserId = localStorage.getItem('userId');
  const [value, setValue] = useState({
    icons: '',
    item: '',
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const sendData = () => {
    createNewItem(value.item, savedUserId, value.icons);
    document.querySelector('.AddItem-text-input').value = '';
    setValue((pre) => ({ ...pre, item: '' }));
  };

  return (
    <div className="AddItem">
      <Header />
      <Summary total={total} />
      <form className="AddItem-form">
        <p className="error-msg">{errorMsg}</p>
        <input className="AddItem-text-input" type="text" name="item" onChange={handleChange} placeholder="Item Name" />
        <div className="AddItem-form-icons">
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-passport" />
            {' '}
            <i data-testid="fas fa-passport" className="fas fa-passport" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-volleyball-ball" />
            {' '}
            <i className="fas fa-volleyball-ball" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-coffee" />
            {' '}
            <i className="fas fa-coffee" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-dumbbell" />
            {' '}
            <i className="fas fa-dumbbell" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-hamburger" />
            {' '}
            <i className="fas fa-hamburger" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-utensils" />
            {' '}
            <i className="fas fa-utensils" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-baby" />
            {' '}
            <i className="fas fa-baby" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-bus" />
            {' '}
            <i className="fas fa-bus" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-taxi" />
            {' '}
            <i className="fas fa-taxi" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-stethoscope" />
            {' '}
            <i className="fas fa-stethoscope" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-spa" />
            {' '}
            <i className="fas fa-spa" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-wifi" />
            {' '}
            <i className="fas fa-wifi" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-couch" />
            {' '}
            <i className="fas fa-couch" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-tshirt" />
            {' '}
            <i className="fas fa-tshirt" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-suitcase-rolling" />
            {' '}
            <i className="fas fa-suitcase-rolling" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-graduation-cap" />
            {' '}
            <i className="fas fa-graduation-cap" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-pills" />
            {' '}
            <i className="fas fa-pills" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-charging-station" />
            {' '}
            <i className="fas fa-charging-station" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-gamepad" />
            {' '}
            <i className="fas fa-gamepad" />
          </div>
          <div className="Icon-wrap">
            <input onChange={handleChange} type="radio" name="icons" value="fas fa-book" />
            {' '}
            <i className="fas fa-book" />
          </div>

        </div>
      </form>

      <button type="button" className="AddItem-btn" onClick={sendData}>Add item</button>

      <Footer ClickedBox={3} />
    </div>
  );
};

export default AddItems;
