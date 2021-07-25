import React, { useState, useEffect } from 'react';
import ExpenseCard from './ExpenseCard'
import { Link } from 'react-router-dom'

const Expenses = (props) => {
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState("")

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

    const editExp=(exp,id)=>{
        fetch(`/cars/${props.match.params.car_id}/expenses/${id}`,{
            method: "PATCH",
            headers:{
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body:JSON.stringify(exp)
          })
          .then(resp => resp.json())
          .then(data => {
            setExpenses(data)
            //Fix issue 
          })
    }

    const expList = expenses.map( e => <ExpenseCard key={e.id} expense={e} editExp={editExp}/>)

    return (
        <div>
            <h2>All Related Expenses</h2>
            {expList}
        </div>
    )
}

export default Expenses;
