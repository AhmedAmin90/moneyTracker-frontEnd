// import React , {useState } from 'react'
// import { useDispatch } from 'react-redux'
// import * as actions from '../src/actions/index'
// const Session = () => {
//     const dispatch = useDispatch()
//     const [input , setIntpu] = useState({
//         username: '',
//         password: ''
//     })

//     const handleChange = (e)=> {
//         setIntpu(pre => ({...pre , [e.target.name] : e.target.value}))
//     }

//     const sendData =  async (e)=> {
//         e.preventDefault();
//         const send = await fetch(`https://pacific-mountain-97932.herokuapp.com/sessions`, {
//           method: 'post',
//           body: JSON.stringify({ username: input.username, password: input.password}),
//           headers: { 'Content-type': 'application/json; charset=UTF-8' },
//         }).then((res) => res.json())

//         console.log(send)
//         dispatch(actions.login(send))
//       }
    
//     return (
        
//         <div>
//             <form>
//                 <input type="text" onChange={handleChange} name="username" placeholder="username"/>
//                 <input type="password" onChange={handleChange}  name="password" placeholder="password"/>
//                 <button onClick={sendData}>Submit</button>
//             </form>
//         </div>
//     )
// }

// export default Session
