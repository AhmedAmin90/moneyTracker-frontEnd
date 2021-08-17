import React , {useState}from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as actions from '../src/actions/index';
const Registration = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.userId);
    const errorMsg = useSelector(state=> state.errorMsg)
    const [input , setIntpu] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e)=> {
        setIntpu(pre => ({...pre , [e.target.name] : e.target.value}))
    }

    const sendData =  async (e)=> {
        e.preventDefault();
        await fetch(`https://pacific-mountain-97932.herokuapp.com/users`, {
          method: 'post',
          body: JSON.stringify({ username: input.username, password: input.password , password_confirmation: input.password_confirmation}),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }).then((res) => res.json()).then((res) => {
            if (res.errors) {
                if (res.errors.username) {
                    dispatch(actions.error(res.errors.username[0]))
                }
                else if (res.errors.password) {
                    dispatch(actions.error(res.errors.password[0]))
                }
              console.log(res)
            //   dispatch(actions.error(res.errors.username[0]))
            }
        if (res.id) {
            dispatch(actions.login(res))
            dispatch(actions.error(''));
            console.log(res);
            <Redirect to={`/home/${userId}`} />
            dispatch(actions.content(2))
 
        }})
        // console.log(send) 
      }
    return (
        <div className="Login-forms">
             <form className="Login-form">
                <h3 className="Home-add-item ">Sign up with us - Track your expenses now !</h3>
                <p className="error-msg">{errorMsg}</p>
                <input type="text" onChange={handleChange} name="username" placeholder="username"/>
                <input type="password" onChange={handleChange}  name="password" placeholder="password"/>
                <button onClick={sendData}>Submit</button>
            </form>
        </div>
    )
}

export default Registration
