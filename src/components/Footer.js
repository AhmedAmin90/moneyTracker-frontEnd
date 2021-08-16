import React , {useState}from 'react';
import Box from './Box';
import './Footer.css'

const Footer = () => {
    // const [clicked , setClicked] = useState(false);
    const [boxes , setBoxes] = useState([
        {id: 1 , icon:"fas fa-chart-bar", text:"Add Expenses" , clicked: false},
        {id: 2 , icon:"fas fa-chart-line", text:"Track Expenses" , clicked: false},
        {id: 3 , icon:"fas fa-chart-pie", text:"Add Items" , clicked: false},
        {id: 4 , icon:"fas fa-sign-out-alt", text:"Sign out" , clicked: false},
    ]);

    const handleClicke = (id)=> {
        // setClicked(!clicked);
        let selectedBox = boxes.find((box)=> box.id === id);
        console.log(boxes , selectedBox)
        selectedBox.clicked = !selectedBox.clicked;
        const otherBoxes = boxes.filter((box) => box.id !== id);
        otherBoxes.forEach((box) => {
            box.clicked = false;
          });
        setBoxes([...boxes])
    }

    const renderBoxes = boxes.map(box=> 
        <Box key={box.id} handleClickBox={handleClicke} box={box} clicked={box.clicked}/>)

    return (
        <div className="Footer">
            {renderBoxes}
        </div>
    )
}

export default Footer
