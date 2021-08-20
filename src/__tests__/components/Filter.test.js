import Filter from '../../components/Filter'
import React from 'react';
import { render, screen  } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../../index'
import {getData} from '../../__mocks__/axios'
import * as ReactReduxHooks from "../../react-redux-hooks";


let renderedComponent;
let useEffect;
const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };
describe('Measurment', ()=> {
    beforeEach(()=> {
        getData()
        useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect(); // 2 times
    mockUseEffect(); //
    /* mocking useSelector on our mock store */
    jest
       .spyOn(ReactReduxHooks, "useSelector")
       .mockImplementation(state => store.getState());
  /* mocking useDispatch on our mock store  */
  jest
     .spyOn(ReactReduxHooks, "useDispatch")
     .mockImplementation(() => store.dispatch);
        renderedComponent = render(
            <Provider store={store}>
            <Router>
                <Filter/>
            </Router>
          </Provider>);
    })

    it('Test', ()=> {
        const { container } = renderedComponent;
        const expenseParagraph = container.querySelector('.Filter-form');
        expect(expenseParagraph).toBeInTheDocument()
    })
    // it('Test', ()=> {
    //     const element = screen.getByText(currentDate);
    //     expect(element).toBeTruthy()
    // })
    // it('Test', ()=> {
    //     const { container } = renderedComponent;
    //     const div = container.querySelector('.Summary');
    //     expect(div).toBeInTheDocument()
    // })

})

