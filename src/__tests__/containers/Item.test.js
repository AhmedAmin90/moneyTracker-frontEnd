import { render, screen } from '@testing-library/react';
import Item from '../../containers/Item';

let renderedComponent;
const item = { icon: 'fas fa-chart-bar', name: 'Sport' };
const itemTwo = { icon: 'fas fa-chart-bar', name: 'Book for reading with children' };

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
  it('Return only first 10 letters of the item name', () => {
    render(<Item item={itemTwo} />);
    const element = screen.getByText(/Book for r/i);
    expect(element).toBeTruthy();
  });
});
