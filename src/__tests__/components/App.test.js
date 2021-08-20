import { render, screen , fireEvent } from '@testing-library/react';
import App from '../../components/App';
import Session from '../../containers/Session'
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
  beforeEach(() => {
     renderedComponent =  render( <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,);
   
  })

  test('renders with Money tracker phrase', () => {
    const element = screen.getByText(/Money Tracker/i);
    expect(element).toBeInTheDocument();
  });


test('Presnece of login forms div', () => {
  const { container } = renderedComponent;
 const element = container.querySelector('.Login-forms');
 expect(element).toBeInTheDocument();
});

test('Presnece of Footer and the content', () => {
  const { container } = renderedComponent;
  const element = container.querySelector('.Footer');
  expect(element).toBeInTheDocument();

});

test('Store' , ()=> {
    const myStore = store.getState();
    expect(myStore.contentId).toBe(2)

  })



test('Click on Sign up will show to us sing up form' , async ()=> {
    const {getByText} =  renderedComponent;
    const button = getByText('Sign Up')
    await fireEvent.click(button)
    const element = screen.getByText(/Sign up with us - Track your expenses now !/i);
    expect(element).toBeInTheDocument();
  })

  test('Click on Add expenses will raise an error and change the store' , async ()=> {
    const {getByText} =  renderedComponent;
    const button = getByText('Add Expenses')
    await fireEvent.click(button)
    const myStore = store.getState();
    const element = screen.getByText(/Please Sing in firstly to Add expenses/i);
    expect(element).toBeInTheDocument();
    expect(myStore.contentId).toBe(1)
  })


  test('Back store to 2 again ' , async ()=> {
    const {getByText} =  renderedComponent;
    const button = getByText('Track Expenses')
    await fireEvent.click(button)
    const myStore = store.getState();
    expect(myStore.contentId).toBe(2)
  })


})




