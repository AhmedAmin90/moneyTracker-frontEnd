import React from 'react';
import PropTypes from 'prop-types';

const Box = ({ box, handleClickBox }) => {
  const handleClick = () => {
    handleClickBox(box.id);
  };
  const isClickedBox = box.clicked ? 'Footer-box-clicked ' : 'Footer-box';
  const isClickedArrow = box.clicked ? 'arrow-hidden-div' : '';

  return (

    <div key={box.id} className={isClickedBox} tabIndex={0} onClick={handleClick} role="button" onKeyDown={handleClick}>
      <div className={isClickedArrow} />
      <i className={box.icon} />
      <p>{box.text}</p>
    </div>

  );
};

Box.defaultProps = {
  box: {},
  handleClickBox: () => {},
};

Box.propTypes = {
  box: PropTypes.instanceOf(Object),
  handleClickBox: PropTypes.func,
};

export default Box;
