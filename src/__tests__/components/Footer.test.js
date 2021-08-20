import Footer from '../../components/Footer'
import { render, screen  } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../../index'
let renderedComponent;

describe('Footer', ()=> {
    beforeEach(()=> {
        renderedComponent = render(
            <Provider store={store}>
            <Router>
                <Footer />
            </Router>
          </Provider>);
    })

    it('Test', ()=> {
        const element = screen.getByText(/Add Expenses/i);
        expect(element).toBeTruthy()
    })
    it('Test', ()=> {
        const element = screen.getByText(/Sign out/i);
        expect(element).toBeTruthy()
    })
    it('Test', ()=> {
        const { container } = renderedComponent;
        const div = container.querySelector('.Footer');
        expect(div).toBeInTheDocument()
    })

})
