import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Filter from '../../containers/Filter';
import store from '../../index';

describe('Measurment', () => {
  const data = {
    user: {
      id: 1, email: '', created_at: '2021-08-19T12:25:14.513Z', updated_at: '2021-08-19T12:25:14.513Z', username: 'ahmed',
    },
    items: [{
      created_at: '2021-08-19T12:25:38.451Z',
      icon: 'fas fa-coffee',
      id: 1,
      name: 'cafe',
      updated_at: '2021-08-19T12:25:38.451Z',
      user_id: 1,
    }],
  };
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Filter testData={data} />
        </Router>
      </Provider>,
    );
  });

  it('display the filter component', () => {
    expect(screen.getByTestId('filter-component')).toBeInTheDocument();
  });
  it('display the filter select', () => {
    expect(screen.getByTestId('filter-select')).toBeInTheDocument();
  });
  it('display the filter input', () => {
    expect(screen.getByTestId('filter-input')).toBeInTheDocument();
  });
});
