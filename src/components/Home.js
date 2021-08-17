import React , {useState , useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Redirect , Link } from "react-router-dom";
import AddItems from './AddItems';
import * as actions from '../actions/index';
import Summary from './Summary';
import Item from './Item';
import axios from 'axios';
import Footer from './Footer';
import './Home.css'
import Filter from './Filter';

const Home = ({userData}) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.userId);
    const itemsList = useSelector(state => state.items);
    const contentId = useSelector(state=> state.contentId)
    const selectedId = userData.match.params.id;
    const [total , setTotal] = useState(0);
    // const [items , setItems] = useState(0)
    const [axiosRes, setAxiosRes] = useState('');

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        setAxiosRes(axiosRes);
        const getData = async ()=>{
        // const allItems = await axios.get('https://pacific-mountain-97932.herokuapp.com/api/v1/items');
        // const allItemslength = await allItems.data.length;
        // setItems(allItemslength + 1 )
        const res = await axios.get(`https://pacific-mountain-97932.herokuapp.com/users/${selectedId}`, {
            cancelToken: source.token,
          });
         const data = await res.data
         setTotal(data.total)
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
       getData();
       return () => {
        source.cancel('axios request cancelled');
      };
     }, [])
     
     if (!userId) {
        return <Redirect to="/" />;
    } 

    const renderContent = ()=> {

        if (contentId === 1 ) {
            return <Filter />
        }
        else if (contentId === 2 ) {
            return itemsPresence
        }
        else if (contentId === 3) {
            return <div>
                        <Summary total={total}/> 
                        <h1 className="Home-add-item">Add New Item</h1>
                        <AddItems userId={selectedId} />    
                   </div>
        }
        else if (contentId === 4) {
            window.location.reload()
        }
    }

    const instructions = 
        <div> 
            <Summary total={total}/> 
            <h1 className="Home-add-item">Welcome to Money tracker App - Thanks to use our application</h1>
            <p className="intro-paragraph">In this app , you can add unlimited items to track your expenses in this items.</p>
            <h1 className="Home-add-item">How To Add Your First Items ?</h1>
            <ul className="instructions-list">
                <li> Click on Add items in the footer.</li>
                <li>Write the name of your item That you need to track your expenses on (food, taxi, travel ...)</li>
                <li> Select the proper icon which is descriptive to your item. </li>
                <li> Click on Add item button , that was easy ! Start tracking your expenses!.</li>
            </ul>
        </div>

    const renderItems = <div>
        <Summary total={total}/> 
    
        <div className="Home-items-div">
        {itemsList.map(item=>(
            <Link key={item.name} to={`/items/${item.name}`}>
                <Item key={item.name} item={item} />
            </Link>
        ))}
        </div>
        </div>
    

    const itemsPresence = itemsList.length > 0 ? renderItems :  instructions
    return (
        <div className="Home">
            {renderContent()}
            <Footer />
        </div>
    )
}

export default Home
