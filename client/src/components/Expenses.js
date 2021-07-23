import React, { useState, useEffect } from 'react';

const Expenses = (props) => {
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState("")
    // const [carFormFlag, setCarFormFlag] = useState(false)

    useEffect(() => {
        fetch(`/cars/${props.match.params.car_id}/expenses`)
          .then((r) => r.json())
          .then(data => {
            console.log(`fetch all expenses`, data)
            if(data.error){
                setError(data.error)
            }else{
                setExpenses(data)
            }
          })
    }, []);

    const expList = expenses.map( e => <p>{e.name} ${e.cost} {e.date}</p>)

    return (
        <div>
            {expList}
        </div>
    )
}

export default Expenses;
