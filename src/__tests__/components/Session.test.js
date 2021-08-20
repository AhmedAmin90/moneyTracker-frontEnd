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

  // This line for prevent the error:
  // Error: Not implemented: HTMLFormElement.prototype.submit
 // In the test console
//  Reference: https://github.com/jsdom/jsdom/issues/1937
  let emit;

  beforeAll(() => {
    ({ emit } = window._virtualConsole);
  });

  beforeEach(() => {
    window._virtualConsole.emit = jest.fn();
  });

  afterAll(() => {
    window._virtualConsole.emit = emit;
  });

  // End of these lines

  // Start on testing:
    let renderedComponent;
    let wrapper;
    const handleClick = jest.fn()

    beforeEach(() => {
       renderedComponent =  render( <Provider store={store}>
        <Router>
          <Session sendData={handleClick} errorMsg="Test error msg" text="This is a test text"/>
        </Router>
      </Provider>,);

        wrapper = shallow(<Provider store={store}>
          <Router>
          <Session sendData={handleClick}  />
          </Router>
        </Provider>);
     
    })
  
    test('calls onClick prop when clicked', () => {
        fireEvent.click(screen.getByText(/Submit/i))
        expect(handleClick).toHaveBeenCalledTimes(1)
      }) 

      test('calls onClick prop when clicked', () => {
        const element = screen.getByText(/Test error msg/i);
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('error-msg');
      })

      test('calls onClick prop when clicked', () => {
        const element = screen.getByText(/This is a test text/i);
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('Home-add-item');
      })

      test('Presence of login form' , ()=> {
        expect(wrapper.find('input[name="username"]')).toBeTruthy()
        expect(wrapper.find('input[name="password"]')).toBeTruthy()
      })
    
      test('Change the value of user name' ,  ()=> {
        const { container } = renderedComponent;
        const input = container.querySelector('.login-form-username');
        fireEvent.change(input, {target: {value: 'Ahmed'}})
        expect(input.value).toEqual('Ahmed');
      })
    
      test('Change the value of password' ,  ()=> {
        const { container } = renderedComponent;
        const input = container.querySelector('.login-form-password');
        fireEvent.change(input, {target: {value: '123456'}})
        expect(input.value).toEqual('123456');
      })
    
  
  })
  


  