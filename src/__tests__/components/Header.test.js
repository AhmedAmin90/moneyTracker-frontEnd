import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header', () => {
  beforeEach(() => {
    render(<Header />);
  });

  it('Presence of header text', () => {
    const element = screen.getByText(/Money Tracker/i);
    expect(element).toBeTruthy();
  });
  it('Header in nav element', () => {
    expect(screen.getByTestId('nav')).toBeInTheDocument();
  });
});
