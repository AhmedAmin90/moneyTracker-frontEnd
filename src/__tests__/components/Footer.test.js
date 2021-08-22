import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Footer from '../../components/Footer';
import store from '../../index';

let renderedComponent;

describe('Footer', () => {
  beforeEach(() => {
    renderedComponent = render(
      <Provider store={store}>
        <Router>
          <Footer />
        </Router>
      </Provider>,
    );
  });

  it('Presnesce of add expenses page', () => {
    const element = screen.getByText(/Add Expenses/i);
    expect(element).toBeTruthy();
  });
  it('Presence of sing out link', () => {
    const element = screen.getByText(/Sign out/i);
    expect(element).toBeTruthy();
  });
  it('Presnece of element with footer class', () => {
    const { container } = renderedComponent;
    const div = container.querySelector('.Footer');
    expect(div).toBeInTheDocument();
  });
  it('Not presence of header', () => {
    const { container } = renderedComponent;
    const nav = container.querySelector('nav');
    expect(nav).not.toBeInTheDocument();
  });
});
