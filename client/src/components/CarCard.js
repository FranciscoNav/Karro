import React from 'react'
import { Link } from 'react-router-dom'

const CarCard = (props) => {
    
    
    return(
        <div className='card'>
            <h2>{props.year} {props.make} {props.model} </h2>
            <br/>
            <Link to={`cars/${props.id}/expenses`} id={props.id}>
                <button>View Related Expense</button>
            </Link>
            <br/>
        </div>
    )
}

export default CarCard;