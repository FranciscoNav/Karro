import React, { useState, useEffect } from 'react';

const Expenses = (props) => {
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState("")
    // const [carFormFlag, setCarFormFlag] = useState(false)

    useEffect(() => {
        fetch(`cars/${props.id}/expenses`)
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

    
    return (
        <div>
            <button className ="test">Edit</button>
        </div>
    )
}

export default Expenses;
