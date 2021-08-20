import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from "react-router-dom";
import AddItems from '../containers/AddItems';
import * as actions from '../actions/index';
import Summary from '../containers/Summary';
import Item from '../containers/Item';
import axios from 'axios';
import Footer from './Footer';
import './Home.css'
import Filter from '../containers/Filter';
import Header from './Header';

const Home = ({ userData, testData = false }) => {
    const dispatch = useDispatch();
    let userId = useSelector((state) => state.userId);
    let itemsList = useSelector(state => state.items);
    if (testData) {
        userId = testData.user.id
        itemsList = testData.items
        dispatch(actions.content(2))
    }
    const selectedId = userData.match.params.id;
    const contentId = useSelector(state => state.contentId)
    const [total, setTotal] = useState(0);
    const [axiosRes, setAxiosRes] = useState('');

    useEffect(() => {
        if (!testData) {
            var cancelToken = axios.CancelToken;
            var source = cancelToken.source();
            setAxiosRes("axios request created");
        }
        const getData = async () => {
            try {
                const res = await axios.get(`https://pacific-mountain-97932.herokuapp.com/users/${selectedId}`
                    , {
                        cancelToken: source.token,
                    });
                setAxiosRes(res)
                console.log(res)
                const data = await res.data
                setTotal(data.total)
                if (!userId || itemsList.length !== 0) {
                    //  Length to avoid rerender dispatching if i back to this page again
                    //  userid to avoid dispatching items if some one add user id to the path without loging
                    return
                }
                else {
                    data.items.map(item => (
                        dispatch(actions.items(item))
                    ))
                }
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
    }, [])

    if (!userId) {
        return <Redirect to="/" />;
    }

    const renderContent = () => {
        if (contentId === 1) {
            return addMeasurment
        }
        else if (contentId === 2) {
            return itemsPresence
        }
        else if (contentId === 3) {
            return <div>
                <h1 className="Home-add-item">Add New Item</h1>
                <AddItems userId={selectedId} />
            </div>
        }
        else if (contentId === 4) {
            window.location.reload()
        }
    }

    const addMeasurment = itemsList.length !== 0 ? <div>   <Filter /> </div> : <div>

        <h1 className="Home-add-item"> Please Add Items first !</h1>
    </div>
    const instructions =
        <div>

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

    const renderItems = <div className="Home-child items-div-child">

        <div className="Home-items-div" data-testid='items-div'>

            {itemsList.map(item => (
                <Link key={item.name} to={`/items/${item.name}`} data-testid={item.name}>
                    <Item key={item.name} item={item} />
                </Link>
            ))}
        </div>
    </div>


    const itemsPresence = itemsList.length > 0 ? renderItems : instructions
    return (
        <div className="Home" data-testid='home-component' >
            <div>
                <Header />
                <Summary total={total} />
            </div>

            {renderContent()}
            <Footer />
        </div>
    )
}

export default Home

