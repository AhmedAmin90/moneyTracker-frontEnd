import React , {useState , useEffect} from 'react'
import './App.css';
import axios from 'axios';
import Session from './Session';

function App() {
  const [icons , setIcons] = useState([])
  const [value , setValue ] = useState('')
  const [item , setItem ] = useState('')
 

  useEffect(() => {
     const getData = async ()=>{
      const res = await axios.get('https://pacific-mountain-97932.herokuapp.com/users/1')
      // console.log(res)
      const data = await res.data
      console.log(data)
      let icon = data.items[4].icon
      let user = data.user.id
      setIcons([icon , user])
    }
    getData()
  }, [])


  const handleClick = (e)=>{
    setValue(e.target.value)
  }

  const handleItemname = (e)=> {
    setItem(e.target.value)
  }

  const sendData =  ()=> {
    fetch(`https://pacific-mountain-97932.herokuapp.com/api/v1/items`, {
      method: 'post',
      body: JSON.stringify({ name: item, user_id: icons[1], icon: value}),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      // const res = axios.post('https://pacific-mountain-97932.herokuapp.com/users/2')
      // // console.log(res)
      // const data = await res.data
      // console.log(data)
      // icons.setIcons(data.items[1].icon)
      // console.log(icons)
  }

  return (
    <div className="App">
      <Session />
        Start the project
        <button onClick={sendData}>test</button>
        <h1></h1>
        <form>
        <input onChange={handleClick} type="radio" name="icons" value="fas fa-passport"/> <i className="fas fa-passport"></i>
        <input onChange={handleClick} type="radio" name="icons" value="fas fa-volleyball-ball"/> <i className="fas fa-volleyball-ball"></i>
        </form>
        <input type='text' onChange={handleItemname}/>
        {icons.map(icon=>(
            <i className={icon}></i>
        ))}
      
    </div>
  );
}

export default App;
