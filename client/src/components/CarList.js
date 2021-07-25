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

    const addExp = (exp) =>{
        fetch("/expenses",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(exp)
        })
        .then(r => r.json())
        .then(data => {
            debugger
            if (data.errors){
                alert("Please fill out the form completely. There should be at least one character in each text box.");
            }else{
                setCars([...cars, data.car])
                setExpFormFlag(false)
            }
        })
    }

    const carList = cars.map( c => <CarCard key={c.id} car={c}/>)

    return(
        <div>
            <h2>Your Vehicles</h2>
            {carList}
            <br/>
            {expFormFlag ? <ExpenseForm setExpFormFlag={setExpFormFlag} addExp={addExp}/> : <button className ="button" onClick={() =>setExpFormFlag(true)}>Add Expense to Different Car</button>}
            <br/>
            <br/>
        </div>
    )
}

export default CarList;