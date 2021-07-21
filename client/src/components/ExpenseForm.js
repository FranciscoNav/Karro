import React, { useState } from 'react'

const ExpenseForm = ({handleCarSubmit}) => {
    const [name, setName] = useState("")
    const [cost, setCost] = useState("")
    const [date, setDate] = useState("")

    const handleExpenseSubmit = (event) => {
        event.preventDefault()
        handleCarSubmit()
        // addExpense({
        //     name: name,
        //     cost: cost,
        //     date: date
        // })
    }

    return (
        <div>
            <form >
                <h3 className='form-title' onSubmit={handleExpenseSubmit}>Enter an expense related to this car:</h3>
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
                <input className="submit-button" type="submit"/>
            </form>
        </div>
    )
}

export default ExpenseForm;