import React , {useState, useEffect}from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Filter.css'

const Filter = () => {
    const itemsList = useSelector(state => state.items);
    const userId = useSelector((state) => state.userId);

    const [value , setValue]= useState({
        item: itemsList[0].name,
        expense: 0
    });
    const [ itemId , setItemId ] = useState('');

    React.useEffect(() => {
        const getItemID = async ()=>{
            const res = await axios.get(`https://pacific-mountain-97932.herokuapp.com/users/${userId}`);
            const userItems = await res.data.items
            console.log(res.data)
            const selectedItem = userItems.find(item=> item.name === value.item);
            setItemId(selectedItem.id);
        } 

        getItemID()

    })

    


    const handleChange = (e)=>{
        setValue(pre => ({...pre , [e.target.name] : e.target.value}));

    }

 
    const sendData = async ()=> {
         await fetch(`https://pacific-mountain-97932.herokuapp.com/api/v1/expenses`, {
          method: 'post',
          body: JSON.stringify({ expense: value.expense, item_id: itemId}),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }).then((res) => res.json()).then((res) => {console.log(res)});
        document.querySelector('.Filter-form-number-input').value = ''
      }

    return (
        <div className="Filter">
            <form className="Filter-form">
                <p>Select the item: </p>
                <select name="item"  onChange={handleChange}>
                    {itemsList.map(item=>(
                        <option key={item.name}  value={item.name}>{item.name}</option>
                    ))}
                </select>
                <p>Enter the amount: </p>
                <input className="Filter-form-number-input" type="number" min="0"  name="expense" onChange={handleChange} placeholder="0" />
            </form>
            <button className="Add-expense-btn" onClick={sendData}>Add New Expense</button>
        </div>
    )
}

export default Filter
