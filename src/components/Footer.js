import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../actions/index';
import Box from '../containers/Box';
import './Footer.css';

const Footer = () => {
  const dispatch = useDispatch();
  // const contentId = useSelector((state) => state.contentId);

  const [boxes, setBoxes] = useState([
    {
      id: 1, icon: 'fas fa-chart-bar', text: 'Add Expenses', clicked: false,
    },
    {
      id: 2, icon: 'fas fa-chart-line', text: 'Track Expenses', clicked: true,
    },
    {
      id: 3, icon: 'fas fa-chart-pie', text: 'Add Items', clicked: false,
    },
    {
      id: 4, icon: 'fas fa-sign-out-alt', text: 'Sign out', clicked: false,
    },
  ]);

  const handleClicke = (id) => {
    const selectedBox = boxes.find((box) => box.id === id);
    selectedBox.clicked = !selectedBox.clicked;
    dispatch(actions.content(id));
    const otherBoxes = boxes.filter((box) => box.id !== id);
    otherBoxes.forEach((box) => {
      const anotherBox = box;
      anotherBox.clicked = false;
    });
    setBoxes([...boxes]);
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
