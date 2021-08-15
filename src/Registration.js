import React , {useState}from 'react'

const Registration = () => {
    const [input , setIntpu] = useState({
        username: '',
        password: '',
        password_confirmation: ''
    })

    const handleChange = (e)=> {
        setIntpu(pre => ({...pre , [e.target.name] : e.target.value}))
    }

    const sendData =  async (e)=> {
        e.preventDefault();
        const send = await fetch(`https://pacific-mountain-97932.herokuapp.com/users`, {
          method: 'post',
          body: JSON.stringify({ username: input.username, password: input.password , password_confirmation: input.password_confirmation}),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }).then((res) => res.json())
        console.log(send)
      }
    return (
        <div>
             <form>
                <input type="text" onChange={handleChange} name="username" placeholder="username"/>
                <input type="password" onChange={handleChange}  name="password" placeholder="password"/>
                <input type="password" onChange={handleChange}  name="password_confirmation" placeholder="password"/>
                <button onClick={sendData}>Submit</button>
            </form>
        </div>
    )
}

export default Registration
