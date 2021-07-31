import React, { useState, useEffect } from 'react'

const ExpenseForm = ({addExpWithCar, setExpFormFlag, cars, idFromExp, addExp}) => {
    const [allCars, setAllCars] = useState([])
    // issue with stuff from above
    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [year, setYear] = useState("")
    const [carToggle, setCarToggle] = useState(false)
    const [selectedCar, setSelectedCar] = useState(0)
    const [name, setName] = useState("")
    const [cost, setCost] = useState("")
    const [date, setDate] = useState("")

    useEffect(() => {
        fetch("/cars/all")
          .then((r) => r.json())
          .then(data => {
              if(idFromExp){
                const currentCar = data.filter(c => c.id ==idFromExp)
                setAllCars(currentCar)
              }else{
                setAllCars(data)
              }
          })
    }, []);
    
    const handleExpCarSubmit = (event) => {
        event.preventDefault()
        const ownedCars = cars.map(c => c.id)

        if (ownedCars.includes(parseInt(selectedCar, 10))){
            alert("You already own this car");
        }else{
            if (carToggle===false){
                addExpWithCar({
                    name: name,
                    cost: cost,
                    date: date,
                    car_id: selectedCar
                })
            }else{
                addExpWithCar({
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
    }

    const handleExpSubmit=(event)=>{
        event.preventDefault()
        addExp({
            name: name,
            cost: cost,
            date: date
        })
    }
    
    const dropDownCars = allCars.map(c => <option value={c.id}>{c.make} {c.model} {c.year}</option> )

    if(idFromExp){
        return(
            <div>
                <form className="form" onSubmit={handleExpSubmit}>
                    <div>
                        <select name="selectList" >
                            {dropDownCars}
                        </select>
                    </div>
                    <h3 className='form-title'>Enter an expense related to this car:</h3>
                    <label>What was the Expense?</label>
                    <br/>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                    <br/>
                    <br/>
                    <label>How much did it cost?</label>
                    <br/>
                    <input type="number" id="cost" value={cost} onChange={(e) => setCost(e.target.value)}></input>
                    <br/>
                    <br/>
                    <label>When did this expense happen?</label>
                    <br/>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                    <br/>
                    <br/>
                    <input className="submit-button" type="submit"/>
                </form>
            </div>
        )
    }else{
        return (
            <div>
                <form className="form" onSubmit={handleExpCarSubmit}>
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
                                {dropDownCars}
                            </select>
                            <h5 className='form-title' onClick={() =>setCarToggle(true)}>Can't find your car above? Click here</h5>
                        </div>}
                    <h3 className='form-title'>Enter an expense related to this car:</h3>
                    <label>What was the Expense?</label>
                    <br/>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                    <br/>
                    <br/>
                    <label>How much did it cost?</label>
                    <br/>
                    <input type="number" id="cost" value={cost} onChange={(e) => setCost(e.target.value)}></input>
                    <br/>
                    <br/>
                    <label>When did this expense happen?</label>
                    <br/>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                    <br/>
                    <br/>
                    <input className="submit-button" type="submit"/>
                </form>
            </div>
        )
    }
}

export default ExpenseForm;