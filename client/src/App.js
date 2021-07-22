import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import CarList from './components/CarList';
import Expenses from './components/Expenses';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [loginError, setLoginError] = useState("")
  const history = useHistory()

  useEffect(() => {
    // auto-login
    fetch('/me')
    .then(response => {
      if(response.ok) {
        response.json()
        .then( user => {
          setLoggedIn(true)
          setUser(user)
        })
      }else{
        setLoginError(response.statusText)
      }
    })
  }, [])

  const LoginUser= (u) => {
    if(u.error === "Invalid username or password"){
      setLoggedIn(false)
      alert(loginError);
    }else if(u.error === "Internal Server Error"){
      setLoggedIn(false)
      alert("Please make sure the form is correct. It should include a username, and matching password(s).");
    }else{
      setLoggedIn(true)
      setUser(u)
      history.push('/')
    }
  }

  const logoutUser = () => {
    fetch('/logout', {
      method: 'DELETE'
    })
    .then(() => {
      console.log('logged out')
      setLoggedIn(false)
      setUser({})
    }) 
    history.push('/')
  }

  return (
    <div className="App">
      <Navbar user={user} loggedIn={loggedIn} logoutUser={logoutUser} loginError={loginError}/>
      <Switch>
        <Route exact path="/" render={routerProps => <Home {...routerProps} loginUser={LoginUser} loggedIn={loggedIn} user={user} />}/>
        <Route exact path="/signup" render={routerProps => <Signup {...routerProps} loginUser={LoginUser}/>}/>
        <Route exact path="/login" render={routerProps => <Login {...routerProps} loginUser={LoginUser} />}/>
        <Route exact path="/cars" render={routerProps => <CarList {...routerProps} user={user} loggedIn={loggedIn}/>}/>
        <Route exact path="cars/:car_id/expenses"  component={Expenses}/>
      </Switch>
      
    </div>
  );
}

export default App;
