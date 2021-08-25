import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Single from '../../containers/Single';
import store from '../../index';
import '@testing-library/jest-dom/extend-expect';

describe('Data for mock', () => {
  const data = {
    savedUserId: 1,
    user: {
      id: 1, email: '', created_at: '2021-08-19T12:25:14.513Z', updated_at: '2021-08-19T12:25:14.513Z', username: 'ahmed',
    },
    expenses: [{
      id: 1, expense: 25, item_id: 1, created_at: '2021-08-14T10:24:37.582Z', updated_at: '2021-08-14T10:30:20.469Z',
    }],
  };

  beforeEach(() => {
    const routeComponentPropsMock = {
      history: {},
      location: {},
      match: { params: { itemName: 'Food' } },
    };
    render(
      <Provider store={store}>
        <Router>
          <Single testData={data} itemData={routeComponentPropsMock} />
        </Router>
      </Provider>,
    );
  });

  it('Presence of single form', () => {
    expect(screen.getByTestId('single-form')).toBeInTheDocument();
  });

  it('Presnece of add new expense button', () => {
    const element = screen.getByText(/Add New Expense/i);
    expect(element).toBeTruthy();
  });

  it('Presnece of item name', () => {
    const element = screen.getByText(/Food/i);
    expect(element).toBeInTheDocument();
  });

  it('Presnece of expense', () => {
    const element = screen.getByText(/25/i);
    expect(element).toBeInTheDocument();
  });

  it('Presnece of single footer', () => {
    const element = screen.getByText(/Back to Your Dashboard/i);
    expect(element).toBeInTheDocument();
  });
});
