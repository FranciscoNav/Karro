import React, { useState, useEffect } from 'react';
import ExpenseCard from './ExpenseCard'
import { Link } from 'react-router-dom'
import ExpenseForm from './ExpenseForm'

const Expenses = (props) => {
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState("")
    const [expFormFlag, setExpFormFlag] = useState(false)


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
            const updatedExp = expenses.map(e => e.id !=data.id ? e : data)
            setExpenses(updatedExp)
          })
    }

    const expList = expenses.map( e => <ExpenseCard key={e.id} expense={e} editExp={editExp}/>)

    return (
        <div>
            <h2>All Related Expenses</h2>
            {expList}
            {expFormFlag ? <ExpenseForm idFromExp={props.match.params.car_id}/> : <button className ="button" onClick={() =>setExpFormFlag(true)}>Add New Expense</button>}
        </div>
    )
}

export default Expenses;
