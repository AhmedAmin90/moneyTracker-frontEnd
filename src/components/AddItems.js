import React  , {useState , useEffect}from 'react'
import { useDispatch , useSelector } from 'react-redux';
import * as actions from '../actions/index'

const AddItems = ({userId}) => {
    const dispatch = useDispatch();

    const [value , setValue ] = useState({
        icons: '',
        item: ''
    });
    const handleChange = (e)=> {
        setValue(pre => ({...pre , [e.target.name] : e.target.value}))
    }

    const sendData =  ()=> {
        fetch(`https://pacific-mountain-97932.herokuapp.com/api/v1/items`, {
          method: 'post',
          body: JSON.stringify({ name: value.item, user_id: userId, icon: value.icons}),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        dispatch(actions.items({name: value.item, user_id: userId, icon: value.icons}))
      }
    
    return (
        <div>
            <form>
                <input onChange={handleChange} type="radio" name="icons" value="fas fa-passport"/> <i className="fas fa-passport"></i>
                <input onChange={handleChange} type="radio" name="icons" value="fas fa-volleyball-ball"/> <i className="fas fa-volleyball-ball"></i>
                <input type='text' name="item" onChange={handleChange}/>
            </form>
            <button onClick={sendData} >Add item</button>
        </div>
    )
}

export default AddItems
