import React, { useState, useEffect} from 'react'

const EditForm = (props) => {
    const [name, setName] = useState("")
    const [cost, setCost] = useState("")
    const [date, setDate] = useState("")
    const [id, setId] = useState("")

    useEffect(() => {
        setName(props.expense.name)
        setCost(props.expense.cost)
        setDate(props.expense.date)
        setId(props.expense.id)
    }, [])

    const handleSubmit=(event)=>{
        event.preventDefault()
        props.editExp({
            name:name,
            cost:cost,
            date:date
        },id)
        props.setEditFormFlag(false)
    }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <h3 className='form-title'>Edit Your Expense Below</h3>
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
                <input className="button" type="submit"/>
            </form>
        </div>
    )
}

export default EditForm;