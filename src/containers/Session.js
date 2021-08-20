import React , {useState} from 'react'
import './Session.css';
import LoginForm from './LoginForm';
const Session = ({sendData , text , errorMsg}) => {
    const [input , setIntpu] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e)=> {
        setIntpu(pre => ({...pre , [e.target.name] : e.target.value}))
    }

    const handleSendData = (e)=> {
        sendData(e, input.username , input.password)
    }

    return (
        <LoginForm 
        text={text}
        errorMsg={errorMsg}
        handleChange={handleChange}
        sendData={handleSendData} />
    )
}

export default Session
