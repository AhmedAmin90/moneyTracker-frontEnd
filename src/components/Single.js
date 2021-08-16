import React  , {useState ,  useEffect}from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { useDispatch , useSelector } from 'react-redux';
// import AddExpenses from './AddExpenses';

const Single = ({itemData}) => {
    const itemId = itemData.match.params.itemId;
    const userId = useSelector((state) => state.userId);
    const dispatch = useDispatch();

    // For Adding new Measurment:
    const [expense , setExpense ] = useState('0')
    const handleChange = (e)=> {
        setExpense(e.target.value)
    }
    const [expenses , setExpenses] = useState([])
    const [axiosRes, setAxiosRes] = useState('');

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        setAxiosRes(axiosRes);
        const getData = async ()=>{
            const res = await axios.get(`https://pacific-mountain-97932.herokuapp.com/api/v1/items/${itemId}`, {
                cancelToken: source.token,
              });
            const data = await res.data
            console.log(data.expenses)
            setExpenses(data.expenses)
        }  
        getData();
        return () => {
            source.cancel('axios request cancelled');
          };
    },[axiosRes, itemId])
    
    // For sending new Measurment to database:
    const sendData =  ()=> {
        fetch(`https://pacific-mountain-97932.herokuapp.com/api/v1/expenses`, {
          method: 'post',
          body: JSON.stringify({ expense: expense, item_id: itemId}),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        setExpenses(pre=> ([...pre, {expense: expense, id: itemId , created_at:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`} ]))

        // dispatch(actions.items({name: value.item, user_id: userId, icon: value.icons}))
      }
    
    if (!userId) {
        return <Redirect to="/" />;
    } 
  
    return (
        <div>
            <form>
                <input type="number" min="0"  name="expense" onChange={handleChange} />
            </form>
            <button onClick={sendData}>Add New Expense</button>
           
            This is a test {itemId}

            {expenses.map((exp , index )=>(
                <li key={index}> {index} {exp.expense} was in {exp.created_at}</li>
            ))}
        
        </div>
    )
}

export default Single
