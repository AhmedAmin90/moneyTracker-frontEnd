import React , {useState , useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as actions from '../src/actions/index'
const Session = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.userId)
    const [input , setIntpu] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e)=> {
        setIntpu(pre => ({...pre , [e.target.name] : e.target.value}))
    }

    const sendData =  async (e)=> {
        e.preventDefault();
        await fetch(`https://pacific-mountain-97932.herokuapp.com/sessions`, {
          method: 'post',
          body: JSON.stringify({ username: input.username, password: input.password}),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }).then((res) => res.json()).then((res) => {
            if (res.message) {
              console.log(res.message)
              dispatch(actions.error(res))
            }
        if (res.id) {
            dispatch(actions.login(res))
            dispatch(actions.error(''))
            console.log(res);
 
        }})
      }


      if (userId) {
        return <Redirect to={`/home/${userId}`} />;
      }    
    return (
        
        <div>
            <form>
                <input type="text" onChange={handleChange} name="username" placeholder="username"/>
                <input type="password" onChange={handleChange}  name="password" placeholder="password"/>
                <button onClick={sendData}>Submit</button>
            </form>
        </div>
    )
}

export default Session
