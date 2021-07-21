import React, { useState } from 'react';
// import ExpenseForm from './ExpenseForm';

const CarForm = ({addCar}) => {
    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [year, setYear] = useState("")

    const [name, setName] = useState("")
    const [cost, setCost] = useState("")
    const [date, setDate] = useState("")
    
    const addExpense = (car) =>{
        fetch("/expenses",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(car)
        })
        .then(r => r.json())
        .then(data => console.log(data))
    }

    const handleCarSubmit = (event) => {
        event.preventDefault()
        
        addExpense({
            name: name,
            model: model,
            date: date
        })
        
        addCar({
            make: make,
            model: model,
            year: year
        })
    }

    return (
        <div>
            <form className="form" onSubmit={handleCarSubmit}>
                <h3 className='form-title'>Enter your Car Information Below:</h3>
                <label>Model</label>
                <br/>
                <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)}></input>
                <br/>
                <br/>
                <label>Make</label>
                <br/>
                <input type="text" id="make" value={make} onChange={(e) => setMake(e.target.value)}></input>
                <br/>
                <br/>
                <label>Year</label>
                <br/>
                <input type="text" id="year" value={year} onChange={(e) => setYear(e.target.value)}></input>
                <br/>
                <br/>
                <h3 className='form-title'>Enter an expense related to this car:</h3>
                <label>Name</label>
                <br/>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                <br/>
                <br/>
                <label>Cost</label>
                <br/>
                <input type="text" id="cost" value={cost} onChange={(e) => setCost(e.target.value)}></input>
                <br/>
                <br/>
                <label>Date</label>
                <br/>
                <input type="text" id="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                <br/>
                <br/>
                {/* <ExpenseForm handleCarSubmit={handleCarSubmit}/> */}
                <input className="submit-button" type="submit"/>
            </form>
        </div>
    )
}

export default CarForm;