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

    const addExpWithCar = (car) =>{
        fetch("/expenses",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(car)
        })
        .then(r => r.json())
        .then(data => {
            if (data.errors){
                alert("Please fill out the form completely. There should be at least one character in each text box.");
            }else{
                setCars([...cars, data.car])
                setExpFormFlag(false)
            }
        })
    }

    const removeCar = (id) =>{
        fetch(`/cars/${id}`,{
          method: "DELETE",
          headers:{
            "Content-Type": "application/json"
          },
        })
        .then(() => {
            const carAfterDel = cars.filter(e => e.id !=id)
            setCars(carAfterDel)
        })
    }

    const carList = cars.map( c => <CarCard key={c.id} car={c} removeCar={removeCar}/>)

    if(error ===''){
        return(
            <div>
                <h2>Your Vehicles</h2>
                {carList}
                <br/>
                {expFormFlag ? <ExpenseForm setExpFormFlag={setExpFormFlag} addExpWithCar={addExpWithCar} cars={cars}/> : <button className ="button" onClick={() =>setExpFormFlag(true)}>Add Expense to Different Car</button>}
                <br/>
                <br/>
            </div>
        )
    }else{
        return(
            <div>
                <h2>{error} - Please Sign up or Login</h2>
            </div>
        )
    }

}

export default CarList;