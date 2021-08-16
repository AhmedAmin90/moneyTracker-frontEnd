import React , {useState , useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Redirect , Link } from "react-router-dom";
import AddItems from './AddItems';
import * as actions from '../actions/index'
import axios from 'axios';

const Home = ({userData}) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.userId);
    const itemsList = useSelector(state => state.items);
    const selectedId = userData.match.params.id;
    // const [items , setItems] = useState([])


    useEffect(() => {
        const getData = async ()=>{
        const res = await axios.get(`https://pacific-mountain-97932.herokuapp.com/users/${selectedId}`)
         const data = await res.data
         console.log(data.items);
         if (!userId || itemsList.length !==0) {
            //  Length to avoid rerender dispatching if i back to this page again
            //  userid to avoid dispatching items if some one add user id to the path without loging
            return 
        } 
        else {
            data.items.map(item=>(
                dispatch(actions.items(item))
             )) 
        }         
       }
       getData()
     }, [])
     
     if (!userId) {
        return <Redirect to="/" />;
    } 
  

    return (
        <div>
            <AddItems userId={selectedId} />
            This is a test {selectedId}    
            {itemsList.map(item=>(

            <Link key={item.name} to={`/items/${item.id}`}>
                <div key={item.name}>
                    <h1>{item.name}</h1>
                    <i className={item.icon}></i>
                </div>
            </Link>
            ))}  
        </div>
    )
}

export default Home
