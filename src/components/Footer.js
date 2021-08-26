import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/index';
import Box from '../containers/Box';
import './Footer.css';

const Footer = ({ ClickedBox = 2 }) => {
  const dispatch = useDispatch();
  const savedUserId = localStorage.getItem('userId');

  const [boxes, setBoxes] = useState([
    {
      id: 1, icon: 'fas fa-chart-bar', text: 'Add Expenses', clicked: false, path: '/addExpenses',
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

  useEffect(() => {
    const selectedBox = boxes.find((box) => box.id === ClickedBox);
    selectedBox.clicked = !selectedBox.clicked;
    const otherBoxes = boxes.filter((box) => box.id !== ClickedBox);
    otherBoxes.forEach((box) => {
      const anotherBox = box;
      anotherBox.clicked = false;
    });
    setBoxes([...boxes]);
  }, []);

  const handleClicke = (id) => {
    dispatch(actions.content(id));
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

Footer.defaultProps = {
  ClickedBox: 2,
};

Footer.propTypes = {
  ClickedBox: PropTypes.number,
};

export default Footer;
