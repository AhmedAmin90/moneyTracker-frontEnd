import { render, screen } from '@testing-library/react';
import Box from '../../containers/Box';

let renderedComponent;
const box = {
  id: 1, clicked: false, icon: 'fas fa-chart-bar', text: 'Add Expenses',
};
const boxTwo = {
  id: 1, clicked: true, icon: 'fas fa-chart-bar', text: 'Track Expenses',
};

const handleClicke = jest.fn();
describe('Test Box not clicked', () => {
  beforeEach(() => {
    renderedComponent = render(<Box
      key={box.id}
      handleClickBox={handleClicke}
      box={box}
      clicked={box.clicked}
    />);
  });

  it('Presence of add expenses', () => {
    const element = screen.getByText(/Add Expenses/i);
    expect(element).toBeInTheDocument();
  });
  it('Class with footer-box without clicked', () => {
    const { container } = renderedComponent;
    const div = container.querySelector('.Footer-box');
    expect(div).toBeInTheDocument();
  });
});

describe('Test Box not clicked', () => {
  beforeEach(() => {
    renderedComponent = render(<Box
      key={boxTwo.id}
      handleClickBox={handleClicke}
      box={boxTwo}
      clicked={boxTwo.clicked}
    />);
  });

  it('Presnece of track expenses', () => {
    const element = screen.getByText(/Track Expenses/i);
    expect(element).toBeInTheDocument();
  });
  it('Class with footer-box-clicked', () => {
    const { container } = renderedComponent;
    const div = container.querySelector('.Footer-box-clicked');
    expect(div).toBeInTheDocument();
  });
});
