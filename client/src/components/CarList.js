import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';
import ExpenseForm from './ExpenseForm'

const CarList = () => {
    const [cars, setCars] = useState([])
    const [error, setError] = useState("")
    const [expFormFlag, setExpFormFlag] = useState(false)

    useEffect(() => {
        fetch("/cars")
          .then((r) => r.json())
          .then(data => {
            console.log("fetch all cars", data)
            if(data.error){
                setError(data.error)
            }else{
                setCars(data)
            }
          })
    }, []);

    const addExp = (Exp) =>{
        fetch("/cars",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(Exp)
        })
        .then(r => r.json())
        .then(data => {
            if (data.errors){
                alert("Please fill out the form completely. There should be at least one character in each text box.");
            }else{
                setCars([...cars, data])
                setExpFormFlag(false)
            }
        })
    }

    const carList = cars.map( c => <CarCard  year={c.year} make={c.make} model={c.model} id={c.id}/>)

    return(
        <div>
            <h2>Your Vehicles</h2>
            {carList}
            <br/>
            {expFormFlag ? <ExpenseForm setExpFormFlag={setExpFormFlag} addExp={addExp}/> : <button className ="button" onClick={() =>setExpFormFlag(true)}>Add Expense to Different Car</button>}
        </div>
    )
}

export default CarList;