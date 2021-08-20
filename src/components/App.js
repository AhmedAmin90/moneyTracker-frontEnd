import React , {useState , useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import './App.css';
import * as actions from '../actions/index'
import Footer from './Footer';
import Session from '../containers/Session'
import Header from './Header';
import * as helpers from '../helpers'



function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const contentId = useSelector(state=> state.contentId);
  const errorMsg = useSelector(state=> state.errorMsg)

  const [login , setLogin] = useState('Sign In')

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


  const handleClick = ({target})=> {
    setLogin(target.innerText);
    dispatch(actions.error(''))
  }
   
  const loginBtn = login === 'Sign In' ? <Session sendData={helpers.sendUserData} errorMsg={errorMsg} text="Sign in - Track your expenses now !"/> :  <Session sendData={helpers.createUser} errorMsg={errorMsg} text="Sign up with us - Track your expenses now !"/>

  return (
    <div className="App">
      <Header />
      <button className="Session-btn" onClick={handleClick}>{login === 'Sign In' ? 'Sign Up' : 'Sign In'}</button>
      <div>
      {loginBtn}
      </div>
      <Footer />
    </div>
  );
}

export default App;
