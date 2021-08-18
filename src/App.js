import React , {useState , useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import './App.css';
import axios from 'axios';
import * as actions from '../src/actions/index'
import Footer from './components/Footer';
import Session from './components/Session'
import Registration from './Registration';
import Header from './components/Header';
function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const contentId = useSelector(state=> state.contentId)

  if (contentId === 1 ) {
    dispatch(actions.error('Please Sing in firstly to Add expenses'))
}
else if (contentId === 3) {
  dispatch(actions.error('Please Sing in firstly to Add Items'))
}
else if (contentId === 4) {
  dispatch(actions.error('You did not logged yet , please try our application :) '))

}


  if (userId) {
    return <Redirect to={`/home/${userId}`} />;
  } 
   

  return (
    <div className="App">
      <Header />
      <Session />
      <Registration />
      <Footer />
    </div>
  );
}

export default App;
