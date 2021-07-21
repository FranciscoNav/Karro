import React, { useState, useEffect } from 'react';
import CarForm from './CarForm';

const CarList = () => {
    const [cars, setCars] = useState([])
    const [carFormFlag, setCarFormFlag] = useState(false)
    const [error, setError] = useState("")

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
        // const idk = cars.map( c => {c.make})
        // console.log("carMake", idk)
    }

    const carList = cars.map( c => <li>{c.make}</li>)

    return(
        <div>
            <h2>Your Vehicles</h2>
            <ol>
                {carList}
            </ol>
            {carFormFlag ? <CarForm addCar={addCar}/> : <button className="button" onClick={() => setCarFormFlag(true)} formFlag={carFormFlag}>lets get stated</button>}
            <br/>
            <button className ="test" onClick={handleTest}>Test button</button>
        </div>
    )

    
}

export default CarList;