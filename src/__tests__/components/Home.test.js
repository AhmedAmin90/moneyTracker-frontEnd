import React from 'react'
// Component
import Home from '../../components/Session';

// Testing library
import { render, screen , act } from '@testing-library/react';

// Redux and router
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import * as ReactReduxHooks from "../../react-redux-hooks";
// import store from '../../index'
// import * as actions from '../../actions/index';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'

// Axios
import axios from 'axios'
import mockAxios from "jest-mock-axios";
// Enzyme:
import { configure , shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });


describe("RecipeList", () => {
  let wrapper;
  let useEffect;
  let store;
  const data = {
    user: {id: 1, email: "", created_at: "2021-08-19T12:25:14.513Z", updated_at: "2021-08-19T12:25:14.513Z", username: "ahmed"},
    items: [{
        created_at: "2021-08-19T12:25:38.451Z",
        icon: "fas fa-coffee",
        id: 1,
        name: "cafe",
        updated_at: "2021-08-19T12:25:38.451Z",
        user_id: 1
    }]
}

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };
  beforeEach(() => {
    /* mocking store */
    store = configureStore([thunk])({
      userId: data.user.id,
      errorMsg: '',
      items: data.items,
      contentId: 2
    });

    const routeComponentPropsMock = {
        history: {},
        location: {},
        match: { params: { id: 1 } },
      };
  
    /* mocking useEffect */
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
  /* shallow rendering */
     wrapper = shallow(
               <Provider store={store}>
                <Router>
                  <Home userData={routeComponentPropsMock} />
                </Router>
              </Provider>,);
  });

  it('Store' , ()=> {
    const myStore = store.getState();
    expect(myStore.userId).toBe(1)
    expect(myStore.items).toHaveLength(1);
  })

  it("should dispatch getAllShirts action to store", () => {
    const actions = store.getActions();
    expect(actions).toBeInstanceOf(Array);
  });

  
});


  
  