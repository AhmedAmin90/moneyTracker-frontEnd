import React  , {useState , useEffect}from 'react'
import { useDispatch , useSelector } from 'react-redux';
import * as actions from '../actions/index';


const AddItems = ({userId}) => {
    const dispatch = useDispatch();
    const errorMsg = useSelector(state=> state.errorMsg)
    const [value , setValue ] = useState({
        icons: '',
        item: ''
    });
    const handleChange = (e)=> {
        setValue(pre => ({...pre , [e.target.name] : e.target.value}))
    }

    const sendData = async ()=> {
        await fetch(`https://pacific-mountain-97932.herokuapp.com/api/v1/items`, {
          method: 'post',
          body: JSON.stringify({ name: value.item, user_id: userId, icon: value.icons}),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }).then((res) => res.json()).then((res) => {console.log(res)
            if (res.name && res.name.length === 1) {
                dispatch(actions.error(res.name[0]))
            }
            else if (!res.name) {
                dispatch(actions.error(res.user_id[0]))
            }
            else {
                dispatch(actions.items({name: value.item, user_id: userId, icon: value.icons}))
                dispatch(actions.error(''));
                document.querySelector('.AddItem-text-input').value = '';
                setValue(pre=>({...pre, item: ''}))
            }
        })
      }
    
    return (
        <div className="AddItem">
            <form className="AddItem-form">
                <p className="error-msg">{errorMsg}</p>
                <input className="AddItem-text-input" type='text' name="item" onChange={handleChange}/>
                <div className="AddItem-form-icons">
                    <div className="Icon-wrap">
                        <input  onChange={handleChange} type="radio" name="icons" value="fas fa-passport"/> <i data-testid="fas fa-passport" className="fas fa-passport"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange}  type="radio" name="icons" value="fas fa-volleyball-ball"/> <i className="fas fa-volleyball-ball"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-coffee"/> <i className="fas fa-coffee"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-dumbbell"/> <i className="fas fa-dumbbell"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-hamburger"/> <i className="fas fa-hamburger"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-utensils"/> <i className="fas fa-utensils"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-baby"/> <i className="fas fa-baby"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-bus"/> <i className="fas fa-bus"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-taxi"/> <i className="fas fa-taxi"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-stethoscope"/> <i className="fas fa-stethoscope"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-spa"/> <i className="fas fa-spa"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-wifi"/> <i className="fas fa-wifi"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-couch"/> <i className="fas fa-couch"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-tshirt"/> <i className="fas fa-tshirt"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-suitcase-rolling"/> <i className="fas fa-suitcase-rolling"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-graduation-cap"/> <i className="fas fa-graduation-cap"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-pills"/> <i className="fas fa-pills"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-charging-station"/> <i className="fas fa-charging-station"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-gamepad"/> <i className="fas fa-gamepad"></i>
                    </div>
                    <div className="Icon-wrap">
                        <input onChange={handleChange} type="radio" name="icons" value="fas fa-book"/> <i className="fas fa-book"></i>
                    </div>
                    
                </div>
            </form>
            <button className="AddItem-btn" onClick={sendData} >Add item</button>

        </div>
    )
}

export default AddItems