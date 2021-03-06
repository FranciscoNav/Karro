import React, { useState, useEffect } from 'react';
import ExpenseCard from './ExpenseCard'
import ExpenseForm from './ExpenseForm'

const Expenses = (props) => {
  const [expenses, setExpenses] = useState([])
  const [expFormFlag, setExpFormFlag] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`/cars/${props.match.params.car_id}/expenses`)
    .then((r) => r.json())
    .then(data => {
      if(data.error){
        setError(data.error)
      }else{
        setExpenses(data)
      }
    })
  },[]);

  const editExp = (exp,id) =>{
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
        alert("Please make sure the form is complete. Name, cost, and date are required.");
      }else{
        setExpenses([...expenses, data])
        setExpFormFlag(false)
      }
    })
  }

  const delExpense = (id) =>{
    if(expenses.length == 1){
      if (window.confirm('Are you sure? Removing the last expense will also remove the car from "Your Vehicles".')){
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
    }else{
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
  }

  const totalCostCalc = () =>{
    const findPrice = expenses.map(exp => exp.cost)
    const totalCost = findPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return totalCost
  }

  const title=()=>{
    const expCar=expenses.map( e=> e.car)
    const carYear = expCar.map(c=> c.year)
    const carMake = expCar.map(c=> c.make)
    const carModel = expCar.map(c=> c.model)
    const carTitle = <h1>All Expenses for your {carYear[0]} {carMake[0]} {carModel[0]}</h1>
    return carTitle
  }

  const expList = expenses.map( e => <ExpenseCard key={e.id} expense={e} editExp={editExp} delExpense={delExpense}/>)

  if(error===''){
    return (
      <div>
        {title()}
        {expList}
        {expFormFlag ? <ExpenseForm idFromExp={props.match.params.car_id} addExp={addExp}/> : <button className ="button" onClick={() =>setExpFormFlag(true)}>Add New Expense</button>}
        <br/>
        <br/>
        <hr/>
        <h3>You have spent a total of ${totalCostCalc()} on this car</h3>
      </div>
    )
  }else{
    return (
      <div>
        <h2>Error: {error}</h2>
      </div>
    )
  }
}

export default Expenses;