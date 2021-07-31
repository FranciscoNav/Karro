import React, { useState, useEffect } from 'react';

const Explore = () => {
  const [error, setError] = useState("")
  const [selectedCar, setSelectedCar] = useState(0)
  const [cars, setCars] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch(`/cars/all`)
    .then((r) => r.json())
    .then(data => {
      if(data.error){
        setError(data.error)
      }else{
        console.log(`fetch all data`, data)
        setCars(data)
      }
    })
  },[]);

  const displaySelCar=()=>{
    if(selectedCar == 0){
      return <p>add instructions here</p>
    }else{
      const findCar = cars.filter(c=> c.id ==selectedCar)
      const carTitle = findCar.map(c => <h3>All user expenses for the {c.year} {c.make} {c.model}</h3>)
      const expArray = findCar.map(c => c.expenses)

      const displayExp = expArray[0].filter((val) => {
        if(searchTerm == ''){
          return val
        }else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
          return val
        }
      }).map((val, key) => <h4 key={key} className='exp-card'> {val.name} for ${val.cost} on {val.name}</h4>)

      const showCarAndExp = <div className='card'>
        {carTitle}
        <input type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)}/>
        {displayExp}
      </div>

      return showCarAndExp
    }
  }

  const dropDownCars = cars.map(c => <option value={c.id}>{c.make} {c.model} {c.year}</option> )
    
  if(error===''){
    return (
      <div>
        <h1>Explore what other people are paying</h1>
        <select name="selectList" onChange={(e)=> setSelectedCar(e.target.value)} >
          <option value={0}>Select a car from our database</option>
          {dropDownCars}
        </select>
        <br/>
        <br/>
        {displaySelCar()}
      </div>
    )
  }else{
    return (
      <div>
        <h2>{error} - Please Sign up or Login</h2>
      </div>
    )
  }
}

export default Explore;