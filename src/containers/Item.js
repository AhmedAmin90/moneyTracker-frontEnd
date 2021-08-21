import React from 'react';
import PropTypes from 'prop-types';
import './Item.css';

const Item = ({ item }) => (
  <div className="Item">
    <i data-testid="items-div-icon" className={item.icon} />
    <h1>{item.name}</h1>
  </div>
);

Item.defaultProps = {
  item: {},
};

Item.propTypes = {
  item: PropTypes.instanceOf(Object),
};

export default Item;
