import React, { useState} from 'react';
import EditForm from './EditForm';
// import { confirm } from "react-confirm-box";


const ExpenseCard = (props) => {
    const [editFormFlag, setEditFormFlag] = useState(false)

    const handleClick=()=>{
        props.delExpense(props.expense.id)
    }

    return (
        <div className='exp-card '>
            <h3>{props.expense.name} for ${props.expense.cost} on {props.expense.date}</h3>
            {editFormFlag? <EditForm editExp={props.editExp} expense={props.expense} setEditFormFlag={setEditFormFlag}/> : <button onClick={()=> setEditFormFlag(true)}>Edit</button>}
            <button onClick={handleClick}>Delete</button> 
        </div>
    )
}

export default ExpenseCard;

