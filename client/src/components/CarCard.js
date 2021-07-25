import React from 'react'
import { Link } from 'react-router-dom'

const CarCard = (props) => {
    
    return(
        <div className='card'>
            <h2>{props.car.year} {props.car.make} {props.car.model}</h2>
            <br/>
            <Link to={`cars/${props.car.id}/expenses`} id={props.car.id} make={props.car.make}>
                <button>View Related Expense</button>
            </Link>
            <br/>
        </div>
    )
}

export default CarCard;