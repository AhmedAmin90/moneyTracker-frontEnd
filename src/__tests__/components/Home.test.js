import React from 'react'
import Home from '../../components/Home';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../../index'
import '@testing-library/jest-dom/extend-expect';

 
describe("Data for mock", () => {
  const data = {
    user: { id: 1, email: "", created_at: "2021-08-19T12:25:14.513Z", updated_at: "2021-08-19T12:25:14.513Z", username: "ahmed" },
    items: [{
      created_at: "2021-08-19T12:25:38.451Z",
      icon: "fas fa-coffee",
      id: 1,
      name: "cafe",
      updated_at: "2021-08-19T12:25:38.451Z",
      user_id: 1
    }]
  }

  beforeEach(() => {
    const routeComponentPropsMock = {
      history: {},
      location: {},
      match: { params: { id: 1 } },
    };
    render(
      <Provider store={store}>
        <Router>
          <Home testData={data} userData={routeComponentPropsMock} />
        </Router>
      </Provider>);
  });

  it('Render Home Component', () => {
    expect(screen.getByTestId('home-component')).toBeInTheDocument()
  })
  it('Render items list', () => {
    expect(screen.getByTestId('items-div')).toBeInTheDocument()
  })
  it('Render item name', () => {
    expect(screen.getByTestId('cafe')).toBeInTheDocument()
  })

  it('item name not falsey', () => {
    expect(screen.getByTestId('cafe')).not.toBeFalsy()

  })

  it('Render Icon from fontawesome ', () => {
    expect(screen.getByTestId('items-div-icon')).toBeInTheDocument()
    expect(screen.getByTestId('items-div-icon')).toHaveClass('fas fa-coffee')
    expect(screen.getByTestId('items-div-icon')).not.toHaveClass('another-class')
  })

  it('Presence of Footer', ()=> {
    expect(screen.getByText('Add Expenses')).toBeInTheDocument()
})

it('Presence of Header', ()=> {
  expect(screen.getByText('Money Tracker')).toBeInTheDocument()
})


});




