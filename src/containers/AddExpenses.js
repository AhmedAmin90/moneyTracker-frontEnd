/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Summary from './Summary';
import Footer from '../components/Footer';
import Filter from './Filter';
import './AddExpenses.css'

const AddExpenses = () => {
    const total = useSelector((state) => state.total);
    let itemsList = useSelector((state) => state.items);

    const render = itemsList.length > 0 ? <div className="AddExpenses-items">
    <div>
    <Header />
    <Summary total={total} />
    </div>
    <Filter />
    <Footer />
</div> :   
<div className="AddExpenses-empty">
    <div>
    <Header />
    <Summary total={total} />
    </div>
    <h1 className="Home-add-item"> Please Add Items first !</h1>
    <Footer />
    </div>

    return (
        <div className="AddExpenses">
            {render}
        </div>
    )
}

export default AddExpenses
