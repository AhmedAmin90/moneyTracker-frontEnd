import React , {useState , useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import './App.css';
import axios from 'axios';
import Session from './Session';
import Registration from './Registration';
function App() {
  const userId = useSelector((state) => state.userId);



  if (userId) {
    return <Redirect to={`/home/${userId}`} />;
  } 
   

  return (
    <div className="App">
      <Session />
      <Registration />
    </div>
  );
}

export default App;
