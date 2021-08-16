import React from 'react';
import { Link } from 'react-router-dom';

const Box = ({box , handleClickBox}) => {
    const handleClick = ()=>{
        handleClickBox(box.id)
    }
    const isClickedBox = box.clicked ? 'Footer-box-clicked ' :  'Footer-box';
    const isClickedArrow = box.clicked ? 'arrow-hidden-div' : '';

    return (

        <div key={box.id} className={isClickedBox} onClick={handleClick} clicked={box.clicked}>
            <div className={isClickedArrow} />
            <i className={box.icon}></i>
            <p>{box.text}</p>
        </div>

    )
}

export default Box
