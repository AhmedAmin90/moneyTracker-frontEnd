import React from 'react';
import './Measurment.css';

const Measurment = ({expense , removeExpense }) => {

    const handleRemove = ()=> {
        removeExpense(expense.id)
    }
    return (
        <div className="Measurment">
            <div className="Measurment-left">
                <div className="Measurment-percentage-circle" />
                <p>{new Date(`${expense.created_at.split('T')[0]}`).toLocaleString("en", { month: 'short', day: 'numeric', year: 'numeric' }).replace(',','')}</p>
            </div>
            <div className="Measurment-right">
                 <p>{expense.expense}</p> 
                 <i onClick={handleRemove} className="fas fa-trash-alt Measurment-delete"></i>
            </div>
        </div>
    )
}

export default Measurment
