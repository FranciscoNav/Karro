import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom'

const Navbar = (props) => {
    const link = {
        border: 'grey solid 1px',
        width:'100px',
        padding:'10px',
        margin: '0 6px 6px',
        textDecoration: 'none',
        color: 'white',
        background:'#3c6ae9',
      }
    
      const active = {
        background: "rgba(187, 189, 194, 0.664)",
        border: 'black solid 1px'
      }

    if (props.loggedIn){
        return (
            <div>
                <br/>
                <NavLink to='/' exact style={link} activeStyle={active}>Home</NavLink>
                <NavLink to="/cars" exact style={link} activeStyle={active}>Your Vehicles</NavLink>
                <button className="logout-button" onClick={props.logoutUser}>Logout -Nav</button>
            </div>
        )
    } else{
        return (
            <div>
                <br/>
                <Link to="/signup">
                    <button className="login-button">Signup</button>
                </Link>
                <br/>
                <Link to="/login">
                    <button className="login-button">Login</button>
                </Link>
            </div>
        )
    }
}

export default Navbar;