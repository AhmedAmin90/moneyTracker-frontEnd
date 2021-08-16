import React , {useState}from 'react';
import { useDispatch , useSelector } from 'react-redux';


const AddExpenses = ({itemId}) => {
    const dispatch = useDispatch();

    const [expense , setExpense ] = useState('0')
    const handleChange = (e)=> {
        setExpense(e.target.value)
    }

    const sendData =  ()=> {
        fetch(`https://pacific-mountain-97932.herokuapp.com/api/v1/expenses`, {
          method: 'post',
          body: JSON.stringify({ expense: expense, item_id: itemId}),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        // dispatch(actions.items({name: value.item, user_id: userId, icon: value.icons}))
      }
    return (
        <div>
            <form>
                <input type="number" min="0"  name="expense" onChange={handleChange} />
            </form>
            <button onClick={sendData}>Add New Expense</button>
        </div>
    )
}

export default AddExpenses
