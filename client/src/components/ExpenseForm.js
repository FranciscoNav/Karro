import React, { useState } from 'react'

const ExpenseForm = ({addExp, setExpFormFlag, cars}) => {
    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [year, setYear] = useState("")
    const [carToggle, setCarToggle] = useState(false)
    const [selectedCar, setSelectedCar] = useState("")

    const [name, setName] = useState("")
    const [cost, setCost] = useState("")
    const [date, setDate] = useState("")
    
    
    const handleExpSubmit = (event) => {
        event.preventDefault()
        
        if (carToggle==false){
            addExp({
                    name: name,
                    cost: cost,
                    date: date,
                    car_id: selectedCar
                })
        }else{
            addExp({
                expense:{
                    name: name,
                    cost: cost,
                    date: date,
                    car_attributes: {
                        make: make,
                        model: model,
                        year: year,
                    }
                }
            })
        }
        setExpFormFlag(false)
    }

    const allCars = cars.map(c => <option value={c.id}>{c.make} {c.model} {c.year}</option> )

    return (
        <div>
            <form className="form" onSubmit={handleExpSubmit}>
                {carToggle? 
                    <div>
                        <label>Make</label>
                        <br/>
                        <input type="text" id="name" value={make} onChange={(e) => setMake(e.target.value)}></input>
                        <br/>
                        <label>Model</label>
                        <br/>
                        <input type="text" id="name" value={model} onChange={(e) => setModel(e.target.value)}></input>
                        <br/>
                        <label>Year</label>
                        <br/>
                        <input type="number" id="name" value={year} onChange={(e) => setYear(e.target.value)}></input>
                    </div>
                    : 
                    <div>
                        <select name="selectList" onChange={(e)=> setSelectedCar(e.target.value)}>
                            <option>Select from existing cars</option>
                            {allCars}
                        </select>
                        <h5 className='form-title' onClick={() =>setCarToggle(true)}>Can't find your car above? Click here</h5>
                    </div>}
                <h3 className='form-title'>Enter an expense related to this car:</h3>
                <label>Name</label>
                <br/>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                <br/>
                <br/>
                <label>Cost</label>
                <br/>
                <input type="number" id="cost" value={cost} onChange={(e) => setCost(e.target.value)}></input>
                <br/>
                <br/>
                <label>Date</label>
                <br/>
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                <br/>
                <br/>
                <input className="submit-button" type="submit"/>
            </form>
        </div>
    )
}

export default ExpenseForm;