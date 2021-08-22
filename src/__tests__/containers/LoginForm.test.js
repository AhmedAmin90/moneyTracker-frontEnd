import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import LoginForm from '../../containers/LoginForm';
import store from '../../index';

let renderedComponent;
const handleChange = jest.fn();
describe('LoginForm', () => {
  beforeEach(() => {
    renderedComponent = render(
      <Provider store={store}>
        <Router>
          <LoginForm text="Test text" errorMsg="Error msg" handleChange={handleChange} sendData={handleChange} />
        </Router>
      </Provider>,
    );
  });

  it('Presnsece of text from props', () => {
    const element = screen.getByText(/Test text/i);
    expect(element).toBeTruthy();
  });
  it('Presnece of error msg', () => {
    const element = screen.getByText(/Error msg/i);
    expect(element).toBeTruthy();
  });
  it('Presence of loging form div', () => {
    const { container } = renderedComponent;
    const div = container.querySelector('.Login-forms');
    expect(div).toBeInTheDocument();
  });
  it('Presence of loging form div', () => {
    const { container } = renderedComponent;
    const div = container.querySelector('.Login-forms');
    expect(div).toBeInTheDocument();
  });
  it('Do not render footer', () => {
    const { container } = renderedComponent;
    const div = container.querySelector('.Footer');
    expect(div).not.toBeInTheDocument();
  });
});
