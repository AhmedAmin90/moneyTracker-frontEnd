import { render, screen , fireEvent } from '@testing-library/react';
import Session from '../../components/Session';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../../index'
import Enzyme from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'
import {shallow } from 'enzyme'

Enzyme.configure({adapter: new EnzymeAdapter()})

describe('rendered App',()=> {
    let renderedComponent;
    let wrapper;
    const handleClick = jest.fn()

    beforeEach(() => {
       renderedComponent =  render( <Provider store={store}>
        <Router>
          <Session sendData={handleClick} />
        </Router>
      </Provider>,);

        wrapper = shallow(<Provider store={store}>
          <Router>
          <Session sendData={handleClick} />
          </Router>
        </Provider>);
     
    })
  
    test('calls onClick prop when clicked', () => {
        fireEvent.click(screen.getByText(/Submit/i))
        expect(handleClick).toHaveBeenCalledTimes(1)
      }) 
  
  
  
  })
  
  
  
    // const Button = ({onClick, children}) => (
  //   <button onClick={onClick}>{children}</button>
  // )
  
  // test('calls onClick prop when clicked', async () => {
  //   const handleClick = jest.fn()
  //   render(
  //     <Provider store={store}>
  //     <Router>
  //       <Session sendData={handleClick} />
  //     </Router>
  //   </Provider>
  //   )
  //   const { container } = renderedComponent;
  //   const userInput = container.querySelector('.login-form-username');
  //   // expect(input.value).toEqual('Ahmed');
  //   // const { container } = renderedComponent;
  //   const passwInput = container.querySelector('.login-form-password');
  //    fireEvent.change(userInput, {target: {value: 'Ahmed'}})
  //    fireEvent.change(passwInput, {target: {value: '123456'}})
  //   // expect(input.value).toEqual('123456');
  //   await fireEvent.click(screen.getAllByText(/Submit/i)[0])
  //   expect(handleClick).toHaveBeenCalledTimes(1)
  // })



  