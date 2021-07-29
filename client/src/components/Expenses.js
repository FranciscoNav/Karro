import React, { useState, useEffect } from 'react';
import ExpenseCard from './ExpenseCard'
import { Link } from 'react-router-dom'
import ExpenseForm from './ExpenseForm'

const Expenses = (props) => {
  const [expenses, setExpenses] = useState([])
  const [expFormFlag, setExpFormFlag] = useState(false)
  const [error, setError] = useState("")
  const [expTotal, setExpTotal] = useState(0)

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
  },[]);

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

  const addExp = (exp) =>{
    fetch(`/cars/${props.match.params.car_id}/expenses`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(exp)
    })
    .then(r => r.json())
    .then(data => {
      if (data.errors){
        alert("Cisco Add error");
      }else{
        setExpenses([...expenses, data])
        setExpFormFlag(false)
      }

    })
  }

  const delExpense = (id) =>{
    fetch(`/cars/${props.match.params.car_id}/expenses/${id}`,{
      method: "DELETE",
      headers:{
        "Content-Type": "application/json"
      },
    })
    .then(() => {
        const expAfterDel = expenses.filter(e => e.id !=id)
        setExpenses(expAfterDel)
    })
  }

  const totalCostCalc=()=>{
    const findPrice = expenses.map(exp => exp.cost)
    const totalCost = findPrice.reduce((accumulator, currentValue) => accumulator+ currentValue)
    setExpTotal(totalCost)
  }

  const expList = expenses.map( e => <ExpenseCard key={e.id} expense={e} editExp={editExp} delExpense={delExpense}/>)

  return (
      <div>
          <h2>All Related Expenses</h2>
          {expList}
          {expFormFlag ? <ExpenseForm idFromExp={props.match.params.car_id} addExp={addExp}/> : <button className ="button" onClick={() =>setExpFormFlag(true)}>Add New Expense - NOT WORKING</button>}
          <br/>
          <br/>
          <hr/>
          <h3>${expTotal}</h3>
          <button onClick={totalCostCalc}>Calculate total Cost</button>
      </div>
  )
}

export default Expenses;
