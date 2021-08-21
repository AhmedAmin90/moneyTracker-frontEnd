import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import AddItems from '../../containers/AddItems';
import store from '../../index';

let renderedComponent;

describe('Test Box not clicked', () => {
  beforeEach(() => {
    renderedComponent = render(
      <Provider store={store}>
        <Router>
          <AddItems userId={1} />
        </Router>
      </Provider>,
    );
  });

  it('Presence of add items div', () => {
    const { container } = renderedComponent;
    const div = container.querySelector('.AddItem');
    expect(div).toBeInTheDocument();
  });
  it('It renders icons', () => {
    expect(screen.getByTestId('fas fa-passport')).toHaveClass('fas fa-passport');
  });
});
