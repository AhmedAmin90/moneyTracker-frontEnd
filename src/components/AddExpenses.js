/* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getData, setTotal } from '../helpers';
import Header from './Header';
import Summary from '../containers/Summary';
import Footer from './Footer';
import Filter from '../containers/Filter';
import { Redirect } from 'react-router';

const AddExpenses = ({userId}) => {
    const total = useSelector((state) => state.total);
    let itemsList = useSelector((state) => state.items);

    const render = itemsList.length > 0 ?     <div>
    <Header />
    <Summary total={total} />
    <Filter />
    <Footer />
</div> :   <div>
<Header />
    <Summary total={total} />
    <h1 className="Home-add-item"> Please Add Items first !</h1>
    <Footer />
    </div>

    // if (itemsList.length === 0 || ){
    //     return <Redirect to={`/home/${userId}`} />;
    // }
    return (
        <div>
            {render}
        </div>
    )
}

export default AddExpenses
