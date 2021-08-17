import React  , {useState ,  useEffect}from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { useDispatch , useSelector } from 'react-redux';
import Measurment from './Measurment';
import Footer from './Footer';

const Single = ({itemData}) => {
    const itemName = itemData.match.params.itemName;
    const userId = useSelector((state) => state.userId);
    const dispatch = useDispatch();

    // For Adding new Measurment:
    const [expense , setExpense ] = useState('0')
    const handleChange = (e)=> {
        setExpense(e.target.value)
    }
    const [expenses , setExpenses] = useState([]);
    const [itemId, setItemdId] = useState('');
    const [axiosRes, setAxiosRes] = useState('');

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        setAxiosRes(axiosRes);
        const getData = async ()=>{
                const res = await axios.get(`https://pacific-mountain-97932.herokuapp.com/users/${userId}`, {
                    cancelToken: source.token,
                  });
                const userItems = await res.data.items
                const expRes = await axios.get('https://pacific-mountain-97932.herokuapp.com/api/v1/expenses');
                const expData = await expRes.data;
                const selectedItem = userItems.find(item=> item.name === itemName);
                const expArray = expData.filter(exp=> exp.item_id === itemId)
                // console.log(expArray)  
                setExpenses(expArray)
                // console.log(selectedItem) 
                setItemdId(selectedItem.id);
                    
        }  
        getData();
        return () => {
            source.cancel('axios request cancelled');
          };
    })
    
    // For sending new Measurment to database:
    const sendData =  ()=> {
        fetch(`https://pacific-mountain-97932.herokuapp.com/api/v1/expenses`, {
          method: 'post',
          body: JSON.stringify({ expense: expense, item_id: itemId}),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        const currentDate = new Date().toISOString()

        setExpenses(pre=> ([...pre, {expense: expense, id: itemId  , created_at:currentDate} ]))
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

            {expenses.map((exp , index )=>(
                <Measurment key={index} expense={exp} />
            ))}
            <Footer  />
        </div>
    )
}

export default Single
