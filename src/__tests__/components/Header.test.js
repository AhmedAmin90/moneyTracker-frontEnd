import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header', () => {
  beforeEach(() => {
    render(<Header />);
  });

  it('Test', () => {
    const element = screen.getByText(/Money Tracker/i);
    expect(element).toBeTruthy();
  });
});
