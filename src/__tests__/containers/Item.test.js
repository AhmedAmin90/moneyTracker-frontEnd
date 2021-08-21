import { render, screen } from '@testing-library/react';
import Item from '../../containers/Item';

let renderedComponent;
const item = { icon: 'fas fa-chart-bar', name: 'Sport' };

describe('Item', () => {
  beforeEach(() => {
    renderedComponent = render(<Item item={item} />);
  });

  it('Test', () => {
    const element = screen.getByText(/Sport/i);
    expect(element).toBeTruthy();
  });
  it('Test', () => {
    const { container } = renderedComponent;
    const div = container.querySelector('.Item');
    expect(div).toBeInTheDocument();
  });
});
