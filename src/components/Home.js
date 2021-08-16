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

const Home = ({userData}) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.userId);
    const itemsList = useSelector(state => state.items);
    const contentId = useSelector(state=> state.contentId)
    const selectedId = userData.match.params.id;
    const [total , setTotal] = useState(0);
    const [axiosRes, setAxiosRes] = useState('');

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        setAxiosRes(axiosRes);
        const getData = async ()=>{
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
        if (contentId === 2 ) {
            return <div>
                <Summary total={total}/> 
            
                <div className="Home-items-div">
                {itemsList.map(item=>(
    
                    <Link key={item.name} to={`/items/${item.id}`}>
                        <Item key={item.name} item={item} />
                    </Link>
                ))}
                </div>
                </div>
        }
        else if (contentId === 3) {
            return <div>
                        <Summary total={total}/> 
                        <h1 className="Home-add-item">Add New Item</h1>
                        <AddItems userId={selectedId} />    
                   </div>
        }
    }

    return (
        <div>
            {renderContent()}
            <Footer />
        </div>
    )
}

export default Home
