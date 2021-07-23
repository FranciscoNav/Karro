import React, { useState } from 'react'

const ExpenseForm = ({addExp, setExpFormFlag}) => {
    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [year, setYear] = useState("")
    const [carToggle, setCarToggle] = useState(false)

    const [name, setName] = useState("")
    const [cost, setCost] = useState("")
    const [date, setDate] = useState("")
    
    const dropDwon = () => {
        // Temporary until drop down is made
        setCarToggle(true)
    }

    const addExpense = () =>{
        fetch("/expenses",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify()
        })
        .then(r => r.json())
        .then(data => console.log(data))
    }

    const handleExpSubmit = (event) => {
        event.preventDefault()
        // if car exists will need some logic propbably
        // addExpense({
        //     name: name,
        //     cost: model,
        //     date: date,
        //     car_id: car_id
        // })
        
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

        setExpFormFlag(false)
    }

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
                        <select name="selectList" id="selectList">
                            <option value="option 1">Option 1</option>
                            <option value="option 2">Option 2</option>
                        </select>
                        <h5 className='form-title' onClick={dropDwon}>Can't find your car above? Click here</h5>
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