/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions/index';
import Box from '../containers/Box';
import './Footer.css';

const Footer = () => {
  const dispatch = useDispatch();
  const contentId = useSelector((state) => state.contentId);
  const savedUserId = localStorage.getItem('userId');

  const [boxes, setBoxes] = useState([
    {
      id: 1, icon: 'fas fa-chart-bar', text: 'Add Expenses', clicked: false, path:'/addExpenses',
    },
    {
      id: 2, icon: 'fas fa-chart-line', text: 'Track Expenses', clicked: false, path: `/home/${savedUserId}`,
    },
    {
      id: 3, icon: 'fas fa-chart-pie', text: 'Add Items', clicked: false, path: '/addItems',
    },
    {
      id: 4, icon: 'fas fa-sign-out-alt', text: 'Sign out', clicked: false, path: '/',
    },
  ]);

  const handleClicke = (id) => {
    dispatch(actions.content(id));
    // const selectedBox = boxes.find((box) => box.id === contentId);
    // selectedBox.clicked = !selectedBox.clicked;
    // const otherBoxes = boxes.filter((box) => box.id !== contentId);
    // otherBoxes.forEach((box) => {
    //   const anotherBox = box;
    //   anotherBox.clicked = false;
    // });
    // setBoxes([...boxes]);
  };

  const renderBoxes = boxes.map((box) => (
    <Box
      key={box.id}
      handleClickBox={handleClicke}
      box={box}
      clicked={box.clicked}
    />
  ));

  return (
    <div className="Footer">
      {renderBoxes}
    </div>
  );
};

export default Footer;
