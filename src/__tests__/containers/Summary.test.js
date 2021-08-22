import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Summary from '../../containers/Summary';
import store from '../../index';

let renderedComponent;
const currentDate = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`).toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
describe('Measurment', () => {
  beforeEach(() => {
    renderedComponent = render(
      <Provider store={store}>
        <Router>
          <Summary total={10} />
        </Router>
      </Provider>,
    );
  });

  it('Presnce of total number', () => {
    const { container } = renderedComponent;
    const expenseParagraph = container.querySelector('.Summary-percentage-circle p');
    expect(expenseParagraph).toBeInTheDocument();
    expect(expenseParagraph).toHaveTextContent('10');
  });
  it('Presnece of current date with specific format', () => {
    const element = screen.getByText(currentDate);
    expect(element).toBeTruthy();
    expect(element).not.toHaveTextContent('2021-08-19T12:25:38.451Z');
  });
  it('Presence of summary div', () => {
    const { container } = renderedComponent;
    const div = container.querySelector('.Summary');
    expect(div).toBeInTheDocument();
  });
});
