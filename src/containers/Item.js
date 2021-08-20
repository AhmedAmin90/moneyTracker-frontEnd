import React from 'react'
import './Item.css'
const Item = ({item}) => {
    return (
        <div className="Item">
            <i data-testid='items-div-icon' className={item.icon}></i> 
            <h1>{item.name}</h1>
        </div>
    )
}

export default Item
