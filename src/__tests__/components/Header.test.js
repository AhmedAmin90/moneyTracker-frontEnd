import Header from '../../components/Header'
import { render, screen  } from '@testing-library/react';

let renderedComponent;


describe('Header', ()=> {
    beforeEach(()=> {
        renderedComponent = render(<Header />);
    })

    it('Test', ()=> {
        const element = screen.getByText(/Money Tracker/i);
        expect(element).toBeTruthy()
    })

})
