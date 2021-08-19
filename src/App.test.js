import { render, screen , fireEvent } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from './index'
import Enzyme from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'
import {shallow } from 'enzyme'

Enzyme.configure({adapter: new EnzymeAdapter()})
describe('rendered App',()=> {
  let renderedComponent;
  let wrapper;
  beforeEach(() => {
     renderedComponent =  render( <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,);
      wrapper = shallow(<Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>);
   
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

// test('Click on Add expenses will raise an error and change the store' , async ()=> {
//     const {getByText} =  renderedComponent;
//     const button = getByText('Add Expenses')
//     await fireEvent.click(button)
//     const myStore = store.getState();
//     const element = screen.getByText(/Please Sing in firstly to Add expenses/i);
//     expect(element).toBeInTheDocument();
//     expect(myStore.contentId).toBe(1)
//   })

test('Click on Sign up will show to us sing up form' , async ()=> {
    const {getByText} =  renderedComponent;
    const button = getByText('Sign Up')
    await fireEvent.click(button)
    const element = screen.getByText(/Sign up with us - Track your expenses now !/i);
    expect(element).toBeInTheDocument();
  })

  // test('Click on Sign up will show to us sing up form' , async ()=> {
  //   const {getByText} =  renderedComponent;
  //   const button = screen.getByRole('button')
  //   await fireEvent.click(button)
  //   const element = screen.getByText(/Incorrect! Please check your Username or Password.!/i);
  //   expect(element).toBeInTheDocument();
  // })




 test('Presence of login form' , ()=> {
    expect(wrapper.find('input[name="username"]')).toBeTruthy()
    expect(wrapper.find('input[name="password"]')).toBeTruthy()
    wrapper.find('input[name="password"]').simulate("change", {
      target: { name: "password", value: "123123" },
    })

  })



})




