import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';

const CarList = () => {
    const [cars, setCars] = useState([])
    const [error, setError] = useState("")
    const [carFormFlag, setCarFormFlag] = useState(false)

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

    const addCar = (car) =>{
        fetch("/cars",{
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
                setCars([...cars, data])
                setCarFormFlag(false)
            }
        })
    }

    const handleTest = () =>{
        debugger
        console.log("carList test")
    }

    const carList = cars.map( c => <CarCard  year={c.year} make={c.make} model={c.model} id={c.id}/>)

    return(
        <div>
            <h2>Your Vehicles</h2>
            {carList}
            <br/>
            <button className ="test" onClick={handleTest}>Test - carList</button>
        </div>
    )

    
}

export default CarList;