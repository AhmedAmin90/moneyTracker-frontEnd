/* eslint-disable import/no-cycle , react/prop-types ,  consistent-return */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getData, setTotal } from '../helpers';
import AddItems from '../containers/AddItems';
import * as actions from '../actions/index';
import Summary from '../containers/Summary';
import Item from '../containers/Item';
import Footer from './Footer';
import './Home.css';
import Filter from '../containers/Filter';
import Header from './Header';

const Home = ({ userData, testData = false }) => {
  const dispatch = useDispatch();
  const total = useSelector((state) => state.total);
  let itemsList = useSelector((state) => state.items);
  let savedUserId = localStorage.getItem('userId');
  if (testData) {
    savedUserId = testData.user.id;
    itemsList = testData.items;
    dispatch(actions.content(2));
  }
  const selectedId = userData.match.params.id;
  const contentId = useSelector((state) => state.contentId);

  useEffect(() => {
    if (itemsList.length !== 0) {
      return;
    }
    if (!testData) {
      getData(savedUserId);
    }
  }, []);

  if (!savedUserId) {
    return <Redirect to="/" />;
  }

  const addMeasurment = itemsList.length !== 0 ? (
    <div>
      {' '}
      <Filter />
      {' '}
    </div>
  ) : (
    <div>

      <h1 className="Home-add-item"> Please Add Items first !</h1>
    </div>
  );
  const instructions = (
    <div>

      <h1 className="Home-add-item">Welcome to Money tracker App - Thanks to use our application</h1>
      <p className="intro-paragraph">In this app , you can add unlimited items to track your expenses in this items.</p>
      <h1 className="Home-add-item">How To Add Your First Items ?</h1>
      <ul className="instructions-list">
        <li> Click on Add items in the footer.</li>
        <li>
          Write the name of your item That you need to track your expenses on
          (food, taxi, travel ...)
        </li>
        <li> Select the proper icon which is descriptive to your item. </li>
        <li> Click on Add item button , that was easy ! Start tracking your expenses!.</li>
      </ul>
    </div>
  );

  const renderItems = (
    <div className="Home-child items-div-child">

      <div className="Home-items-div" data-testid="items-div">

        {itemsList.map((item) => (
          <Link key={item.name} to={`/items/${item.name}`} data-testid={item.name}>
            <Item key={item.name} item={item} />
          </Link>
        ))}
      </div>
    </div>
  );

  const itemsPresence = itemsList.length > 0 ? renderItems : instructions;

  const renderContent = () => {
    if (contentId === 1) {
      return addMeasurment;
    }
    if (contentId === 2) {
      setTotal(savedUserId);
      return itemsPresence;
    }
    if (contentId === 3) {
      return (
        <div>
          <h1 className="Home-add-item">Add New Item</h1>
          <AddItems userId={selectedId} />
        </div>
      );
    }
    if (contentId === 4) {
      localStorage.setItem('userId', '');
      localStorage.setItem('itemName', '');
      window.location.reload();
    }
  };

  return (
    <div className="Home" data-testid="home-component">
      <div>
        <Header />
        <Summary total={total} />
      </div>

      {renderContent()}
      <Footer />
    </div>
  );
};

Home.defaultProps = {
  userData: {
    history: {},
    location: {},
    match: { params: { id: 0 } },
  },
};

Home.propTypes = {
  userData: PropTypes.instanceOf(Object),
};

export default Home;
