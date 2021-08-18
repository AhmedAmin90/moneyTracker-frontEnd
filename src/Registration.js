import React , {useState}from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as actions from '../src/actions/index';
import LoginForm from './components/LoginForm';


const Registration = ({sendData}) => {
    const errorMsg = useSelector(state=> state.errorMsg)
    const [input , setIntpu] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e)=> {
        setIntpu(pre => ({...pre , [e.target.name] : e.target.value}))
    }

    const handleSendData = (e)=>{
        sendData(e , input.username , input.password )
    }

    return (
        <LoginForm 
        text="Sign up with us - Track your expenses now !"
        errorMsg={errorMsg}
        handleChange={handleChange}
        sendData={handleSendData} />
    )
}

export default Registration
