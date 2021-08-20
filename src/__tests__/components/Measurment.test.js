import Measurment from '../../components/Measurment'
import { render, screen  } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../../index'


let renderedComponent;
const expense = {created_at: "2021-08-19T12:25:38.451Z" , expense: 20}
const removeExpense = jest.fn()
describe('Measurment', ()=> {
    beforeEach(()=> {
        renderedComponent = render(
            <Provider store={store}>
            <Router>
                <Measurment expense={expense} removeExpense={removeExpense} />
            </Router>
          </Provider>);
    })

    it('Test', ()=> {
        const { container } = renderedComponent;
        const expenseParagraph = container.querySelector('.Measurment-right p');
        expect(expenseParagraph).toBeInTheDocument()
        expect(expenseParagraph).toHaveTextContent('20')
    })
    it('Test', ()=> {
        const element = screen.getByText(/Aug 19 2021/i);
        expect(element).toBeTruthy()
    })
    it('Test', ()=> {
        const { container } = renderedComponent;
        const div = container.querySelector('.Measurment');
        expect(div).toBeInTheDocument()
    })

})