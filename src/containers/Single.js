import React  , {useState ,  useEffect}from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { useDispatch , useSelector } from 'react-redux';
import Measurment from './Measurment';
import Summary from './Summary'
import { Link } from 'react-router-dom';
import './Single.css'

const Single = ({itemData , testData}) => {
    const itemName = itemData.match.params.itemName;
    const userId = useSelector((state) => state.userId);
    const dispatch = useDispatch();
    
    // For Adding new Measurment:
    const [expense , setExpense ] = useState(0)
    const handleChange = (e)=> {
        setExpense(e.target.value)
    }
    const [expenses , setExpenses] = useState([]);
    const [itemId, setItemId] = useState('');
    const [axiosRes, setAxiosRes] = useState('');
    const [total , setTotal] = useState(0)

    
    useEffect(() => {

        if (!testData) {
            var cancelToken = axios.CancelToken;
            var source = cancelToken.source();
            setAxiosRes("axios request created");
        }
        const getData = async ()=>{
            if (!userId) {
                return <Redirect to="/" />;
            } 

            try {
                const res = await axios.get(`https://pacific-mountain-97932.herokuapp.com/users/${userId}`, {
                    cancelToken: source.token,
                  })
                setAxiosRes(res)  
                const userItems = await res.data.items
                const expRes = await axios.get('https://pacific-mountain-97932.herokuapp.com/api/v1/expenses');
                const expData = await expRes.data;
                const selectedItem = userItems.find(item=> item.name === itemName);
                const expArray = expData.filter(exp=> exp.item_id === itemId)
                // console.log(expArray)  
                setExpenses(expArray)
                // console.log(selectedItem) 
                setItemId(selectedItem.id);
                let sum = 0
                const sumAll = expenses.map(exp => sum = sum + exp.expense)
                setTotal(sumAll[sumAll.length-1])  
            } catch (err) {
                if (axios.isCancel(err)) {
                  return "axios request cancelled";
                } 
                throw err
            }
                 
        }  
        if (!testData) {
            getData();
            return () => {
                source.cancel('axios request cancelled');
            };
        }
    })

    if (!userId) {
        return <Redirect to="/" />;
    } 
    // let sum = 0
    // const sumAll = expenses.map(exp => sum = sum + exp.expense)
    
    // For sending new Measurment to database:
    const sendData =  ()=> {
        fetch(`https://pacific-mountain-97932.herokuapp.com/api/v1/expenses`, {
          method: 'post',
          body: JSON.stringify({ expense: parseFloat(expense), item_id: itemId}),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })

      }

    const handleRemoveExpense = (id)=>{
        const selectedExpense = expenses.find(exp => exp.id === id)
        console.log(selectedExpense )
        fetch(`https://pacific-mountain-97932.herokuapp.com/api/v1/expenses/${id}`, {
            method: 'DELETE',
          })
    }
    
  
  
    return (
     
        <div className="Single">
            <div>
             <Summary total={total}/>
            </div>
            <div className="Single-form">
                <form className="Filter-form">
                    <h1 className="Home-add-item">Add Another expense: </h1>
                    <input type="number" name="expense" min="0"  onChange={handleChange} placeholder="0"/>
                </form>
                
                <button className="Add-expense-btn" onClick={sendData}>Add New Expense</button>
            </div>
  
            <div>
                <h1 className="Home-add-item">{itemName}</h1>
            {expenses.map((exp , index )=>(
                <Measurment key={index} id={exp.id} expense={exp} removeExpense={handleRemoveExpense}/>
            ))}
            </div>
            <div className="Single-footer" >
                <Link to={`/home/${userId}`}> Back to Your Dashboard</Link>
            </div>
        </div>
       
    )
}

export default Single
