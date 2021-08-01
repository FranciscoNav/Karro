import React from 'react'
import { Link } from 'react-router-dom'

const CarCard = (props) => {
    
    const handleClick=()=>{
        props.removeCar(props.car.id)
    }

    return(
        <div className='card'>
            <h2>{props.car.year} {props.car.make} {props.car.model}</h2>
            <br/>
            <Link to={{
                pathname:`cars/${props.car.id}/expenses`,
                state:{
                    make:props.car.make,
                    model:props.car.model,
                    year:props.car.year
                }}
            }>
                <button className="button">View Related Expense</button>
            </Link>
            <button onClick={handleClick} className='delete-button'>Remove Car</button>
            <br/>
        </div>
    )
}

export default CarCard;



{/* <Route path="/cars/:car_id/expenses"  render={routerProps => <Expenses {...routerProps} id={props.id} make={props.make} /> }  /> */}