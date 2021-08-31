import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Measurment from '../../containers/Measurment';
import store from '../../index';

let renderedComponent;
const expense = { created_at: '2021-08-19T12:25:38.451Z', expense: 20 };
const removeExpense = jest.fn();
describe('Measurment', () => {
  beforeEach(() => {
    renderedComponent = render(
      <Provider store={store}>
        <Router>
          <Measurment expense={expense} removeExpense={removeExpense} />
        </Router>
      </Provider>,
    );
  });

  it('Test presnece of measurment paragraf with number of expense', () => {
    const { container } = renderedComponent;
    const expenseParagraph = container.querySelector('.Measurment-right p');
    expect(expenseParagraph).toBeInTheDocument();
    expect(expenseParagraph).toHaveTextContent('20');
  });
  it('Paragraph of expsnese does not show another number', () => {
    const { container } = renderedComponent;
    const expenseParagraph = container.querySelector('.Measurment-right p');
    expect(expenseParagraph).not.toHaveTextContent('25');
  });
  it('Presnsce of date with special format', () => {
    const element = screen.getByText(/Aug 19 2021/i);
    expect(element).toBeTruthy();
  });
  it('Presnsce of date with special format', () => {
    const { container } = renderedComponent;
    const expenseParagraph = container.querySelector('.Measurment-left p');
    expect(expenseParagraph).not.toHaveTextContent('2021-08-19T12:25:38.451Z');
  });
  it('Presnce of measurment div', () => {
    const { container } = renderedComponent;
    const div = container.querySelector('.Measurment');
    expect(div).toBeInTheDocument();
  });
});
